"""Flask application for charity campaign management."""

import json
import os
import logging
from typing import Optional, Dict, Any

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from web3 import Web3
from web3.contract import Contract
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Connect to local Ganache
w3 = Web3(Web3.HTTPProvider(os.getenv("WEB3_PROVIDER", "http://ganache:8545")))

# Contract setup
contract_address: Optional[str] = None
contract_abi: Optional[list] = None
contract: Optional[Contract] = None

def load_contract() -> None:
    """Load contract address and ABI."""
    global contract_address, contract_abi, contract
    try:
        contract_address = os.getenv("CONTRACT_ADDRESS")
        if not contract_address:
            raise ValueError("CONTRACT_ADDRESS not set in environment")

        # Try to load ABI from file
        abi_path = os.path.join(os.path.dirname(__file__), "contract_abi.json")
        logging.debug(f"Loading contract ABI from {abi_path}")
        with open(abi_path, "r", encoding="utf-8") as f:
            contract_abi = json.load(f)

        # Create contract instance
        if w3.is_connected() and contract_address and contract_abi:
            logging.debug("Web3 is connected. Creating contract instance...")
            contract = w3.eth.contract(address=contract_address, abi=contract_abi)
            logging.debug("Contract instance created.")
        else:
            logging.error("Failed to connect to Web3 or load contract.")
    except Exception as e:
        logging.error(f"Error loading contract: {e}")

# Load contract on startup
logging.debug("Starting contract loading...")
load_contract()
logging.debug("Contract loading completed.")

@app.route("/")
def index():
    """Render the main page."""
    return render_template("index.html")

@app.route("/api/campaigns", methods=["GET"])
def get_campaigns():
    """Get all campaigns."""
    try:
        if not contract:
            return jsonify({"error": "Contract not yet deployed"}), 500

        campaign_count = contract.functions.campaignCount().call()
        campaigns = []
        for i in range(campaign_count):
            campaign = contract.functions.campaigns(i).call()
            campaigns.append({
                "id": i,
                "description": campaign[0],
                "goalAmount": campaign[1],
                "currentAmount": campaign[2],
                "receiver": campaign[3],
                "isCompleted": campaign[4]
            })
        return jsonify({"campaigns": campaigns})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/campaigns", methods=["POST"])
def create_campaign():
    """Create a new campaign."""
    try:
        if not contract:
            return jsonify({"error": "Contract not yet deployed"}), 500

        data = request.get_json()
        description = data.get("description")
        goal_amount = int(data.get("goalAmount"))
        receiver = data.get("receiver")

        if not all([description, goal_amount, receiver]):
            return jsonify({"error": "Missing required fields"}), 400

        # Create campaign
        tx_hash = contract.functions.createCampaign(
            description,
            goal_amount,
            receiver
        ).transact({"from": w3.eth.accounts[0]})
        
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return jsonify({
            "success": True,
            "transactionHash": receipt["transactionHash"].hex()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/campaigns/<int:campaign_id>")
def campaign_details(campaign_id: int):
    """Get details for a specific campaign."""
    try:
        if not contract:
            return jsonify({"error": "Contract not yet deployed"}), 500

        campaign = contract.functions.campaigns(campaign_id).call()
        return jsonify({
            "id": campaign_id,
            "description": campaign[0],
            "goalAmount": campaign[1],
            "currentAmount": campaign[2],
            "receiver": campaign[3],
            "isCompleted": campaign[4]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/campaigns/<int:campaign_id>/donate", methods=["POST"])
def donate(campaign_id: int):
    """Donate to a specific campaign."""
    try:
        if not contract:
            return jsonify({"error": "Contract not yet deployed"}), 500

        data = request.get_json()
        amount = int(data.get("amount"))
        from_address = data.get("from")

        if not amount:
            return jsonify({"error": "Amount is required"}), 400

        tx_hash = contract.functions.donate(campaign_id).transact({
            "from": from_address or w3.eth.accounts[0],
            "value": amount
        })
        
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return jsonify({
            "success": True,
            "transactionHash": receipt["transactionHash"].hex()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
