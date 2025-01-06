from web3 import Web3
import json
import os
from solcx import compile_source, install_solc

def deploy_contract():
    # Install specific version of solc
    install_solc('0.8.0')
    
    # Connect to Ganache
    w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))
    
    # Set default account
    w3.eth.default_account = w3.eth.accounts[0]
    
    # Read contract file
    with open('contracts/CharityCampaign.sol', 'r') as file:
        contract_source = file.read()
    
    # Compile contract
    compiled_sol = compile_source(
        contract_source,
        output_values=['abi', 'bin'],
        solc_version='0.8.0'
    )
    contract_id, contract_interface = compiled_sol.popitem()
    
    # Deploy contract
    Contract = w3.eth.contract(
        abi=contract_interface['abi'],
        bytecode=contract_interface['bin']
    )
    
    # Submit transaction that deploys the contract
    tx_hash = Contract.constructor().transact()
    
    # Wait for the transaction to be mined
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Get contract address
    contract_address = tx_receipt.contractAddress
    
    # Save contract address
    with open('../.env', 'r') as f:
        env_content = f.read()
    
    # Update CONTRACT_ADDRESS in .env
    if 'CONTRACT_ADDRESS=' in env_content:
        new_content = []
        for line in env_content.split('\n'):
            if line.startswith('CONTRACT_ADDRESS='):
                new_content.append(f'CONTRACT_ADDRESS={contract_address}')
            else:
                new_content.append(line)
        env_content = '\n'.join(new_content)
    else:
        env_content += f'\nCONTRACT_ADDRESS={contract_address}'
    
    with open('../.env', 'w') as f:
        f.write(env_content)
    
    # Save contract ABI
    with open('../backend/contract_abi.json', 'w') as f:
        json.dump(contract_interface['abi'], f)
    
    print(f'Contract deployed at: {contract_address}')
    return contract_address

if __name__ == '__main__':
    deploy_contract()
