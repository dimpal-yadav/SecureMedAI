# Federated Learning Healthcare Platform – Work Division

## 1. Frontend (React)
**Objective:** Build an interactive and secure web interface for hospitals to upload data, view preprocessing results, trigger training, and monitor models.

### Modules and Responsibilities:
- **Authentication Interface**
  - Login and registration forms
  - Integration with JWT-based authentication

- **CSV Upload Interface**
  - Upload button with file validation (type, size)
  - Schema preview before submission

- **Preprocessing Result Display**
  - Column alignment/mapping display
  - Missing value and normalization summary
  - Categorical column encoding details

- **Model Training Dashboard**
  - Button to trigger local training
  - Progress indicators for current round
  - Local model vs global model performance

- **Model Metrics and History View**
  - Graphs for accuracy, loss, contribution scores
  - List of completed training rounds with timestamps

- **System Status and Notifications**
  - Alerts for training completion or errors
  - API error messages and form validation feedback

---

## 2. Backend (FastAPI)
**Objective:** Provide secure APIs for authentication, data handling, local training management, and federated model aggregation.

### Modules and Responsibilities:
- **User Management and Authentication**
  - Registration and login APIs
  - JWT token generation and validation
  - Role-based access control

- **File Upload and Validation**
  - Accept CSV files and check for file integrity
  - Parse headers and sample rows for schema preview

- **Preprocessing Controller**
  - Trigger the preprocessing pipeline for uploaded datasets
  - Return results including transformed schema, encoded columns, normalization logs

- **Training Job Handler**
  - API to trigger local model training per hospital
  - Track training status and return logs

- **Model Update API**
  - Accept serialized model weights from hospital nodes
  - Validate model structure and check for version consistency

- **Aggregation Controller**
  - Implement Federated Averaging (FedAvg) or other aggregation logic
  - Maintain and version the global model

- **Metrics and Log API**
  - Serve model metrics and history to the frontend
  - Return data for plotting performance graphs

---

## 3. Data Collectivity and Preprocessing
**Objective:** Ensure raw CSV data from hospitals is cleaned, standardized, and made compatible for local model training.

### Tasks and Responsibilities:
- **Schema Standardization**
  - Align column names across different hospitals
  - Use mapping dictionaries or fuzzy matching algorithms

- **Missing Value Handling**
  - Apply imputation techniques (mean, median, mode)
  - Generate missing value reports

- **Categorical Variable Encoding**
  - Encode string columns using label encoding or one-hot encoding
  - Save encoding mappings for later decoding

- **Data Normalization**
  - Standardize numerical features using Min-Max or Z-score normalization
  - Ensure consistent scales across hospitals

- **Outlier Detection**
  - Optional module to detect and flag outliers using statistical methods

- **Automated Preprocessing Pipeline**
  - Convert above steps into a reusable and pluggable pipeline
  - Log all transformations applied for auditability

---

## 4. Federated Learning Implementation
**Objective:** Enable local training at hospital nodes and secure aggregation at a central server without sharing raw data.

### Tasks and Responsibilities:
- **Federated Learning Framework Integration**
  - Choose and set up a framework (Flower / FedML / PySyft)
  - Define the base model (e.g., logistic regression, neural network)

- **Local Training Module**
  - Develop a Dockerized service that trains a model using local hospital data
  - Log training loss, accuracy, and model parameters
  - Save and serialize trained models for transmission

- **Secure Communication**
  - Send model updates to central server over encrypted channels
  - Implement optional differential privacy or secure aggregation techniques

- **Central Aggregator**
  - Collect model weights from multiple hospitals
  - Aggregate them using FedAvg or other strategies
  - Distribute the updated global model back to hospital nodes

- **Training Round Orchestration**
  - Maintain synchronization between hospitals and server
  - Track which hospitals participated in each round

- **Monitoring and Evaluation**
  - Evaluate aggregated model on a validation set
  - Track hospital contributions and performance changes across rounds
