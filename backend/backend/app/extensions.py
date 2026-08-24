from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Single shared instances — imported by app/__init__.py and by models/routes
db = SQLAlchemy()
cors = CORS()
jwt = JWTManager()
