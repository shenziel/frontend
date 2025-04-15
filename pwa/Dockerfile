# Use the official Node.js image as the base image for building the app
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install && npm install --save-dev @babel/plugin-proposal-private-property-in-object && npm run build

# Copy the rest of the application code to the container
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:alpine

# Copy the build output to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Run the web server
CMD ["nginx", "-g", "daemon off;"]
