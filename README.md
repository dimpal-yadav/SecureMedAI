
# Federated Learning for Heart Disease & Diabetes Prediction

This project implements a **Federated Learning (FL)** system using [Flower (FLWR)](https://flower.dev/) to train models collaboratively for **heart disease** and **diabetes** prediction across multiple clients without sharing raw data. It uses **TensorFlow** for modeling and includes synthetic data generation and preprocessing utilities.

---

## 🧠 Project Structure

```
.
├── Anwarul_TFF.ipynb             # Notebook for testing/training
├── main.py                       # Launches both heart and diabetes servers
├── heart_server.py               # FL server logic for heart disease
├── diabetes_server.py            # FL server logic for diabetes
├── heart_client.py               # FL client logic for heart disease
├── diabetes_client.py            # FL client logic for diabetes
├── data_utils.py                 # Data loading, preprocessing, generation
├── generate_data.py              # Script to generate synthetic datasets
├── model.py                      # Model architecture for both diseases
├── Dataset/
│   ├── HeartDisease.csv          # Generated heart disease dataset
│   └── Diabetes.csv              # Generated diabetes dataset
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
pip install tensorflow flwr pandas numpy scikit-learn
```

### 2. Generate Synthetic Datasets

```bash
python generate_data.py
```

This will generate realistic heart disease and diabetes datasets under the `Dataset/` directory.

---

## 🚀 Running the Federated Servers

### Start Both Servers Simultaneously

```bash
python main.py --disease both
```

Or individually:

```bash
python main.py --disease heart
python main.py --disease diabetes
```

---

## 🧑‍💻 Running Clients

Start clients in separate terminals for each disease.

### Heart Disease Client

```bash
python heart_client.py --client-id 0
python heart_client.py --client-id 1
python heart_client.py --client-id 2
```

### Diabetes Client

```bash
python diabetes_client.py --client-id 0
python diabetes_client.py --client-id 1
python diabetes_client.py --client-id 2
```

> ⚠️ Minimum of **3 clients** are required per disease for training to proceed.

---

## 🧬 Model Architecture

### Heart Disease Model
- Dense(64) → Dropout(0.2)
- Dense(32) → Dropout(0.2)
- Dense(16) → Output(sigmoid)

### Diabetes Model
- Dense(128) → Dropout(0.3)
- Dense(64) → Dropout(0.3)
- Dense(32) → Output(sigmoid)
- Metrics: Accuracy, Precision, Recall

---

## 📊 Logs & Metrics

Both clients and servers log:
- Training & validation loss/accuracy
- Evaluation metrics
- Aggregated round metrics

Saved models are stored as:
- `heart_disease_model_client_<id>.h5`
- `diabetes_model_client_<id>.h5`

---

## 📁 Dataset Details

Datasets are synthetically generated with controlled randomness and realistic distributions. Each dataset has:
- Numeric + categorical features
- Correlated target variables (`HeartDisease`, `Diabetes`)

---

## 🛠️ Future Enhancements

- Integrate real-world datasets (with consent)
- Add secure aggregation techniques
- Visualize model convergence & client drift
- Experiment with other FL strategies (FedProx, FedYogi)

---

## 📚 References

- [Flower Framework Documentation](https://flower.dev/docs/)
- [TensorFlow](https://www.tensorflow.org/)
- [Federated Learning - Google AI Blog](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)

---

## 👩‍💻 Author

**Anwarul** | *Federated Learning Developer & Data Science Enthusiast*
