import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_data(client_id):
    """Load and preprocess data for a specific client."""
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
        
        logger.info(f"Client {client_id}: Loaded {len(X_train_client)} training samples")
        
        return X_train_client, y_train_client, X_test_processed, y_test
        
    except Exception as e:
        logger.error(f"Error loading data for client {client_id}: {str(e)}")
        raise

def load_and_preprocess_data(file_path):
    """Load and preprocess the heart disease dataset."""
    # Read the data
    df = pd.read_csv(file_path)
    
    # Convert target variable to numeric first
    df['HeartDisease'] = df['HeartDisease'].map({'Yes': 1, 'No': 0})
    
    # Convert categorical variables to numeric using label encoding
    categorical_columns = [
        'Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking',
        'Sex', 'AgeCategory', 'Race', 'Diabetic', 'PhysicalActivity',
        'GenHealth', 'Asthma', 'KidneyDisease', 'SkinCancer'
    ]
    
    label_encoders = {}
    for column in categorical_columns:
        if column in df.columns:
            label_encoders[column] = LabelEncoder()
            df[column] = label_encoders[column].fit_transform(df[column].astype(str))
    
    # Convert numeric columns
    numeric_columns = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime']
    for column in numeric_columns:
        if column in df.columns:
            df[column] = pd.to_numeric(df[column], errors='coerce')
    
    # Fill missing values
    df = df.fillna(df.mean())
    
    # Separate features and target
    X = df.drop('HeartDisease', axis=1)
    y = df['HeartDisease']
    
    # Scale the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )
    
    # Convert to float32 for TensorFlow
    X_train = X_train.astype(np.float32)
    X_test = X_test.astype(np.float32)
    y_train = y_train.astype(np.float32)
    y_test = y_test.astype(np.float32)
    
    return X_train, y_train, X_test, y_test

def preprocess_input(data):
    """Preprocess input data for prediction."""
    # Convert input data to DataFrame
    df = pd.DataFrame([data])
    
    # Convert categorical variables to numeric
    categorical_columns = [
        'Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking',
        'Sex', 'AgeCategory', 'Race', 'Diabetic', 'PhysicalActivity',
        'GenHealth', 'Asthma', 'KidneyDisease', 'SkinCancer'
    ]
    
    for column in categorical_columns:
        if column in df.columns:
            df[column] = df[column].astype(str)
    
    # Convert numeric columns
    numeric_columns = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime']
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

def load_and_preprocess_data(file_path):
    """
    Load and preprocess the training data.
    
    Args:
        file_path (str): Path to the CSV file containing the training data
        
    Returns:
        tuple: (X_train, y_train, X_test, y_test) Preprocessed training and test data
    """
    # Load the data
    df = pd.read_csv(file_path)
    
    # Separate features and target
    X = df.drop('HeartDisease', axis=1)
    y = df['HeartDisease']
    
    # Convert categorical variables to numeric
    categorical_columns = X.select_dtypes(include=['object']).columns
    for col in categorical_columns:
        X[col] = X[col].astype('category').cat.codes
    
    # Scale the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )
    
    return X_train, y_train, X_test, y_test 