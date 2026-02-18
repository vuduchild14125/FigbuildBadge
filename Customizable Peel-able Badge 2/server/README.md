# FigBuild Badge Vision API Server

Backend server for AI-powered badge analysis using Claude Vision API.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Add your Anthropic API key:**
   Edit `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...your-key-here
   ```

   Get your API key from: https://console.anthropic.com/

4. **Start the server:**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3001`

## Testing

Test the health endpoint:
```bash
curl http://localhost:3001/api/health
```

## Usage

The frontend automatically connects to this server when you scan a badge.

Make sure both servers are running:
- Frontend: `npm run dev` (port 5173)
- Backend: `npm start` (port 3001)
