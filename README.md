Here's a comprehensive README.md for your Vietlott Bingo 18 Results Crawler project:

```markdown
# Vietlott Bingo 18 Results Crawler

![App Screenshot](/screenshot.png) <!-- Add screenshot if available -->

A React application that fetches and displays Vietlott Bingo 18 lottery results with both manual and automatic crawling capabilities.

## Features

✅ **Working Features**
- Manual result fetching by ID
- Automatic sequential result crawling
- Real-time result display
- Responsive UI with Tailwind CSS
- Supabase backend integration

⚠️ **Untested Features**
- Notification system for specific conditions (16 consecutive non-12 results)

## Prerequisites

- Node.js v16+
- npm v8+
- Supabase account
- Vietlott website access

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vietlott-crawler.git
   cd vietlott-crawler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_PROXY_URL=your_proxy_internet
   REACT_APP_RESULT_LIMIT=50
   REACT_APP_CRAWL_INTERVAL=60000 // 60 seconds
   ```

## Usage

### Development
```bash
npm start
```
Runs the app in development mode on `http://localhost:3000`

### Production Build
```bash
npm run build
```

### Key Functionality

1. **Manual Crawl**
   - Enter a 7-digit Vietlott ID
   - Click "Manual Crawl" to fetch specific results

2. **Auto Crawl**
   - Click "Start Auto Crawl" to begin sequential fetching
   - System automatically increments from last known ID
   - Click "Stop Auto Crawl" to halt the process

3. **Result Display**
   - Shows latest 50 results by default
   - Displays draw date, numbers, and crawl status

## Project Structure

```
src/
├── components/       # React components
├── contexts/         # Application context
├── hooks/            # Custom hooks
├── services/         # Business logic
├── utils/            # Helper functions
└── App.js            # Main application
```

## Known Issues

- CORS restrictions when fetching directly from Vietlott (proxy recommended)
- Untested notification feature for anomaly detection
- Limited error recovery for network failures

## Future Improvements

- Implement server-side proxy for CORS
- Add user authentication
- Enhance notification system
- Implement result analysis tools

## Troubleshooting

**Auto-crawl won't stop:**
- Ensure you're using the latest version of `CrawlerContext.jsx`
- Verify the stop button handler is properly connected

**Data not displaying:**
- Check Supabase table structure matches expectations
- Verify network requests in browser dev tools

## License

[MIT](LICENSE)

---

**Note:** This application is for educational purposes only. Please comply with Vietlott's terms of service when using this software.
```