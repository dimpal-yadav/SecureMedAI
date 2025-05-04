import flwr as fl
import tensorflow as tf
import numpy as np
from model import create_diabetes_model
from data_utils import load_diabetes_data
import logging
from typing import Dict, List, Tuple, Optional

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DiabetesClient(fl.client.NumPyClient):
    def __init__(self, client_id):
        self.client_id = client_id
        # Load data first to get the correct input shape
        self.x_train, self.y_train, self.x_test, self.y_test = load_diabetes_data(client_id)
        # Create model with the correct input shape
        self.model = create_diabetes_model(input_shape=(self.x_train.shape[1],))
        logger.info(f"Diabetes Client {client_id} initialized with input shape: {self.x_train.shape[1]}")

    def get_parameters(self, config):
        """Get model parameters."""
        return [val.numpy() for val in self.model.trainable_variables]

    def fit(self, parameters, config):
        """Train the model on the client's data."""
        # Set model parameters
        self.model.set_weights(parameters)

        # Train the model with verbose output
        history = self.model.fit(
            self.x_train, self.y_train,
            epochs=5,
            batch_size=32,
            validation_split=0.2,
            verbose=1
        )

        # Get metrics
        metrics = {
            "train_loss": history.history["loss"][-1],
            "train_accuracy": history.history["accuracy"][-1],
            "val_loss": history.history["val_loss"][-1],
            "val_accuracy": history.history["val_accuracy"][-1],
            "client_id": self.client_id
        }

        # Print detailed metrics
        logger.info(f"Diabetes Client {self.client_id} Training Results:")
        logger.info(f"Final Training Loss: {metrics['train_loss']:.4f}")
        logger.info(f"Final Training Accuracy: {metrics['train_accuracy']:.4f}")
        logger.info(f"Final Validation Loss: {metrics['val_loss']:.4f}")
        logger.info(f"Final Validation Accuracy: {metrics['val_accuracy']:.4f}")

        # Save the model after training
        self.save_model()

        return self.get_parameters(config), len(self.x_train), metrics

    def evaluate(self, parameters, config):
        """Evaluate the model on the client's data."""
        # Set model parameters
        self.model.set_weights(parameters)

        # Evaluate the model - use unpacking with * to capture all metrics
        evaluation_results = self.model.evaluate(self.x_test, self.y_test, verbose=1)

        # Handle both cases: if evaluate returns a list or a single value
        if isinstance(evaluation_results, list):
            # Get metric names from model.metrics_names
            metric_names = self.model.metrics_names
            # Create a dictionary of metrics
            metrics_dict = {name: value for name, value in zip(metric_names, evaluation_results)}
            loss = metrics_dict['loss']
            accuracy = metrics_dict.get('accuracy', 0.0)  # Default to 0 if not available
        else:
            # If only loss is returned
            loss = evaluation_results
            accuracy = 0.0

        metrics = {
            "test_loss": loss,
            "test_accuracy": accuracy,
            "client_id": self.client_id
        }

        # Print evaluation results
        logger.info(f"Diabetes Client {self.client_id} Evaluation Results:")
        logger.info(f"Test Loss: {loss:.4f}")
        logger.info(f"Test Accuracy: {accuracy:.4f}")

        return loss, len(self.x_test), metrics

    def save_model(self):
        """Save the trained model."""
        try:
            model_path = f'diabetes_model_client_{self.client_id}.h5'
            self.model.save(model_path)
            logger.info(f"Diabetes Client {self.client_id}: Model saved to {model_path}")
        except Exception as e:
            logger.error(f"Error saving model for diabetes client {self.client_id}: {str(e)}")

def main():
    # Parse command line arguments
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--client-id", type=int, required=True)
    parser.add_argument("--server-address", type=str, default="127.0.0.1:8081")
    args = parser.parse_args()

    # Create and start client
    client = DiabetesClient(args.client_id)
    fl.client.start_numpy_client(
        server_address=args.server_address,
        client=client
    )

if __name__ == "__main__":
    main()