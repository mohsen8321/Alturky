# ---- Stage 1: Build the React App ----
FROM node:20-alpine as builder

# Set build arguments and environment variables
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies with clean npm cache and only production deps
RUN npm ci --only=production && \
    npm cache clean --force

# Copy the rest of the application source code
COPY . .

# Build the app for production
RUN npm run build

# ---- Stage 2: Serve with NGINX ----
FROM nginx:1.25-alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create nginx user if it doesn't exist
RUN adduser -D -H -u 1001 -s /sbin/nologin nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]