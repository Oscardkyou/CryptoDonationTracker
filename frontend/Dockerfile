# Use Node.js LTS
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && \
    npm install --legacy-peer-deps

# Copy project files
COPY . .

# Make entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose port
EXPOSE 3000

# Start the app
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "-p", "3000", "--hostname", "0.0.0.0"]
