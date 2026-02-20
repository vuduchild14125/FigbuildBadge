import { useRef, useState, useEffect } from 'react';
import { cropAndEnhanceImage } from '../utils/imageProcessing';

export function CameraScreen({ onCapture, onBack }: { onCapture: (imageData: string) => void; onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [detectionFeedback, setDetectionFeedback] = useState<{
    lanyardColor?: string;
    background?: string;
    stickersCount?: number;
  }>({});

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setError('Unable to access camera. Please check your permissions.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simulate real-time detection feedback with animations
  useEffect(() => {
    if (!stream || isCapturing) return;

    const simulateDetection = () => {
      // Simulate gradual detection of elements with animations
      setTimeout(() => {
        setDetectionFeedback(prev => ({ ...prev, lanyardColor: 'Periwinkle' }));
      }, 800);

      setTimeout(() => {
        setDetectionFeedback(prev => ({ ...prev, background: 'Swag pattern' }));
      }, 1400);

      setTimeout(() => {
        setDetectionFeedback(prev => ({ ...prev, stickersCount: 2 }));
      }, 1800);

      setTimeout(() => {
        setDetectionFeedback(prev => ({ ...prev, stickersCount: 4 }));
      }, 2200);

      setTimeout(() => {
        setDetectionFeedback(prev => ({ ...prev, stickersCount: 6 }));
      }, 2600);
    };

    simulateDetection();

    // TODO: Replace with actual real-time vision analysis
    // This would use the camera feed to continuously detect elements

  }, [stream, isCapturing]);


  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Calculate crop area accounting for object-cover (larger guide square for easier scanning)
    const displayGuideWidth = 400;
    const displayGuideHeight = 550;

    // Get display dimensions
    const videoDisplayWidth = video.offsetWidth;
    const videoDisplayHeight = video.offsetHeight;

    // Calculate aspect ratios
    const videoAspect = canvas.width / canvas.height;
    const displayAspect = videoDisplayWidth / videoDisplayHeight;

    // With object-cover, determine which dimension fills the container
    let visibleVideoWidth, visibleVideoHeight, offsetX, offsetY;

    if (videoAspect > displayAspect) {
      // Video is wider - height fills container, width is cropped
      visibleVideoHeight = canvas.height;
      visibleVideoWidth = canvas.height * displayAspect;
      offsetX = (canvas.width - visibleVideoWidth) / 2;
      offsetY = 0;
    } else {
      // Video is taller - width fills container, height is cropped
      visibleVideoWidth = canvas.width;
      visibleVideoHeight = canvas.width / displayAspect;
      offsetX = 0;
      offsetY = (canvas.height - visibleVideoHeight) / 2;
    }

    // Scale guide box from display to actual video dimensions
    const scaleX = visibleVideoWidth / videoDisplayWidth;
    const scaleY = visibleVideoHeight / videoDisplayHeight;

    const actualGuideWidth = Math.round(displayGuideWidth * scaleX);
    const actualGuideHeight = Math.round(displayGuideHeight * scaleY);

    // Center the guide box in the visible video area, accounting for offset
    const cropX = Math.round(offsetX + (visibleVideoWidth - actualGuideWidth) / 2);
    const cropY = Math.round(offsetY + (visibleVideoHeight - actualGuideHeight) / 2);

    // Store crop area for later use
    setCropArea({
      x: cropX,
      y: cropY,
      width: actualGuideWidth,
      height: actualGuideHeight
    });

    console.log('Captured photo with crop area:', {
      canvas: { width: canvas.width, height: canvas.height },
      display: { width: videoDisplayWidth, height: videoDisplayHeight },
      scale: { x: scaleX, y: scaleY },
      crop: { x: cropX, y: cropY, width: actualGuideWidth, height: actualGuideHeight }
    });

    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(imageData);
  };

  const confirmCapture = async () => {
    console.log('=== confirmCapture called ===');
    console.log('capturedImage:', !!capturedImage);
    console.log('cropArea:', cropArea);

    if (!capturedImage || !cropArea) {
      console.log('Missing capturedImage or cropArea, returning early');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Starting crop and enhance with area:', cropArea);

      // Crop and enhance the image to the guide box area
      const processedImage = await cropAndEnhanceImage(capturedImage, cropArea);

      console.log('Crop and enhance complete');

      // Stop camera
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Send processed image to parent
      onCapture(processedImage);
    } catch (err) {
      console.error('Image processing error:', err);
      setError('Failed to process image. Please try again.');
      setIsProcessing(false);
      setIsCapturing(false);
      setCapturedImage(null);
      setCropArea(null);
    }
  };

  const retakePhoto = () => {
    setIsCapturing(false);
    setCapturedImage(null);
    setCropArea(null);
    setDetectionFeedback({});
  };

  const handleBack = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onBack();
  };

  if (capturedImage) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <div className="flex-1 flex items-center justify-center p-4">
          <img src={capturedImage} alt="Captured badge" className="max-w-full max-h-full object-contain" />
        </div>

        {isProcessing ? (
          <div className="p-8 text-center">
            <p className="text-white font-['Figma_Sans_VF:Regular',sans-serif] text-[18px]">
              Analyzing badge and reconstructing digitally...
            </p>
            <p className="text-white/60 font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] mt-2">
              This may take a moment
            </p>
          </div>
        ) : (
          <div className="p-8 flex gap-4">
            <button
              onClick={retakePhoto}
              className="px-6 py-3 bg-white/20 border-2 border-white text-white rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-white/30 transition-colors"
            >
              Retake
            </button>
            <button
              onClick={confirmCapture}
              className="px-6 py-3 bg-[#4d49fc] text-white rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-[#3d39ec] transition-colors"
            >
              Use Photo
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="screen-fade-in fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <button
          onClick={handleBack}
          className="font-['Figma_Sans_VF:Regular',sans-serif] text-[20px] text-white/45 hover:text-white/60 transition-colors leading-[0.95] tracking-[-0.6px]"
        >
          &lt; Back
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center px-6">
              <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] mb-4">{error}</p>
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-white text-black rounded-lg font-['Figma_Sans_VF:Regular',sans-serif]"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />

            {/* Guide square with corner brackets - larger for easier scanning */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-24">
              <div
                className="relative border-4 border-white"
                style={{ width: '400px', height: '550px' }}
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white" />

                {/* Detection overlays - visual boxes showing what's being detected */}
                {detectionFeedback.lanyardColor && (
                  <div className="absolute -top-24 left-0 right-0 h-20 border-2 border-green-400 bg-green-400/10 animate-pulse">
                    <div className="absolute -top-6 left-2 bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded">
                      Lanyard
                    </div>
                  </div>
                )}

                {detectionFeedback.background && (
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-32 border-2 border-green-400 bg-green-400/10 animate-pulse">
                    <div className="absolute -top-6 left-2 bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded">
                      Background
                    </div>
                  </div>
                )}

                {detectionFeedback.stickersCount && detectionFeedback.stickersCount >= 2 && (
                  <>
                    <div className="absolute top-20 left-12 w-16 h-16 border-2 border-green-400 bg-green-400/10 rounded-full animate-pulse" />
                    <div className="absolute top-32 right-16 w-20 h-12 border-2 border-green-400 bg-green-400/10 animate-pulse" />
                  </>
                )}

                {detectionFeedback.stickersCount && detectionFeedback.stickersCount >= 4 && (
                  <>
                    <div className="absolute bottom-32 left-20 w-24 h-16 border-2 border-green-400 bg-green-400/10 animate-pulse" />
                    <div className="absolute bottom-24 right-12 w-14 h-14 border-2 border-green-400 bg-green-400/10 rounded-full animate-pulse" />
                  </>
                )}

                {detectionFeedback.stickersCount && detectionFeedback.stickersCount >= 6 && (
                  <>
                    <div className="absolute top-1/3 left-24 w-12 h-20 border-2 border-green-400 bg-green-400/10 animate-pulse" />
                    <div className="absolute top-2/3 right-20 w-18 h-12 border-2 border-green-400 bg-green-400/10 animate-pulse" />
                  </>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-20 left-0 right-0 flex items-center justify-center pointer-events-none px-4">
              <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[40px] lg:text-[64px] text-center leading-[0.95] tracking-[-1.92px]">
                Center your Badge<br />in the square
              </p>
            </div>

            {/* Detection Feedback - Enhanced with active scanning indicators */}
            <div className="absolute bottom-32 left-0 right-0 flex items-center justify-center pointer-events-none px-4">
              <div className="bg-black/70 backdrop-blur-sm px-6 py-4 rounded-2xl max-w-md border border-white/10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${detectionFeedback.lanyardColor ? 'bg-green-400' : 'bg-white/30'} ${!detectionFeedback.lanyardColor && 'animate-pulse'}`} />
                      {detectionFeedback.lanyardColor && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
                      )}
                    </div>
                    <p className={`font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] ${detectionFeedback.lanyardColor ? 'text-green-400' : 'text-white/60'}`}>
                      {detectionFeedback.lanyardColor ? `✓ Lanyard: ${detectionFeedback.lanyardColor}` : 'Scanning lanyard...'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${detectionFeedback.background ? 'bg-green-400' : 'bg-white/30'} ${!detectionFeedback.background && 'animate-pulse'}`} />
                      {detectionFeedback.background && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
                      )}
                    </div>
                    <p className={`font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] ${detectionFeedback.background ? 'text-green-400' : 'text-white/60'}`}>
                      {detectionFeedback.background ? `✓ Background: ${detectionFeedback.background}` : 'Scanning background...'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${detectionFeedback.stickersCount ? 'bg-green-400' : 'bg-white/30'} ${!detectionFeedback.stickersCount && 'animate-pulse'}`} />
                      {detectionFeedback.stickersCount && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
                      )}
                    </div>
                    <p className={`font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] ${detectionFeedback.stickersCount ? 'text-green-400' : 'text-white/60'}`}>
                      {detectionFeedback.stickersCount ? `✓ Stickers: ${detectionFeedback.stickersCount} detected` : 'Scanning stickers...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Capture Button */}
      {!error && (
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex justify-center">
            <button
              onClick={capturePhoto}
              disabled={isCapturing}
              className="w-20 h-20 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <div className="w-full h-full rounded-full border-2 border-transparent" />
            </button>
          </div>
        </div>
      )}

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
