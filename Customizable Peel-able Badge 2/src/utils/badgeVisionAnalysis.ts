import type { BorderStyle, CordColor, Background, PlacedSticker, DrawPath } from '../types';

interface BadgeAnalysis {
  cordColor: CordColor;
  background: Background;
  borderStyle: BorderStyle;
  stickers: PlacedSticker[];
  drawings: DrawPath[];
}

/**
 * Analyzes a badge photo using AI vision to detect and reconstruct badge elements
 */
export async function analyzeBadge(imageData: string): Promise<BadgeAnalysis> {
  console.log('Starting badge vision analysis with Claude API...');

  try {
    // Call our backend API that proxies to Claude Vision API
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const response = await fetch(`${API_URL}/api/analyze-badge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to analyze badge');
    }

    const { analysis } = await response.json();
    console.log('Raw AI analysis:', analysis);

    // Convert AI response to our badge structure
    const badgeAnalysis: BadgeAnalysis = {
      cordColor: analysis.cordColor as CordColor,
      background: analysis.background as Background,
      borderStyle: analysis.borderStyle as BorderStyle,
      stickers: convertStickers(analysis.stickers || []),
      drawings: [], // Drawings can't be detected from photos
    };

    console.log('Converted badge analysis:', badgeAnalysis);
    return badgeAnalysis;

  } catch (error) {
    console.error('Error analyzing badge:', error);
    throw new Error(`Failed to analyze badge: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert AI-detected stickers to our sticker format
 */
function convertStickers(aiStickers: any[]): PlacedSticker[] {
  return aiStickers.map((sticker, index) => {
    const baseSticker: PlacedSticker = {
      id: `scanned-${index}`,
      type: getStickerType(sticker.stickerType),
      x: sticker.x,
      y: sticker.y,
      rotation: sticker.rotation,
    };

    // Add type-specific properties
    if (sticker.stickerType === 'pronoun' && sticker.pronounText) {
      baseSticker.pronounText = sticker.pronounText;
    } else if (sticker.stickerType === 'about' && sticker.aboutColor) {
      baseSticker.aboutColor = sticker.aboutColor;
    } else if (sticker.stickerType === 'goal' && sticker.goalColor) {
      baseSticker.goalColor = sticker.goalColor;
    } else if (sticker.stickerType === 'role') {
      baseSticker.roleColor = sticker.roleColor;
      baseSticker.roleLabel = sticker.roleText;
    }

    return baseSticker;
  });
}

/**
 * Map AI sticker type to our internal type number
 */
function getStickerType(aiType: string): number {
  const typeMap: Record<string, number> = {
    'year': 6,
    'pronoun': 7,
    'about': 8,
    'goal': 9,
    'time': 10,
    'role': 11,
    'fun': 12,
  };
  return typeMap[aiType] || 6;
}

/**
 * Helper to identify lanyard color from the image
 */
function detectLanyardColor(description: string): CordColor {
  const lower = description.toLowerCase();
  if (lower.includes('periwinkle') || lower.includes('purple') || lower.includes('lavender')) {
    return 'periwinkle';
  }
  if (lower.includes('blue')) {
    return 'blue';
  }
  return 'black';
}

/**
 * Helper to identify background pattern
 */
function detectBackground(description: string): Background {
  const lower = description.toLowerCase();
  if (lower.includes('swag') || lower.includes('checkered') || lower.includes('checkerboard')) {
    return 'swag';
  }
  if (lower.includes('creative') || lower.includes('stripes') || lower.includes('striped')) {
    return 'creative';
  }
  if (lower.includes('playful') || lower.includes('dots') || lower.includes('polka')) {
    return 'playful';
  }
  return 'swag';
}

/**
 * Helper to identify border style
 */
function detectBorderStyle(description: string): BorderStyle {
  const lower = description.toLowerCase();
  if (lower.includes('dashed') || lower.includes('dash')) {
    return 'dashed';
  }
  if (lower.includes('wiggly') || lower.includes('wavy') || lower.includes('wave')) {
    return 'wiggly';
  }
  return 'none';
}
