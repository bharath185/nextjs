# Use the official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run dev

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]