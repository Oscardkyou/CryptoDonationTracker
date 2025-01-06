#!/bin/sh

# Wait for backend to be ready
echo "Waiting for backend..."
while ! nc -z backend 5000; do
  sleep 1
done
echo "Backend is ready!"

# Start Next.js
echo "Starting Next.js..."
exec npm run dev -- -p 3000 --hostname 0.0.0.0
