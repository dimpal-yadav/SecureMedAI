import pickle
from matplotlib import pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import ConfusionMatrixDisplay, classification_report, confusion_matrix

import pandas as pd
import numpy as np


# Load the dataset (binary symptoms)
df = pd.read_csv('disease_symptoms_binary.csv')
df_1 = pd.read_csv('disease_symptoms_binary_noisy.csv')

# Split into features (X) and target (y)
X = df.drop('Disease', axis=1)  # Binary symptom columns
y = df['Disease']               # Disease labels

X_1 = df_1.drop('Disease', axis=1)  # Binary symptom columns
y_1 = df_1['Disease']               # Disease labels


# Train-test split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train_1, X_test_1, y_train_1, y_test_1 = train_test_split(X_1, y_1, test_size=0.2, stratify=y, random_state=42)


# Train a Random Forest model
from sklearn.model_selection import RandomizedSearchCV

# Train a Random Forest model (original dataset, no tuning)
model = RandomForestClassifier()
model.fit(X, y)

# Hyperparameter tuning for noisy dataset
param_dist = {
    'n_estimators': [100, 200, 300, 500],
    'max_depth': [None, 10, 20, 30, 50],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'max_features': ['sqrt', 'log2', None]
}

rf = RandomForestClassifier(random_state=42)

random_search = RandomizedSearchCV(
    estimator=rf,
    param_distributions=param_dist,
    n_iter=50,        # Number of random combinations
    cv=3,             # Cross-validation folds
    verbose=2,
    random_state=42,
    n_jobs=-1
)

# Fit search on noisy dataset
random_search.fit(X_train_1, y_train_1)

print("Best Parameters:", random_search.best_params_)
model_1 = random_search.best_estimator_



# Evaluate
y_pred = model_1.predict(X_test_1)
print(classification_report(y_test_1, y_pred))

cm = confusion_matrix(y_test_1, y_pred)

# Create display object
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=model.classes_)

# Plot with rotated labels
fig, ax = plt.subplots(figsize=(10, 8))
disp.plot(ax=ax, xticks_rotation=45)  # Rotate x-axis labels by 45 degrees

# Optional additional formatting
plt.xticks(rotation=45, ha='right')  # Ensures proper alignment
plt.yticks(rotation=0)
plt.tight_layout()  # Prevents label cutoff
plt.show()

with open("RFsymptomsmodel.pkl", "wb") as f:
    pickle.dump(model, f)


