#Use an official node.js runtime as a parent image
FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app


# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Add these 2 lines to make the Prisma Client work
COPY prisma ./prisma
RUN npx prisma generate 

# Expose the port that the app runs on
EXPOSE 5003

# Define the command to run the app
CMD ["node","./src/server.js"]