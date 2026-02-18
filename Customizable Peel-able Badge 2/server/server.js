import Anthropic from '@anthropic-ai/sdk';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Vision analysis endpoint
app.post('/api/analyze-badge', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    console.log('Analyzing badge with Claude Vision API...');

    // Remove the data URL prefix if present
    const base64Image = image.includes(',') ? image.split(',')[1] : image;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: `Analyze this FigBuild 2026 badge photo and identify all elements precisely.

**IMPORTANT**: Return ONLY valid JSON, no markdown formatting or code blocks.

Identify:

1. **Lanyard Color** (the cord/strap at the top):
   - "black" - if black or dark colored
   - "periwinkle" - if purple/lavender colored
   - "blue" - if blue colored

2. **Background Pattern** (the pattern on the badge):
   - "swag" - if it has a checkered/checkerboard pattern (alternating colored squares)
   - "creative" - if it has horizontal stripes
   - "playful" - if it has dots/circles

3. **Border Style**:
   - "none" - no border
   - "dashed" - dashed line border
   - "wiggly" - wavy/wiggly border

4. **Stickers** - Identify each visible sticker:
   - Year stickers: Small blob shapes with text like "1ST YEAR", "2ND YEAR", "3RD YEAR", "4TH YEAR", "5+ YEARS"
   - Pronoun stickers: Oval shapes with pronouns like "she/her", "he/him", "they/them"
   - About stickers: Colored oval/blob shapes (no text, just colored blobs)
   - Goal stickers: Rectangular shapes with text like "BUILD", "LEARN", "NETWORK", "SHARE"
   - Time stickers: Showing "Time to Build" or time-related text
   - Role stickers: Showing job titles/roles
   - Fun stickers: Decorative stickers, emojis, or custom designs

For EACH sticker provide:
- x, y: Position in pixels (0-483 width, 0-682 height, where 0,0 is top-left of badge, excluding lanyard)
- rotation: Angle in degrees (-180 to 180)
- For year stickers: Include the year text (e.g., "1ST YEAR")
- For pronoun stickers: Include the pronoun text (e.g., "she/her")
- For about stickers: Include the color (hex code)
- For goal stickers: Include the text and color
- For role stickers: Include the role text and color
- For fun stickers: Include a description

Return ONLY this JSON structure with no markdown formatting:
{
  "cordColor": "black|periwinkle|blue",
  "background": "swag|creative|playful",
  "borderStyle": "none|dashed|wiggly",
  "stickers": [
    {
      "stickerType": "year|pronoun|about|goal|time|role|fun",
      "x": number,
      "y": number,
      "rotation": number,
      "yearText": "optional for year stickers",
      "pronounText": "optional for pronoun stickers",
      "aboutColor": "optional hex color for about stickers",
      "goalText": "optional for goal stickers",
      "goalColor": "optional hex color for goal stickers",
      "roleText": "optional for role stickers",
      "roleColor": "optional hex color for role stickers",
      "funDescription": "optional for fun stickers"
    }
  ]
}`,
            },
          ],
        },
      ],
    });

    // Extract the text content
    const responseText = message.content[0].text;
    console.log('Claude response:', responseText);

    // Parse the JSON response
    let analysis;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) ||
                       responseText.match(/(\{[\s\S]*\})/);

      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[1]);
      } else {
        analysis = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', parseError);
      console.error('Response text:', responseText);
      return res.status(500).json({
        error: 'Failed to parse AI response',
        details: responseText
      });
    }

    console.log('Parsed analysis:', analysis);

    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing badge:', error);
    res.status(500).json({
      error: 'Failed to analyze badge',
      message: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🎨 FigBuild Badge Vision API',
    version: '1.0.0',
    endpoints: {
      analyze: 'POST /api/analyze-badge',
      health: 'GET /api/health'
    },
    ready: !!process.env.ANTHROPIC_API_KEY
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Badge vision API server is running' });
});

app.listen(port, () => {
  console.log(`🚀 Badge Vision API server running on http://localhost:${port}`);
  console.log(`📸 Ready to analyze badges!`);
});
