import flwr as fl
import tensorflow as tf
from model import create_model
import logging
import numpy as np

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HeartDiseaseServer(fl.server.strategy.FedAvg):
    def __init__(self, *args, **kwargs):
        # Create model with correct input shape
        self.model = create_model(input_shape=(48,))  # Match the preprocessed input shape

        # Get initial weights from the model rather than hardcoding shapes
        initial_weights = self.model.get_weights()
        initial_parameters = fl.common.ndarrays_to_parameters(initial_weights)

        # Update kwargs with the correct initial parameters
        if "initial_parameters" in kwargs:
            kwargs["initial_parameters"] = initial_parameters

        super().__init__(*args, **kwargs)

    def aggregate_fit(self, server_round, results, failures):
        """Aggregate model updates from clients."""
        aggregated_weights, aggregated_metrics = super().aggregate_fit(server_round, results, failures)

        if aggregated_weights is not None:
            # Convert Flower Parameters to numpy arrays
            weights = [np.array(w) for w in fl.common.parameters_to_ndarrays(aggregated_weights)]
            self.model.set_weights(weights)

            # Log detailed metrics from each client
            for client, fit_res in results:
                if fit_res.metrics:
                    logger.info(f"Round {server_round} - Client {fit_res.metrics.get('client_id')} Metrics:")
                    logger.info(f"  Training Loss: {fit_res.metrics.get('train_loss', 'N/A'):.4f}")
                    logger.info(f"  Training Accuracy: {fit_res.metrics.get('train_accuracy', 'N/A'):.4f}")
                    logger.info(f"  Validation Loss: {fit_res.metrics.get('val_loss', 'N/A'):.4f}")
                    logger.info(f"  Validation Accuracy: {fit_res.metrics.get('val_accuracy', 'N/A'):.4f}")

            logger.info(f"Round {server_round}: Model updated with aggregated weights")

        return aggregated_weights, aggregated_metrics

    def aggregate_evaluate(self, server_round, results, failures):
        """Aggregate evaluation results."""
        loss_aggregated, metrics_aggregated = super().aggregate_evaluate(server_round, results, failures)

        if loss_aggregated is not None:
            logger.info(f"\nRound {server_round} - Aggregated Results:")
            logger.info(f"  Aggregated Loss: {loss_aggregated:.4f}")

            # Log detailed metrics from each client
            for client, eval_res in results:
                if eval_res.metrics:
                    logger.info(f"\n  Client {eval_res.metrics.get('client_id')} Evaluation:")
                    logger.info(f"    Test Loss: {eval_res.metrics.get('test_loss', 'N/A'):.4f}")
                    logger.info(f"    Test Accuracy: {eval_res.metrics.get('test_accuracy', 'N/A'):.4f}")

            # Calculate and log average metrics
            if metrics_aggregated:
                avg_accuracy = np.mean([eval_res.metrics.get('test_accuracy', 0) for _, eval_res in results])
                logger.info(f"\n  Average Test Accuracy: {avg_accuracy:.4f}")

        return loss_aggregated, metrics_aggregated

def main():
    # Create model to get the correct shape
    model = create_model(input_shape=(48,))
    initial_parameters = fl.common.ndarrays_to_parameters(model.get_weights())

    # Create strategy with the correct initial parameters
    strategy = HeartDiseaseServer(
        fraction_fit=1.0,
        fraction_evaluate=1.0,
        min_available_clients=3,
        min_fit_clients=3,
        min_evaluate_clients=3,
        on_fit_config_fn=lambda _: {"epochs": 5},
        on_evaluate_config_fn=lambda _: {"epochs": 5},
        initial_parameters=initial_parameters
    )

    # Start server
    fl.server.start_server(
        server_address="[::]:8080",
        config=fl.server.ServerConfig(num_rounds=3),
        strategy=strategy
    )

if __name__ == "__main__":
    main()