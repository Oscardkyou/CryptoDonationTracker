#!/bin/sh

# Wait for Ganache to be ready
echo "Waiting for Ganache..."
while ! nc -z ganache 8545; do
  sleep 1
done
echo "Ganache is ready!"

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn --bind 0.0.0.0:5000 --workers 4 --threads 4 app:app
