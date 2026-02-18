# AI Vision Badge Reconstruction - Integration Guide

## Overview

The app now supports **AI-powered badge reconstruction** from scanned photos. Instead of just cropping the photo, the system:

1. Captures a photo of the physical badge
2. Analyzes it using AI vision to detect all elements
3. Reconstructs the badge digitally using the app's components
4. Renders perfect vector graphics instead of a photo

## Current Status

✅ **Frontend Implementation Complete**
- Camera capture flow
- Vision analysis structure
- Badge reconstruction logic
- Complete screen integration

⚠️ **Backend Integration Needed**
- The actual AI vision API call needs to be implemented
- Currently using sample/mock data

## How to Integrate AI Vision API

### Option 1: Add a Backend API Endpoint (Recommended)

1. **Create a backend endpoint** (e.g., `/api/analyze-badge`)
   ```typescript
   // Example Node.js/Express endpoint
   app.post('/api/analyze-badge', async (req, res) => {
     const { image, prompt } = req.body;

     // Call Claude's Vision API
     const response = await anthropic.messages.create({
       model: 'claude-3-5-sonnet-20241022',
       max_tokens: 1024,
       messages: [{
         role: 'user',
         content: [
           {
             type: 'image',
             source: {
               type: 'base64',
               media_type: 'image/jpeg',
               data: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
             }
           },
           {
             type: 'text',
             text: prompt
           }
         ]
       }]
     });

     res.json({ analysis: response.content[0].text });
   });
   ```

2. **Update `badgeVisionAnalysis.ts`**
   ```typescript
   const response = await fetch('/api/analyze-badge', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       image: imageData,
       prompt: analysisPrompt
     })
   });

   const { analysis } = await response.json();
   const parsed = JSON.parse(analysis);
   return convertToB adgeAnalysis(parsed);
   ```

### Option 2: Use Claude Desktop API (Development Only)

For development/testing, you can use Claude Desktop's MCP server if available.

### Response Format

The AI should return JSON matching this structure:

```json
{
  "cordColor": "black|periwinkle|blue",
  "background": "swag|creative|playful",
  "borderStyle": "none|dashed|wiggly",
  "stickers": [
    {
      "type": "year|pronoun|about|goal|time|role|fun",
      "x": 100,
      "y": 150,
      "rotation": -15,
      "text": "1ST YEAR",
      "color": "#24cb71"
    }
  ]
}
```

## Sticker Type Mapping

The vision AI needs to map detected stickers to these types:

- **Type 6**: Year stickers (1ST YEAR, 2ND YEAR, etc.)
- **Type 7**: Pronoun stickers
- **Type 8**: About stickers (colored ovals)
- **Type 9**: Goal stickers (colored rectangles)
- **Type 10**: Time stickers
- **Type 11**: Role stickers
- **Type 12**: Fun/decorative stickers

## Testing

While developing the vision API:

1. The app currently returns **sample data** showing a periwinkle lanyard with swag background
2. Test with various badge photos to tune detection accuracy
3. Adjust the vision prompt in `badgeVisionAnalysis.ts` for better results

## Next Steps

1. [ ] Set up backend API endpoint
2. [ ] Integrate Anthropic API key securely
3. [ ] Test vision analysis with real badge photos
4. [ ] Tune the vision prompt for accuracy
5. [ ] Add error handling and retry logic
6. [ ] Consider adding manual correction UI if AI misses elements

## Benefits

✅ Perfect quality (vector graphics)
✅ Fully editable after scanning
✅ Consistent with digitally-created badges
✅ Professional downloadable assets
