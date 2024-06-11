# Stage 1: Build
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install app dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "run", "up"]