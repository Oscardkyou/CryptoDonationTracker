# Charity Campaign Platform

A decentralized charity platform built with Ethereum smart contracts, Flask, and Next.js.

## Features

- Create and manage charity campaigns
- Make donations using cryptocurrency
- Track donations and campaign progress
- Achievement system for donors
- Organization verification system
- Interactive dashboard with real-time statistics
- Transaction history and analytics

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)
- MetaMask browser extension

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd solidity-project
```

2. Create a .env file:
```bash
cp .env.example .env
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Ganache (local blockchain): http://localhost:8545

## Local Development

### Backend (Flask)

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run tests:
```bash
pytest tests/
```

4. Start the Flask server:
```bash
flask run
```

### Frontend (Next.js)

1. Navigate to the frontend directory:
```bash
cd charity-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Testing

- Run backend tests: `pytest tests/`
- Run frontend tests: `cd charity-tracker && npm test`

## Deployment

1. Build the Docker images:
```bash
docker-compose -f docker-compose.prod.yml build
```

2. Deploy to your server:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation

API documentation is available at `/api/docs` when running the server.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
7ad29506c41904dbb7bd78f6c362d5f33e2cded8184a6ada700e7bb537c48b70