from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import datetime
from g4f.client import Client


from models import Base, User, Doctor, Patient, Appointment


app = Flask(__name__)
CORS(app)

# Database setup
engine = create_engine('sqlite:///db.sqlite3')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=15)
jwt = JWTManager(app)

@app.route('/health-check', methods=['GET'])
def health_check():
    try:
        # Query the database
        users = session.query(User).all()
        user_data = [{'id': user.id, 'username': user.username} for user in users]
        doctors = session.query(Doctor).all()
        doctor_data = [{'id': doctor.id, 'doctor_name': doctor.doctor_name, 'doctor_speciality': doctor.doctor_speciality, 'doctor_experience': doctor.doctor_experience, 'doctor_rating': doctor.doctor_rating} for doctor in doctors]
        patients = session.query(Patient).all()
        patient_data = [{'id': patient.id, 'patient_name': patient.patient_name, 'patient_age': patient.patient_age, 'patient_username': patient.patient_username} for patient in patients]
        appointments = session.query(Appointment).all()
        appointment_data = [{'id': appointment.id, 'appointment_date': appointment.appointment_date, 'appointment_time': appointment.appointment_time, 'appointment_doctor': appointment.appointment_doctor, 'appointment_patient': appointment.appointment_patient} for appointment in appointments]
        return jsonify({'status': 'ok', 'users': user_data, 'doctors': doctor_data, 'patients': patient_data, 'appointments': appointment_data})
        # return jsonify({'status': 'ok', 'users': user_data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = session.query(User).filter_by(username=username).first()
    if user:
        return jsonify({'status': 'error', 'message': 'User already exists'})
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    session.add(new_user)
    session.commit()
    return jsonify({'status': 'ok', 'message': 'User created'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = session.query(User).filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'status': 'error', 'message': 'Invalid credentials'})
    access_token = create_access_token(identity=username, )
    return jsonify({'status': 'ok', 'access_token': access_token})

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"msg": "Successfully logged out"}), 200


@app.route('/doctors', methods=['GET'])
def get_doctors():
    speciality = request.args.get('speciality')
    rating = request.args.get('rating')
    experience = request.args.get('experience')

    query = session.query(Doctor)

    if speciality:
        query = query.filter(Doctor.doctor_speciality == speciality)
    if rating:
        query = query.filter(Doctor.doctor_rating >= rating)
    if experience:
        query = query.filter(Doctor.doctor_experience >= experience)

    doctors = query.all()
    doctor_data = [{'id': doctor.id, 'doctor_name': doctor.doctor_name, 'doctor_speciality': doctor.doctor_speciality, 'doctor_experience': doctor.doctor_experience, 'doctor_rating': doctor.doctor_rating} for doctor in doctors]
    return jsonify(doctor_data)

def openai_call(prompt):
    client = Client()
    response = client.chat.completions.create(
        model="o1-mini",
        messages=[{"role": "user", "content": prompt + "give result in json in order of rank {'1': '', '2': '', '3': ''}. nothing else"}],
        response_format={"type": "json_object"}
    )
    return response.choices[0].message.content
    

@app.route('/suggest_doctors', methods=['POST'])
@jwt_required()
def suggest_doctors():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = session.query(User).filter_by(username=current_user).first()
    patient = session.query(Patient).filter_by(patient_username=user.username).first()
    if not patient:
        return jsonify({'status': 'error', 'message': 'Patient not found'})
    


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)