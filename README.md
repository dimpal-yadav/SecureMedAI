# 🛡️ SecureMedAI

**An AI-powered healthcare platform leveraging machine learning and federated learning to predict diseases, recommend specialized doctors, and manage patient records securely through an integrated Electronic Health Record (EHR) system.**

---

## 📖 Overview

SecureMedAI is a full-stack healthcare application designed to make early diagnosis and digital health tracking both intelligent and accessible. By analyzing user-reported symptoms, the platform predicts potential diseases, suggests relevant doctors, and maintains a secure, personalized medical history for each user.

---

## 🔑 Core Features

- ### 🤖 AI-Based Disease Prediction  
  Input symptoms to receive the **top 3 predicted diseases** using a trained **Random Forest** model.

- ### 👨‍⚕️ Smart Doctor Recommendations  
  Automatically suggests doctors based on the specialization required for the predicted disease.

- ### 📁 Electronic Health Record (EHR) System  
  Maintains a **secure, timestamped history** of:
  - Submitted symptoms  
  - Predicted diseases  
  - Doctor recommendations  
  - Previous user consultations  

- ### 🔐 User Authentication & Security  
  Implements **JWT-based authentication** for secure login, registration, and access to protected routes.

- ### 🧍‍♂️ Profile Management  
  Users can view and update their personal details including:
  - Name  
  - Age  
  - Gender  
  - Blood Group

- ### 🔗 API Integration  
  A set of RESTful APIs powers seamless integration with the **React.js** frontend.

---

## 🛠️ Tech Stack

| Layer        | Technologies                                      |
|--------------|--------------------------------------------------|
| **Frontend** | React.js, Tailwind CSS                           |
| **Backend**  | Django, Django REST Framework                    |
| **Database** | PostgreSQL                                       |
| **ML Model** | Random Forest (scikit-learn), pandas, NumPy      |
| **Auth**     | JWT (JSON Web Tokens)                            |

---

## 📌 Project Goals

- Improve accessibility to healthcare advice using intelligent predictions.  
- Enhance patient engagement through digital records and self-monitoring.  
- Ensure **data privacy** and **security** using best practices in EHR handling and federated learning principles.

---

## 🚀 Future Enhancements

- Integration of Federated Learning for decentralized model training.
- Multi-language support for better accessibility.
- Real-time chat with doctors via secure video/audio.

---

## 🧑‍💻 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/SecureMedAI.git
cd SecureMedAI

# Backend setup (inside /backend directory)
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py runserver

# Frontend setup (inside /frontend directory)
npm install
npm start
```

---

## 📬 Contact

For feedback or queries, feel free to reach out via open an issue in this repo.

---

## 🖼️ Output Screenshots

Below are some screenshots demonstrating the output and UI of SecureMedAI:

| Screenshot |
|------------|
| ![Screenshot 2025-07-07 141924](screenshots/Screenshot%202025-07-07%20141924.png) |
| ![Screenshot 2025-07-07 141936](screenshots/Screenshot%202025-07-07%20141936.png) |
| ![Screenshot 2025-07-07 142004](screenshots/Screenshot%202025-07-07%20142004.png) |
| ![Screenshot 2025-07-07 142040](screenshots/Screenshot%202025-07-07%20142040.png) |
| ![Screenshot 2025-07-07 142112](screenshots/Screenshot%202025-07-07%20142112.png) |
| ![Screenshot 2025-07-07 142130](screenshots/Screenshot%202025-07-07%20142130.png) |
| ![Screenshot 2025-07-07 142247](screenshots/Screenshot%202025-07-07%20142247.png) |
| ![Screenshot 2025-07-07 142325](screenshots/Screenshot%202025-07-07%20142325.png) |

---
