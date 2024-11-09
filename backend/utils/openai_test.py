from g4f.client import Client

client = Client()
response = client.chat.completions.create(
    model="o1-mini",
    messages=[{"role": "user", "content": "i a male 8 year old had bruise, fell during workout, whom should he visit Allergy and Immunology,Anesthesiology,Cardiology,Dermatology,Emergency Medicine,Endocrinology,Family Medicine,Gastroenterology,Geriatrics,Hematology,Infectious Disease,Internal Mediccine,Nephrology,Neurology,Obstetrics and Gynecology (OB/GYN),Oncology,Ophthalmology,Orthopedics,Otolaryngology (ENT),Pathology,Pediatrics,Physical Medicine and Rehabilitation (Physiatry),Plastic Surgery,Psychiatry,Pulmonology,Radiology,Rheumatology,Sports Medicine,Surgery,Urology? give result in json in order of rank {'1': '', '2': '', '3': ''}. nothing else"}],
    # Add any other necessary parameters
    response_format={"type": "json_object"}
)
print(response.choices[0].message.content)