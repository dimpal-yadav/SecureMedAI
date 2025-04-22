import flwr as fl
from client import HeartDiseaseClient
import argparse
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Start a Flower client")
    parser.add_argument("--client-id", type=int, required=True, help="Client ID")
    parser.add_argument("--server-address", type=str, default="127.0.0.1:8080", help="Server address")
    args = parser.parse_args()
    
    # Create and start client
    client = HeartDiseaseClient(args.client_id)
    fl.client.start_client(server_address=args.server_address, client=client)

if __name__ == "__main__":
    main()