import pandas as pd
import numpy as np

def generate_sample_data(n_samples=1000):
    """Generate a sample heart disease dataset with realistic values."""
    
    # Set random seed for reproducibility
    np.random.seed(42)
    
    # Generate numeric features
    data = {
        'bmi': np.random.normal(28, 5, n_samples),
        'physicalHealth': np.random.randint(0, 31, n_samples),
        'mentalHealth': np.random.randint(0, 31, n_samples),
        'sleepTime': np.random.normal(7, 1, n_samples)
    }
    
    # Generate categorical features
    categorical_features = {
        'smoking': ['Yes', 'No'],
        'alcoholDrinking': ['Yes', 'No'],
        'stroke': ['Yes', 'No'],
        'physicalActivity': ['Yes', 'No'],
        'asthma': ['Yes', 'No'],
        'kidneyDisease': ['Yes', 'No'],
        'skinCancer': ['Yes', 'No'],
        'sex': ['Male', 'Female'],
        'ageCategory': ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49', 
                       '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'],
        'race': ['White', 'Black', 'Asian', 'American Indian/Alaskan Native', 
                'Hispanic', 'Other'],
        'diabetic': ['Yes', 'No', 'No, borderline diabetes', 'Yes (during pregnancy)'],
        'genHealth': ['Excellent', 'Very good', 'Good', 'Fair', 'Poor']
    }
    
    for feature, values in categorical_features.items():
        data[feature] = np.random.choice(values, n_samples)
    
    # Generate target variable (HeartDisease)
    # Create some correlation with features to make it more realistic
    heart_disease_prob = (
        0.1 +  # Base probability
        0.1 * (data['bmi'] > 30) +  # Higher BMI increases risk
        0.1 * (data['physicalHealth'] > 15) +  # Poor physical health increases risk
        0.1 * (data['mentalHealth'] > 15) +  # Poor mental health increases risk
        0.1 * (data['sleepTime'] < 6) +  # Poor sleep increases risk
        0.1 * (data['ageCategory'].isin(['55-59', '60-64', '65-69', '70-74', '75-79', '80+']))  # Age increases risk
    )
    
    data['HeartDisease'] = (np.random.random(n_samples) < heart_disease_prob).astype(int)
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Clean up the data
    df['bmi'] = df['bmi'].clip(15, 40)  # BMI between 15 and 40
    df['sleepTime'] = df['sleepTime'].clip(4, 12)  # Sleep between 4 and 12 hours
    
    return df

def main():
    # Generate sample data
    print("Generating sample heart disease dataset...")
    df = generate_sample_data(n_samples=1000)
    
    # Save to CSV
    output_file = 'heart_disease_data.csv'
    df.to_csv(output_file, index=False)
    print(f"Sample dataset saved to {output_file}")
    print(f"Dataset shape: {df.shape}")
    print("\nSample of the data:")
    print(df.head())
    print("\nFeature statistics:")
    print(df.describe())

if __name__ == "__main__":
    main() 