import pytest
from app import app
from web3 import Web3
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_dashboard_endpoint(client):
    response = client.get('/api/dashboard')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'campaign_count' in data
    assert 'total_donations' in data
    assert 'active_campaigns' in data

def test_transactions_endpoint(client):
    response = client.get('/api/transactions')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'transactions' in data

def test_organizations_endpoint(client):
    response = client.get('/api/organizations')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'organizations' in data

def test_achievements_endpoint(client):
    test_address = "0x0000000000000000000000000000000000000000"
    response = client.get(f'/api/achievements/{test_address}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'donation_count' in data
    assert 'total_donated' in data
    assert 'badges' in data

def test_feedback_endpoint(client):
    test_feedback = {
        "message": "Test feedback",
        "rating": 5
    }
    response = client.post('/api/feedback', 
                          json=test_feedback,
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] is True
