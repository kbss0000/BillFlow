# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build for production
RUN npm run build

# Production stage - serve with simple http-server
FROM node:20-alpine
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=build /app/dist ./dist

# Railway will set PORT env var
ENV PORT=3000

# Serve the app
CMD ["sh", "-c", "serve -s dist -l $PORT"]
