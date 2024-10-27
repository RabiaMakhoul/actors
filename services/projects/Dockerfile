# Use an official Node runtime as the base image
FROM node:22-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Development stage
FROM node:22 AS development
WORKDIR /usr/src/app

# Install network debugging tools and dependencies
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    postgresql-client \
    iputils-ping \
    && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

EXPOSE 3000
EXPOSE 4000

CMD ["npm", "run", "dev:docker"]

# Production stage
FROM base as production
RUN npm install --production
RUN apk add --no-cache netcat-openbsd

EXPOSE 4000

# Create a startup script that ensures Prisma is ready
COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]
