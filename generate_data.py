import pandas as pd
import numpy as np
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_heart_data(n_samples=1000):
    """Generate a sample heart disease dataset with realistic values."""

    # Set random seed for reproducibility
    np.random.seed(42)

    # Generate numeric features
    data = {
        'BMI': np.random.normal(28, 5, n_samples),
        'PhysicalHealth': np.random.randint(0, 31, n_samples),
        'MentalHealth': np.random.randint(0, 31, n_samples),
        'SleepTime': np.random.normal(7, 1, n_samples)
    }

    # Generate categorical features
    categorical_features = {
        'Smoking': ['Yes', 'No'],
        'AlcoholDrinking': ['Yes', 'No'],
        'Stroke': ['Yes', 'No'],
        'PhysicalActivity': ['Yes', 'No'],
        'Asthma': ['Yes', 'No'],
        'KidneyDisease': ['Yes', 'No'],
        'SkinCancer': ['Yes', 'No'],
        'Sex': ['Male', 'Female'],
        'AgeCategory': ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49',
                       '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'],
        'Race': ['White', 'Black', 'Asian', 'American Indian/Alaskan Native',
                'Hispanic', 'Other'],
        'Diabetic': ['Yes', 'No', 'No, borderline diabetes', 'Yes (during pregnancy)'],
        'GenHealth': ['Excellent', 'Very good', 'Good', 'Fair', 'Poor']
    }

    for feature, values in categorical_features.items():
        data[feature] = np.random.choice(values, n_samples)

    # Generate target variable (HeartDisease)
    # Create some correlation with features to make it more realistic
    heart_disease_prob = (
        0.1 +  # Base probability
        0.1 * (data['BMI'] > 30) +  # Higher BMI increases risk
        0.1 * (data['PhysicalHealth'] > 15) +  # Poor physical health increases risk
        0.1 * (data['MentalHealth'] > 15) +  # Poor mental health increases risk
        0.1 * (data['SleepTime'] < 6) +  # Poor sleep increases risk
        0.1 * (np.array([age.startswith(('5', '6', '7', '8')) for age in data['AgeCategory']]))  # Age increases risk
    )

    data['HeartDisease'] = np.where(np.random.random(n_samples) < heart_disease_prob, 'Yes', 'No')

    # Create DataFrame
    df = pd.DataFrame(data)

    # Clean up the data
    df['BMI'] = df['BMI'].clip(15, 40)  # BMI between 15 and 40
    df['SleepTime'] = df['SleepTime'].clip(4, 12)  # Sleep between 4 and 12 hours

    return df

def generate_diabetes_data(n_samples=1000):
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

    data['Diabetes'] = np.where(np.random.random(n_samples) < diabetes_prob, 1, 0)

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

    return df

def main():
    # Create Dataset directory if it doesn't exist
    os.makedirs('Dataset', exist_ok=True)

    # Generate and save heart disease data
    logger.info("Generating sample heart disease dataset...")
    heart_df = generate_heart_data(n_samples=1000)
    heart_output_file = 'Dataset/HeartDisease.csv'
    heart_df.to_csv(heart_output_file, index=False)
    logger.info(f"Heart disease dataset saved to {heart_output_file}")
    logger.info(f"Heart disease dataset shape: {heart_df.shape}")

    # Generate and save diabetes data
    logger.info("\nGenerating sample diabetes dataset...")
    diabetes_df = generate_diabetes_data(n_samples=1000)
    diabetes_output_file = 'Dataset/Diabetes.csv'
    diabetes_df.to_csv(diabetes_output_file, index=False)
    logger.info(f"Diabetes dataset saved to {diabetes_output_file}")
    logger.info(f"Diabetes dataset shape: {diabetes_df.shape}")

    # Print summary information
    logger.info("\nSample of heart disease data:")
    logger.info(heart_df.head())

    logger.info("\nSample of diabetes data:")
    logger.info(diabetes_df.head())

    logger.info("\nDatasets generated successfully!")

if __name__ == "__main__":
    main()