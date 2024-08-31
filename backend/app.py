from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Integer, DateTime, ForeignKey

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load secret key and database configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Configure the SQLAlchemy connection string (example for MSSQL)
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mssql+pyodbc://LAPTOP-QGPDAG4B/PatientAppointmentScheduling?driver=ODBC+Driver+17+for+SQL+Server'
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


# Route to add a new user
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 201


# Route to retrieve all users
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
    app.run(debug=os.getenv('FLASK_ENV') == 'development')
