# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) before installing dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build




# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Set environment variable
ENV NODE_ENV=production

# Copy only the necessary build artifacts from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Optionally, copy only the necessary package files if your application doesn't require the full node_modules
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
