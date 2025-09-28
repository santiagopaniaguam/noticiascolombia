# Colombian News Scraper

A web application that scrapes headlines from popular Colombian newspapers and displays them grouped with word frequency analysis.

## Features

- 📰 Scrapes headlines from 15 major Colombian newspapers
- 🏷️ Groups headlines by source (numbered 1, 2, 3, etc.)
- 📊 Shows the 3 most used words and phrases per group
- 🔄 Auto-refresh every 30 minutes with manual refresh option
- 📱 Responsive design for mobile and desktop
- ⚡ Caching system for better performance


## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:44444`

## VPS Deployment

For deploying to a VPS or production server:

### System Requirements
- **RAM**: Minimum 512MB, recommended 1GB
- **Concurrent Users**: ~200-500 users with 1GB RAM
- **Storage**: ~50MB for app + dependencies

### VPS Dependencies

#### System Packages
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Essential packages
sudo apt install -y curl wget git unzip
```

#### Node.js Installation
```bash
# Install Node.js (v18+ recommended)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### Puppeteer Dependencies
```bash
# Required for web scraping with Puppeteer
sudo apt install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils
```

#### Quick Setup Script
```bash
#!/bin/bash
# Save as setup.sh and run: chmod +x setup.sh && ./setup.sh

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Puppeteer dependencies
sudo apt install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# Install PM2
sudo npm install -g pm2

echo "Setup complete! Upload your app and run 'npm install'"
```

### Prerequisites
1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

### Deployment Steps
1. Clone the repository to your VPS
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start with PM2 (recommended for production):
   ```bash
   npm run pm2:start
   ```

### PM2 Management Commands
- Start: `npm run pm2:start`
- Stop: `npm run pm2:stop`
- Restart: `npm run pm2:restart`
- Delete: `npm run pm2:delete`
- View logs: `pm2 logs colombian-news-scraper`
- Monitor: `pm2 monit`

### Environment Variables
- `PORT`: Server port (default: 44444)
- `NODE_ENV`: Set to 'production' for production mode

### Reverse Proxy Setup (Nginx)
Create a nginx configuration to proxy requests to your app:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:44444;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Production Considerations
- The app automatically restarts on crashes via PM2
- Logs are stored in the `logs/` directory
- Configure firewall to allow your chosen port
- Consider setting up SSL/HTTPS with Let's Encrypt

## API Endpoints

- `GET /` - Main webpage
- `GET /api/news` - Get scraped news data (cached for 30 minutes)
- `GET /api/news/refresh` - Force refresh news data
- `GET /api/health` - Server health status

## Features Explained

### Grouping
Headlines are grouped by newspaper source and displayed as "Grupo 1", "Grupo 2", etc. (newspaper names are not shown as requested).

### Text Analysis
For each group, the app analyzes the headlines to find:
- **Most used words**: Single words that appear frequently (excluding common Spanish stop words)
- **Most used phrases**: 2-3 word combinations that appear multiple times

### Caching
News data is cached for 30 minutes to avoid overloading newspaper websites and improve response times.

## Technical Details

- **Backend**: Node.js with Express
- **Web Scraping**: Puppeteer (with Cheerio fallback)
- **Text Analysis**: Custom Spanish language processing
- **Frontend**: Vanilla JavaScript with modern CSS
- **Responsive**: Works on desktop and mobile devices

## Troubleshooting

If you encounter issues:

1. **No headlines appear**: Some newspapers may block scraping. The app includes fallback methods and error handling.

2. **Puppeteer issues**: Make sure you have the required dependencies for running Chrome in headless mode.

3. **Network errors**: Check your internet connection and try the manual refresh button.

