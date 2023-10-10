from flask import Flask
from common import bcrypt, db, jwt

app = Flask(__name__)

# Initialize extensions
bcrypt.init_app(app)
db.init_app(app)
jwt.init_app(app)
