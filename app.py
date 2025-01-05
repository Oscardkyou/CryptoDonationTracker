from flask import Flask, render_template, request, jsonify
from web3 import Web3
from dotenv import load_dotenv
import os
import json

app = Flask(__name__)

# Load environment variables
load_dotenv()

# Connect to Base network (for development, we'll use local network first)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# Load contract ABI and address (will be populated after contract deployment)
with open('build/contracts/CharityCampaign.json') as f:
    contract_json = json.load(f)
CONTRACT_ABI = contract_json['abi']
CONTRACT_ADDRESS = os.getenv('CONTRACT_ADDRESS')

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create_campaign', methods=['GET', 'POST'])
def create_campaign():
    if request.method == 'POST':
        description = request.form['description']
        goal_amount = int(request.form['goal_amount'])
        receiver = request.form['receiver']
        
        try:
            tx_hash = contract.functions.createCampaign(
                description,
                goal_amount,
                receiver
            ).transact({'from': w3.eth.accounts[0]})
            
            receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
            return jsonify({'success': True, 'transaction_hash': receipt.transactionHash.hex()})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})
    
    return render_template('create_campaign.html')

@app.route('/donate/<int:campaign_id>', methods=['POST'])
def donate(campaign_id):
    amount = int(request.form['amount'])
    try:
        tx_hash = contract.functions.donate(campaign_id).transact({
            'from': w3.eth.accounts[0],
            'value': amount
        })
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return jsonify({'success': True, 'transaction_hash': receipt.transactionHash.hex()})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/campaign/<int:campaign_id>')
def campaign_details(campaign_id):
    try:
        details = contract.functions.getCampaignDetails(campaign_id).call()
        return render_template('campaign_details.html', campaign=details)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
