# Use official lightweight Nginx image
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your website files into the nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css  /usr/share/nginx/html/
COPY script.js  /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx (default command, kept explicit for clarity)
CMD ["nginx", "-g", "daemon off;"]