# 🩺 Privacy-Preserving Diabetes Prediction using Federated Learning

## 👩‍⚕️ Objective
To predict diabetes risk using **federated learning**, where multiple hospitals collaborate to train machine learning models **without sharing raw patient data** — preserving privacy while improving prediction performance across a diverse population.

---

## 📊 Data Sources

- **Hospital Groups:**  
  Large-scale datasets collected from health camps.  
  ➤ Example: 8,000+ entries per group.

- **Individual Hospitals:**  
  Smaller datasets generated through daily patient interactions.  
  ➤ Example: ~100 patient records per day.

---

## 🧠 Model Design

A lightweight **Multi-Layer Perceptron (MLP)** is used, customized for each hospital type:

| Group      | Task Type          | Output Format                        |
|------------|--------------------|--------------------------------------|
| Group A    | Multiclass         | 0 = No Risk, 1 = At Risk, 2 = Diabetic |
| Group B    | Multiclass (Rare)  | E.g., Type 1 / Type 2 / LADA         |
| Group C    | Binary Classification | Yes / No                         |

---

## ⚙️ Feature Harmonization

To ensure compatibility across datasets:
- **Standardize column names:** (e.g., `Age`, `BMI`, `Glucose`)
- **Map categorical variables:** (e.g., `Gender`: M/F → 0/1)
- **Unify schema:** Create a common input structure for all models.

---

## 🔄 Federated Learning Workflow

1. **Local Training:**  
   Each hospital trains a local MLP model on its own dataset.

2. **Model Update Sharing:**  
   Only the **model weights/gradients** are sent to a central server — **not the raw data**.

3. **Aggregation:**  
   The server aggregates these updates using **FedAvg (Federated Averaging)**.

4. **Global Model Sharing:**  
   The updated global model is distributed back to all hospitals.

5. **Repeat:**  
   The cycle continues for multiple rounds to improve convergence and accuracy.

---

## 🌐 Web Platform Overview

**Built using:** `React` (frontend) and `FastAPI` (backend)

### 💻 Features:
- **Data Input Interface:**  
  Hospitals can enter patient data via forms or CSV uploads.

- **Model Inference:**  
  Local model predicts diabetes risk in real-time for the input data.

- **Secure Storage:**  
  Predictions and logs are stored securely.

- **Admin Dashboard:**  
  Monitors:
  - Model performance metrics
  - Federated rounds
  - Hospital participation stats

---

## 🔐 Key Advantages

- **Privacy-Preserving:**  
  No sensitive patient data is ever shared outside the hospital.

- **Collaborative Learning:**  
  Improves prediction accuracy by learning from a wide range of institutions.

- **Scalable & Adaptable:**  
  Works effectively with both large hospital networks and smaller individual clinics.

---

## 📦 Technologies Used

- **Frontend:** React.js  
- **Backend:** FastAPI  
- **ML Framework:** PyTorch / TensorFlow (via Flower for FL)  
- **Storage:** PostgreSQL / Firebase (optional)  
- **Federated Learning Library:** Flower (https://flower.dev/)

---

## 🚀 Future Enhancements

- Integrate Secure Aggregation & Differential Privacy
- Real-time alert system for high-risk patients
- Add support for other chronic disease predictions
