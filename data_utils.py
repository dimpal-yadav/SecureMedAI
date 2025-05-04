import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
import logging
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_data(client_id):
    """Load and preprocess heart disease data for a specific client."""
    try:
        # Load the dataset
        df = pd.read_csv('Dataset/HeartDisease.csv')

        # Convert target variable to numeric first
        df['HeartDisease'] = df['HeartDisease'].map({'Yes': 1, 'No': 0})

        # Define features and target
        X = df.drop('HeartDisease', axis=1)
        y = df['HeartDisease']

        # Split data into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Define numeric and categorical columns
        numeric_features = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime']
        categorical_features = ['Smoking', 'AlcoholDrinking', 'Stroke', 'PhysicalActivity',
                              'Asthma', 'KidneyDisease', 'SkinCancer', 'Sex', 'AgeCategory',
                              'Race', 'Diabetic', 'GenHealth']

        # Create preprocessing steps
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numeric_features),
                ('cat', OneHotEncoder(sparse_output=False, handle_unknown='ignore'), categorical_features)
            ])

        # Fit and transform the data
        X_train_processed = preprocessor.fit_transform(X_train)
        X_test_processed = preprocessor.transform(X_test)

        # Split data for clients (3-way split)
        num_clients = 3
        client_size = len(X_train_processed) // num_clients

        # Calculate start and end indices for this client
        start_idx = client_id * client_size
        end_idx = start_idx + client_size if client_id < num_clients - 1 else len(X_train_processed)

        # Get this client's portion of the data
        X_train_client = X_train_processed[start_idx:end_idx]
        y_train_client = y_train.iloc[start_idx:end_idx]

        # Convert to float32
        X_train_client = X_train_client.astype(np.float32)
        y_train_client = y_train_client.astype(np.float32)
        X_test_processed = X_test_processed.astype(np.float32)
        y_test = y_test.astype(np.float32)

        logger.info(f"Heart Disease Client {client_id}: Loaded {len(X_train_client)} training samples")

        return X_train_client, y_train_client, X_test_processed, y_test

    except Exception as e:
        logger.error(f"Error loading heart disease data for client {client_id}: {str(e)}")
        raise

def load_diabetes_data(client_id):
    """Load and preprocess diabetes data for a specific client."""
    try:
        # Check if dataset exists, if not, generate sample data
        diabetes_file = 'Dataset/Diabetes.csv'
        if not os.path.exists(diabetes_file):
            logger.warning(f"Diabetes dataset not found at {diabetes_file}, generating sample data")
            generate_diabetes_sample_data()

        # Load the dataset
        df = pd.read_csv('Dataset/Diabetes.csv')

        # Ensure the target variable is binary
        if 'Diabetes' in df.columns:
            # Convert target variable to numeric if needed
            if df['Diabetes'].dtype == 'object':
                df['Diabetes'] = df['Diabetes'].map({'Yes': 1, 'No': 0})
        else:
            logger.error("Diabetes column not found in the dataset")
            raise ValueError("Diabetes column not found in the dataset")

        # Define features and target
        X = df.drop('Diabetes', axis=1)
        y = df['Diabetes']

        # Split data into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Define numeric and categorical columns - adjust based on your diabetes dataset
        # Example for a typical diabetes dataset
        numeric_features = [col for col in X.columns if X[col].dtype != 'object']
        categorical_features = [col for col in X.columns if X[col].dtype == 'object']

        # Create preprocessing steps
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numeric_features if numeric_features else []),
                ('cat', OneHotEncoder(sparse_output=False, handle_unknown='ignore'),
                 categorical_features if categorical_features else [])
            ])

        # Fit and transform the data
        X_train_processed = preprocessor.fit_transform(X_train)
        X_test_processed = preprocessor.transform(X_test)

        # Split data for clients (3-way split)
        num_clients = 3
        client_size = len(X_train_processed) // num_clients

        # Calculate start and end indices for this client
        start_idx = client_id * client_size
        end_idx = start_idx + client_size if client_id < num_clients - 1 else len(X_train_processed)

        # Get this client's portion of the data
        X_train_client = X_train_processed[start_idx:end_idx]
        y_train_client = y_train.iloc[start_idx:end_idx]

        # Convert to float32
        X_train_client = X_train_client.astype(np.float32)
        y_train_client = y_train_client.astype(np.float32)
        X_test_processed = X_test_processed.astype(np.float32)
        y_test = y_test.astype(np.float32)

        logger.info(f"Diabetes Client {client_id}: Loaded {len(X_train_client)} training samples")

        return X_train_client, y_train_client, X_test_processed, y_test

    except Exception as e:
        logger.error(f"Error loading diabetes data for client {client_id}: {str(e)}")
        raise

