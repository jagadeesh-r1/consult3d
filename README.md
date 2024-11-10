# HackPrinceton Fall 2024

## Project Overview

Welcome to the HackPrinceton Fall 2024 project! This project is a comprehensive telemedicine platform designed to facilitate remote medical consultations. The platform allows patients to schedule appointments, consult with doctors, and manage their medical profiles seamlessly.

## Features

- **User Authentication**: Secure login and registration for patients and doctors.
- **Profile Management**: Patients can complete and update their medical profiles.
- **Appointment Scheduling**: Patients can schedule new consultations with doctors based on their specialties, experience, and ratings.
- **Doctor Recommendations**: The platform suggests doctors based on the patient's symptoms and medical history.
- **Emergency Alerts**: Immediate alerts for emergency medical situations.
- **Responsive Design**: User-friendly interface that works across various devices.

## Technologies Used

- **Frontend**: React, CSS, HTML
- **Backend**: Flask, Python
- **Database**: SQLAlchemy, SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API for communication between frontend and backend

## Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- Virtualenv (optional but recommended)

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/hackprinceton-fall24.git
    cd hackprinceton-fall24/backend
    ```

2. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the Flask application:
    ```sh
    flask run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

3. Start the React application:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register as a new user or log in with your existing credentials.
3. Complete your profile by providing the necessary medical information.
4. Schedule a new consultation by selecting a doctor based on specialty, experience, and rating.
5. Manage your appointments and view your consultation history.

## Project Structure
