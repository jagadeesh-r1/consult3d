# create Base model and User model using SQLAlchemy
#

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(120), nullable=False)

class Doctor(Base):
    __tablename__ = 'doctors'
    id = Column(Integer, primary_key=True)
    doctor_name = Column(String(80), nullable=False)
    doctor_speciality = Column(String(80), nullable=False)
    doctor_experience = Column(Integer, nullable=False)
    doctor_rating = Column(Integer, nullable=False)

class Patient(Base):
    __tablename__ = 'patients'
    id = Column(Integer, primary_key=True)
    patient_name = Column(String(80), nullable=False)
    patient_age = Column(Integer, nullable=False)
    patient_username = Column(String(80), ForeignKey('users.username'), nullable=False)
    patient_sex = Column(String(80), nullable=False)
    patient_gender = Column(String(80), nullable=False)
    patient_address = Column(String(80), nullable=True)
    patient_phone = Column(Integer, nullable=True)
    patient_previous_illness = Column(String(180), nullable=True)
    patient_previous_surgeries = Column(String(180), nullable=True)
    patient_allergies = Column(String(180), nullable=True)


class Appointment(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True)
    appointment_date = Column(String(80), nullable=False)
    appointment_time = Column(String(80), nullable=False)
    appointment_doctor = Column(String(80), ForeignKey('doctors.doctor_name'), nullable=False)
    appointment_patient = Column(String(80), ForeignKey('patients.patient_name'), nullable=False)
    appointment_status = Column(String(80), nullable=False)
    appointment_reason = Column(String(180), nullable=True)
    appointment_prescription = Column(String(180), nullable=True)
    appointment_diagnosis = Column(String(180), nullable=True)


engine = create_engine('sqlite:///db.sqlite3')

Base.metadata.create_all(engine)


