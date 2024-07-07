# Use an official Node.js runtime as a parent image
# Use Node.js 14 as the base image
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

# Copy the docker-entrypoint.sh script
#COPY docker-entrypoint.sh usr/src/app

# Make the entrypoint script executable
RUN chmod +x ./docker-entrypoint.sh

# Expose the port your app runs on
EXPOSE 3000

# Set the entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Set the default command
CMD ["node", "init-db.js"]