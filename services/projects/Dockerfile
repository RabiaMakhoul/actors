# Use an official Node runtime as the base image
FROM node:20-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Build stage
FROM base as builder
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate

# Development stage
FROM builder as development
CMD ["npm", "run", "dev:docker"]

# Production stage
FROM builder as production
RUN npm install --production
RUN apk add --no-cache netcat-openbsd

EXPOSE 4000

# Create a startup script that ensures Prisma is ready
COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]
