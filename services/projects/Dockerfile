# Use an official Node runtime as the base image
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Install netcat for health check
RUN apk add --no-cache netcat-openbsd

# Copy built assets and necessary files from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/api ./api
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 4000

# Create a startup script
COPY --from=builder /usr/src/app/start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]
