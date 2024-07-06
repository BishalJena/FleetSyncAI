# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy the SQL script
COPY init.sql .

# Expose the port your app runs on
EXPOSE 3000

# Command to initialize the database and start the application
CMD ["sh", "-c", "node init-db.js && npm start"]