from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import User  # Make sure this import matches your project structure
from common import bcrypt, db, jwt
from config import Config
import datetime

app = Flask(__name__)
app.config.from_object(Config)  # Load the configuration from config.py

# Initialize extensions
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Registration
@app.route('/register', methods=['POST'])
def register():
    # Get user data from the request
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Save user data to the database (you need to create User model)
    new_user = User(username=data['username'], email=data['email'], password=hashed_password) # type: ignore
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
