from flask import Flask, request, jsonify
from extensions import bcrypt, db, jwt
from models import User
from config import Config  
import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

app = Flask(__name__)
app.config.from_object(Config)  # Load the configuration from config.py

# Initialize extensions
bcrypt.init_app(app)
db.init_app(app)
jwt.init_app(app)

# User Registration
@app.route('/register', methods=['POST'])
def register():
    # Get user data from the request
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    # Save user data to the database (you need to create User model)
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'})

# User Login
@app.route('/login', methods=['POST'])
def login():
    # Get user data from the request
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and bcrypt.check_password_hash(user.password, data['password']):
        # Create a JWT token for authentication
        access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(hours=1))
        return jsonify({'access_token': access_token})
    
    return jsonify({'message': 'Invalid credentials'})


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    # You can access the current user's identity with get_jwt_identity()
    return jsonify({'message': f'Hello, user {current_user_id}! This is a protected route.'})

if __name__ == '__main__':
    app.run(port=5555, debug=True)
