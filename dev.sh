#!/bin/bash

# Stop all running containers
docker compose down

# Remove existing volumes to start fresh
docker compose down -v

# Build the services with development target
docker compose build --no-cache

# Generate Prisma client in the projects service
docker compose run --rm projects npx prisma generate

# Start all services
docker compose up
