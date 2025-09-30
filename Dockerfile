# ---- Stage 1: Build the React App ----
# Use an official Node.js runtime as a parent image
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Build the app for production
RUN npm run build


# ---- Stage 2: Serve with NGINX ----
# Use a lightweight NGINX image
FROM nginx:1.25-alpine

# Copy the built files from the 'builder' stage
# The 'npm run build' command creates a 'dist' folder
COPY --from=builder /app/dist /usr/share/nginx/html

# When the container starts, nginx is started automatically by the base image.
# The files in /usr/share/nginx/html will be served.
EXPOSE 80