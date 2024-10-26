#!/bin/sh

# Regenerate Prisma client
npx prisma generate

# Start the application
npm run start
