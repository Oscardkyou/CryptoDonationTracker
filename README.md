# Charity Tracker dApp

A decentralized application for transparent charity donations built on the Base network (Layer 2 Ethereum).

## Features

- Create charity campaigns with description and goal amount
- Make donations to campaigns
- Track donation progress
- View campaign details and transaction history
- Automatic notifications for campaign milestones

## Technical Stack

- Smart Contract: Solidity
- Backend: Python Flask
- Frontend: HTML/CSS/JavaScript with Bootstrap
- Blockchain Interaction: Web3.py
- Network: Base (Layer 2 Ethereum)

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Deploy the smart contract:
- Install Truffle globally: `npm install -g truffle`
- Compile contracts: `truffle compile`
- Deploy to local network: `truffle migrate`
- For Base testnet deployment, update `truffle-config.js` with network details

3. Create a `.env` file with:
```
CONTRACT_ADDRESS=<deployed_contract_address>
WEB3_PROVIDER_URI=<your_web3_provider_uri>
```

4. Run the Flask application:
```bash
python app.py
```

## Usage

1. Visit `http://localhost:5000` in your browser
2. Connect your Web3 wallet (MetaMask recommended)
3. Create a campaign or donate to existing ones

## Smart Contract

The `CharityCampaign` contract includes:
- Campaign creation with goals and descriptions
- Donation functionality
- Campaign status tracking
- Event emission for important actions

## Security

- All transactions are recorded on the blockchain
- Smart contract includes basic security measures
- Frontend validates inputs before submission

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
