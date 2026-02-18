# 🚀 AI Vision Badge Scanning - Quick Start

## What This Does

Scans physical FigBuild badges and **reconstructs them digitally** using Claude's vision AI for perfect quality!

## Setup (5 minutes)

### 1. Get Your API Key
- Go to https://console.anthropic.com/
- Sign in or create an account
- Generate an API key
- Copy the key (starts with `sk-ant-...`)

### 2. Configure the Server
```bash
cd server
```

Edit `server/.env` and add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3. Start the Backend Server
```bash
npm start
```

You should see:
```
🚀 Badge Vision API server running on http://localhost:3001
📸 Ready to analyze badges!
```

### 4. Start the Frontend (in a new terminal)
```bash
cd "Customizable Peel-able Badge 2"
npm run dev
```

## Usage

1. **Open the app** in your browser
2. **Click "I made a FigBuild Badge IRL"**
3. **Position your badge** in the detection square
4. **Watch real-time detection** - See lanyard color, background, stickers being detected!
5. **Tap capture** and **Use Photo**
6. **Wait for AI analysis** - Claude Vision analyzes your badge
7. **Get perfect quality** - Your badge is reconstructed as vector graphics!

## What Gets Detected

✅ Lanyard color (black, periwinkle, blue)
✅ Background pattern (swag, creative, playful)
✅ Border style (none, dashed, wiggly)
✅ All stickers with positions and rotations:
  - Year stickers (1ST YEAR, 2ND YEAR, etc.)
  - Pronoun stickers
  - About stickers (colored blobs)
  - Goal stickers (BUILD, LEARN, etc.)
  - Time stickers
  - Role stickers
  - Fun decorative stickers

## Troubleshooting

**Server won't start?**
- Make sure you're in the `server` directory
- Check that your API key is set in `.env`
- Verify port 3001 is not in use

**Frontend can't connect?**
- Make sure the server is running on port 3001
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

**Detection not working?**
- Ensure good lighting on your badge
- Center the badge in the detection square
- Try adjusting the angle for better visibility
- Check server logs for errors

## Cost

Claude Vision API pricing: ~$3 per 1000 images analyzed
For development/testing, you'll use very few API calls!
