// Image processing utilities for badge scanning

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Enhance image quality: gentle contrast and sharpness improvements
 */
function enhanceImage(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate histogram for auto-levels
  const histogram: number[] = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    histogram[Math.floor(avg)]++;
  }

  // Find 2nd and 98th percentile for gentler auto-levels
  const totalPixels = canvas.width * canvas.height;
  let sum = 0;
  let min = 0, max = 255;

  for (let i = 0; i < 256; i++) {
    sum += histogram[i];
    if (sum > totalPixels * 0.02 && min === 0) min = i;
    if (sum > totalPixels * 0.98 && max === 255) {
      max = i;
      break;
    }
  }

  // Apply gentle contrast stretching
  const range = max - min;
  if (range > 0) {
    for (let i = 0; i < data.length; i += 4) {
      // Gentle contrast stretch with no brightness boost
      const r = ((data[i] - min) * 255) / range;
      const g = ((data[i + 1] - min) * 255) / range;
      const b = ((data[i + 2] - min) * 255) / range;

      // Clamp values without additional processing
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }
  }

  // Apply gentle sharpening filter (reduced strength)
  const sharpenKernel = [
    0, -0.5, 0,
    -0.5, 3, -0.5,
    0, -0.5, 0
  ];

  const tempData = new Uint8ClampedArray(data);
  for (let y = 1; y < canvas.height - 1; y++) {
    for (let x = 1; x < canvas.width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * canvas.width + (x + kx)) * 4 + c;
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            sum += tempData[idx] * sharpenKernel[kernelIdx];
          }
        }
        const idx = (y * canvas.width + x) * 4 + c;
        data[idx] = Math.max(0, Math.min(255, sum));
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Crop image to the guide box area and enhance quality
 */
export function cropAndEnhanceImage(
  imageData: string,
  cropArea: CropArea
): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log('cropAndEnhanceImage called with cropArea:', cropArea);

    const img = new Image();
    img.onload = () => {
      try {
        console.log('Image loaded, dimensions:', img.width, 'x', img.height);

        // Target dimensions to match digital badge INCLUDING lanyard
        // Digital badge total: 483w x 1418h (736px lanyard + 682px badge body)
        // We want the scanned badge to be proportionally sized to fill similar space
        // Scale the cropped badge up to approximately match the badge body height
        const DIGITAL_BADGE_WIDTH = 483;
        const DIGITAL_TOTAL_HEIGHT = 1418; // includes lanyard

        // Scale the scanned badge to match the digital badge's overall presence
        // Since we don't have a lanyard, scale it larger to compensate
        const scaleFactor = 2.5; // Makes the badge ~1200px tall, closer to digital's 1418px
        const finalWidth = Math.round(cropArea.width * scaleFactor);
        const finalHeight = Math.round(cropArea.height * scaleFactor);

        // Create canvas for cropped and scaled area
        const canvas = document.createElement('canvas');
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Enable image smoothing for better quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        console.log('Drawing cropped and scaled image...');
        // Draw the cropped section, scaled up
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          finalWidth,
          finalHeight
        );

        console.log('Enhancing image...');
        // Enhance image quality
        const enhancedCanvas = enhanceImage(canvas);

        console.log('Converting to data URL...');
        // Convert to PNG for lossless quality
        const result = enhancedCanvas.toDataURL('image/png');
        console.log('Processing complete, final size:', finalWidth, 'x', finalHeight);
        resolve(result);
      } catch (error) {
        console.error('Error during image processing:', error);
        reject(error);
      }
    };
    img.onerror = (error) => {
      console.error('Image load error:', error);
      reject(error);
    };
    img.src = imageData;
  });
}