def generate_diabetes_sample_data(n_samples=1000):
    """Generate a sample diabetes dataset with realistic values."""

    # Set random seed for reproducibility
    np.random.seed(42)

    # Generate numeric features
    data = {
        'Pregnancies': np.random.randint(0, 18, n_samples),
        'Glucose': np.random.normal(120, 30, n_samples),
        'BloodPressure': np.random.normal(70, 10, n_samples),
        'SkinThickness': np.random.normal(20, 10, n_samples),
        'Insulin': np.random.normal(80, 20, n_samples),
        'BMI': np.random.normal(32, 6, n_samples),
        'DiabetesPedigreeFunction': np.random.normal(0.5, 0.3, n_samples),
        'Age': np.random.normal(35, 12, n_samples)
    }

    # Generate target variable (Diabetes)
    # Create some correlation with features to make it more realistic
    diabetes_prob = (
        0.1 +  # Base probability
        0.1 * (data['Glucose'] > 140) +  # Higher glucose increases risk
        0.1 * (data['BMI'] > 35) +  # Higher BMI increases risk
        0.1 * (data['Age'] > 40) +  # Higher age increases risk
        0.1 * (data['Pregnancies'] > 5)  # More pregnancies may increase risk (for females)
    )

    data['Diabetes'] = (np.random.random(n_samples) < diabetes_prob).astype(int)

    # Create DataFrame
    df = pd.DataFrame(data)

    # Clean up the data - ensure realistic ranges
    df['Glucose'] = df['Glucose'].clip(70, 200)
    df['BloodPressure'] = df['BloodPressure'].clip(40, 100)
    df['SkinThickness'] = df['SkinThickness'].clip(5, 50)
    df['Insulin'] = df['Insulin'].clip(10, 200)
    df['BMI'] = df['BMI'].clip(15, 50)
    df['DiabetesPedigreeFunction'] = df['DiabetesPedigreeFunction'].clip(0.1, 2.0)
    df['Age'] = df['Age'].clip(21, 80)

    # Make sure directory exists
    os.makedirs('Dataset', exist_ok=True)

    # Save to CSV
    output_file = 'Dataset/Diabetes.csv'
    df.to_csv(output_file, index=False)
    logger.info(f"Generated sample diabetes dataset saved to {output_file}")

    return df

def preprocess_input(data, disease_type='heart'):
    """Preprocess input data for prediction."""
    # Convert input data to DataFrame
    df = pd.DataFrame([data])

    if disease_type.lower() == 'heart':
        # Define columns for heart disease data
        categorical_columns = [
            'Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking',
            'Sex', 'AgeCategory', 'Race', 'Diabetic', 'PhysicalActivity',
            'GenHealth', 'Asthma', 'KidneyDisease', 'SkinCancer'
        ]
        numeric_columns = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime']
    else:  # diabetes
        # Define columns for diabetes data
        categorical_columns = []  # Adjust as needed for your diabetes dataset
        numeric_columns = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                         'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']

    # Process categorical columns
    for column in categorical_columns:
        if column in df.columns:
            df[column] = df[column].astype(str)

    # Process numeric columns
    for column in numeric_columns:
        if column in df.columns:
            df[column] = pd.to_numeric(df[column], errors='coerce')

    # Fill any missing values with 0
    df = df.fillna(0)

    # Scale the features
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(df)

    # Convert to float32 for TensorFlow
    return scaled_data.astype(np.float32)