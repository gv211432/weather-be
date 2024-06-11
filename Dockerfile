# Stage 1: Build
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install wait-for-it
RUN apt-get update && apt-get install -y wait-for-it

# Copy source files
COPY . .

# Install app dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000