import tensorflow as tf
import numpy as np
from data_utils import load_and_preprocess_data
import logging
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_model(input_shape):
    """Create and compile the model."""
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=input_shape),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def main():
    try:
        # Define the data file path
        data_file = 'C:\Users\MIS\.redhat\Desktop\FL Hospital\Dataset\HeartDisease.csv'
        
        # Check if the data file exists
        if not os.path.exists(data_file):
            logger.error(f"Data file '{data_file}' not found. Please ensure the file exists in the current directory.")
            return
        
        # Load and preprocess the data
        logger.info("Loading and preprocessing data...")
        X_train, y_train, X_test, y_test = load_and_preprocess_data(data_file)
        
        # Create and compile the model
        logger.info("Creating model...")
        model = create_model(input_shape=(X_train.shape[1],))
        
        # Train the model
        logger.info("Training model...")
        history = model.fit(
            X_train, y_train,
            epochs=50,
            batch_size=32,
            validation_split=0.2,
            verbose=1
        )
        
        # Evaluate the model
        logger.info("Evaluating model...")
        test_loss, test_accuracy = model.evaluate(X_test, y_test)
        logger.info(f"Test accuracy: {test_accuracy:.4f}")
        
        # Save the model
        logger.info("Saving model...")
        model.save('heart_disease_model.h5')
        logger.info("Model saved successfully!")
        
    except Exception as e:
        logger.error(f"Error during model training: {str(e)}")
        raise

if __name__ == "__main__":
    main() 