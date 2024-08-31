from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Integer, DateTime, ForeignKey
from werkzeug.security import generate_password_hash

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Apply CORS to allow cross-origin requests

# Load secret key and database configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Configure the SQLAlchemy connection string (example for MSSQL)
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mssql+pyodbc://LAPTOP-QGPDAG4B/PatientAppointmentScheduling'
    '?driver=ODBC+Driver+17+for+SQL+Server'
)

# Initialize the SQLAlchemy object
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(100), nullable=False)
    email = db.Column(String(100), unique=True, nullable=False)
    password = db.Column(String(255), nullable=False)
    created_at = db.Column(DateTime, default=db.func.current_timestamp())
    appointments = db.relationship('Appointment', backref='user', lazy=True)


class Appointment(db.Model):
    id = db.Column(Integer, primary_key=True)
    user_id = db.Column(Integer, ForeignKey('user.id'), nullable=False)
    appointment_date = db.Column(DateTime, nullable=False)
    status = db.Column(String(50), nullable=False)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        if not data or 'name' not in data or 'email' not in data or 'password' not in data:
            return jsonify({"message": "Invalid data"}), 400

        hashed_password = generate_password_hash(
            data['password'],
            method='pbkdf2:sha256'
        )
        new_user = User(
            name=data['name'],
            email=data['email'],
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User added successfully!"
        }), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({
            "message": "An error occurred while adding the user"
            }), 500

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {
            "id": user.id,
            "name": user.name,
            "email": user.email
        } for user in users
    ])


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables if they don't exist
    app.run(debug=True)
