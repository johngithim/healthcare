#Add this file to the root of your directory

## .env.local IMPORTANT
PROJECT_ID=688d80ce000601488a3a
API_KEY=standard_31f9aebc8eed888da5ad63f7b9da75cacfcdba2c1517e6c7a6d1fffc8ce307b91833a448565264db3fa9df2eeb7c7d89ed69cab54e7b83dbeb03a906f244c8c38136a13d7199a0a7b778f09dd7bf556ab862cf9ea423fb9c1581d00341953f875336f7b9e722c45d1784b025a0d6ccef7ee62276a7d25c8b28f71c8786c97ba7
DATABASE_ID=688d81930009e14c8201
PATIENT_COLLECTION_ID=688d81c20009f16daf4f
DOCTOR_COLLECTION_ID=688d81e7002d72541d61
APPOINTMENT_COLLECTION_ID=688d83860039aa6e9f0e
NEXT_PUBLIC_BUCKET_ID=688d83c50008c4d7c137
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1

<<<<<<< backend-natan-yidnekachew
# Group 2 - Healthcare project
1. ### Overview
    **Short Description**
    - This app allows patients to gain access to available doctors based on their preference, solving the problem of poor medical access to some people and lack of medical history for the patients.
    **Key Features**
    - Pairing patients with specialized doctors
    - Keeping medical history accessible for all doctors
    - Allowing patients to find doctors they prefer
    **Tech Stack**
    - Front-End: Next.js, Tailwind
    - Back-End: Node.js, MySQL
    **Target Audience / Users**
    - People who don’t have local access to doctors
    - Doctors who need medical history on patients
    **Link to Live Demo / Repo**
    - https://github.com/johngithim/healthcare
2. ### Basic User Workflow
    **Patient**
    - Patient authentication
    - List of doctors (filterable by specialty)
    - Get’s the doctors contact info
    - After the treatment the doctor writes a medical history for the patient
    **Doctor**
    - Creates a profile
    - Specifies his/her specialty
    - Gets a list of patients (searchable)
    - Gets access to the patient’s history
    - Gets to add to the patient’s medical history 

3. ### Modules
    **Authentication System**
    - Profile creation for patient
    - Profile creation for doctor
    - Profile edition for patient
    - Profile edition for doctor
    - Profile deletion for patient
    - Profile deletion for doctor
    **Views**
    - Listing and filtering doctors
    - Retrieve data from the doctor’s table and list
    - Filter by specialty
    - Doctor searches the patient and review’s patient history
    - Get the specialties, contact info and other details of the chosen doctor
    **Edit**
    - Doctor goes to the patient’s profile and adds to the medical history
4. ### Pages (Front-End)
    **Authentication System**
    - Register Page
    - Login Page
    **Profile**
    - View profile
    - Edit profile
    **Views**
    - Doctors Listing page  
        - Filtering the doctors
    - Patients listing page (only visible to the doctors)
        - With a searching functionality
    - Patient detail and medical history for the patient
        - The doctor can add medical history
    - Details page for the preferred doctor by the patient
   ======
#Add this file to the root of your directory

## .env.local IMPORTANT
PROJECT_ID=688d80ce000601488a3a
API_KEY=standard_31f9aebc8eed888da5ad63f7b9da75cacfcdba2c1517e6c7a6d1fffc8ce307b91833a448565264db3fa9df2eeb7c7d89ed69cab54e7b83dbeb03a906f244c8c38136a13d7199a0a7b778f09dd7bf556ab862cf9ea423fb9c1581d00341953f875336f7b9e722c45d1784b025a0d6ccef7ee62276a7d25c8b28f71c8786c97ba7
DATABASE_ID=688d81930009e14c8201
PATIENT_COLLECTION_ID=688d81c20009f16daf4f
DOCTOR_COLLECTION_ID=688d81e7002d72541d61
APPOINTMENT_COLLECTION_ID=688d83860039aa6e9f0e
NEXT_PUBLIC_BUCKET_ID=688d83c50008c4d7c137
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
>>>>>>> master
