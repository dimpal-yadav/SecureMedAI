import flwr as fl
from heart_server import HeartDiseaseServer
from diabetes_server import DiabetesServer
import logging
import threading
import argparse

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def start_heart_disease_server():
    """Start the heart disease federated learning server."""
    # Create strategy
    strategy = HeartDiseaseServer(
        min_available_clients=3,
        min_fit_clients=3,
        min_evaluate_clients=3,
        on_fit_config_fn=lambda _: {"epochs": 5},
    )

    # Start server
    logger.info("Starting Heart Disease Server on port 8080...")
    fl.server.start_server(
        server_address="0.0.0.0:8080",
        config=fl.server.ServerConfig(num_rounds=3),
        strategy=strategy
    )

def start_diabetes_server():
    """Start the diabetes federated learning server."""
    # Create strategy
    strategy = DiabetesServer(
        min_available_clients=3,
        min_fit_clients=3,
        min_evaluate_clients=3,
        on_fit_config_fn=lambda _: {"epochs": 5},
    )

    # Start server
    logger.info("Starting Diabetes Server on port 8081...")
    fl.server.start_server(
        server_address="0.0.0.0:8081",
        config=fl.server.ServerConfig(num_rounds=3),
        strategy=strategy
    )

def main():
    parser = argparse.ArgumentParser(description="Start FL servers")
    parser.add_argument("--disease", type=str, default="both",
                        choices=["heart", "diabetes", "both"],
                        help="Which disease model to run (heart, diabetes, or both)")
    args = parser.parse_args()

    if args.disease == "heart":
        start_heart_disease_server()
    elif args.disease == "diabetes":
        start_diabetes_server()
    else:  # both
        # Start both servers in separate threads
        heart_thread = threading.Thread(target=start_heart_disease_server)
        diabetes_thread = threading.Thread(target=start_diabetes_server)

        heart_thread.start()
        diabetes_thread.start()

        # Wait for both threads to complete
        heart_thread.join()
        diabetes_thread.join()

if __name__ == "__main__":
    main()