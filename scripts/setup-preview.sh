#!/bin/bash

# Create the preview template directory
mkdir -p services/preview-template

# Navigate to the directory
cd services/preview-template

# Create a new Next.js app non-interactively
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git \
  --js=false \
  --use-yarn=false \
  --use-pnpm=false \
  --turbo=false \
  --experimental-app=false \
  --import-alias="@/*" \
  --no-tailwind=false \
  --yes

# Update package.json with specific versions
cat > package.json << EOF
{
  "name": "preview-template",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "14.0.4"
  }
}
EOF

# Create Dockerfile
cat > Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
EOF

# Create a simple .dockerignore
cat > .dockerignore << EOF
node_modules
.next
.git
EOF

# Install dependencies
npm install

# Go back to root
cd ../..

# Create preview manager if it doesn't exist
mkdir -p services/preview-manager/src

# Create preview manager package.json if it doesn't exist
cat > services/preview-manager/package.json << EOF
{
  "name": "preview-manager",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dockerode": "^4.0.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/dockerode": "^3.3.23",
    "@types/uuid": "^9.0.7",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3",
    "nodemon": "^3.0.2"
  }
}
EOF

# Create preview manager Dockerfile
cat > services/preview-manager/Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
EOF

# Create preview manager tsconfig.json
cat > services/preview-manager/tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib": ["es2017", "dom"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOF

# Install preview manager dependencies
cd services/preview-manager
npm install
cd ../..

echo "Preview template and manager setup complete!"
