from faker import Faker
import random
from models import Doctor, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
# Initialize Faker
fake = Faker()

engine = create_engine('sqlite:///db.sqlite3')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# List of specialties
specialties = [
    "Allergy and Immunology", "Anesthesiology", "Cardiology", "Dermatology",
    "Emergency Medicine", "Endocrinology", "Family Medicine", "Gastroenterology",
    "Geriatrics", "Hematology", "Infectious Disease", "Internal Medicine",
    "Nephrology", "Neurology", "Obstetrics and Gynecology (OB/GYN)", "Oncology",
    "Ophthalmology", "Orthopedics", "Otolaryngology (ENT)", "Pathology",
    "Pediatrics", "Physical Medicine and Rehabilitation (Physiatry)", 
    "Plastic Surgery", "Psychiatry", "Pulmonology", "Radiology", 
    "Rheumatology", "Sports Medicine", "Surgery", "Urology"
]

# Function to generate fake doctor data
def generate_doctor_data(num_doctors):
    doctors = []
    for _ in range(num_doctors):
        doctor = {
            "name": "Dr " + fake.name(),
            "specialty": random.choice(specialties),
            "experience": random.randint(1, 40),  # Years of experience between 1 and 40
            "rating": round(random.uniform(1.0, 5.0), 1)  # Rating between 1.0 and 5.0
        }
        doctors.append(doctor)
    return doctors

# Generate data for 100 fake doctors
doctor_data = generate_doctor_data(500)

# Display the generated doctor data
for doctor in doctor_data:  # Display the first 10 for brevity
    print(doctor)

# Add the generated doctor data to the database
for doctor in doctor_data:
    new_doctor = Doctor(doctor_name=doctor["name"], doctor_speciality=doctor["specialty"], doctor_experience=doctor["experience"], doctor_rating=doctor["rating"])
    session.add(new_doctor)
    session.commit()