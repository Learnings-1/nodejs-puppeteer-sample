# Base image
FROM node:slim

# Set environment variable to skip Chromium download by Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install required dependencies for Google Chrome and Puppeteer
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy the current directory to /app in the Docker container
WORKDIR /app
COPY . /app

# Ensure Puppeteer is installed and ready
RUN npx puppeteer install

# Install any other project dependencies
RUN npm install

# Set Chrome's path explicitly if needed
# ENV CHROME_PATH=/app/chrome

# Launch Puppeteer with the Chrome executable path
CMD ["node", "index.js"]
