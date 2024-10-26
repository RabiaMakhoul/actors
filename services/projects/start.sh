#!/bin/sh

# Wait for database to be ready
echo "Waiting for database..."
while ! nc -z database 5432; do
  sleep 1
done
echo "Database is ready!"

# Setup database
npm run db:init

# Start the application
npm start
