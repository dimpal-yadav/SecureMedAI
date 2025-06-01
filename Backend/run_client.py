import flwr as fl
from heart_client import HeartDiseaseClient
from diabetes_client import DiabetesClient
import argparse
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Start a Flower client")
    parser.add_argument("--client-id", type=int, required=True, help="Client ID")
    parser.add_argument("--disease-type", type=str, choices=["heart", "diabetes"], required=True,
                        help="Type of disease to model (heart or diabetes)")
    parser.add_argument("--server-address", type=str, help="Server address")
    args = parser.parse_args()

    # Set default server address based on disease type if not provided
    if args.server_address is None:
        if args.disease_type == "heart":
            args.server_address = "127.0.0.1:8080"
        else:  # diabetes
            args.server_address = "127.0.0.1:8081"

    # Create and start client based on disease type
    if args.disease_type == "heart":
        logger.info(f"Starting Heart Disease Client {args.client_id}...")
        client = HeartDiseaseClient(args.client_id)
    else:  # diabetes
        logger.info(f"Starting Diabetes Client {args.client_id}...")
        client = DiabetesClient(args.client_id)

    # Start client
    fl.client.start_numpy_client(server_address=args.server_address, client=client)

if __name__ == "__main__":
    main()