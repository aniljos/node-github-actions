# Use the official Node.js 14 image as a base image
FROM node:20

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the app source code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 9000

# Define the command to run the app
CMD ["node", "app.js"]
