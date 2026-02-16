import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DecorativeElements } from './DecorativeElements';

export function GalleryScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-black hover:text-[#4d49fc] transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[18px]">Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <div className="flex">
            <div className="bg-black px-5 py-3 flex items-center justify-center">
              <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[48px] lg:text-[58px] leading-[0.95] tracking-[-1.74px]">
                FigBuild
              </span>
            </div>
            <div className="bg-black px-5 py-3 rounded-full flex items-center justify-center">
              <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[48px] lg:text-[58px] leading-[0.95] tracking-[-1.74px]">
                2026
              </span>
            </div>
          </div>
          <h1 className="font-['Figma_Sans_VF:Regular',sans-serif] text-[32px] lg:text-[42px] tracking-[-1.26px] text-black text-center">
            Share Your FigBuild Badge!
          </h1>
          <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] lg:text-[22px] text-black/70 text-center max-w-lg">
            Upload a photo of your IRL FigBuild badge to share with the community
          </p>
        </div>

        {/* Upload Area */}
        <div className="w-full max-w-2xl">
          {!uploadedImage ? (
            <label className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed border-black/30 rounded-[12px] cursor-pointer bg-white hover:bg-black/5 transition-colors">
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <div className="w-16 h-16 rounded-full bg-[#4d49fc] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-['Figma_Sans_VF:Medium',sans-serif] text-[20px] text-black">
                    Click to upload your badge photo
                  </p>
                  <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full max-w-md bg-white rounded-[12px] overflow-hidden shadow-lg">
                <img
                  src={uploadedImage}
                  alt="Uploaded badge"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setUploadedImage(null)}
                  className="px-6 py-3 border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] text-black hover:bg-black/5 transition-colors"
                >
                  Upload Different Photo
                </button>
                <button
                  onClick={onComplete}
                  className="px-6 py-3 bg-[#4d49fc] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] text-white hover:bg-[#3d39ec] transition-colors"
                >
                  Share to Gallery
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info text */}
        <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 text-center max-w-md">
          By uploading, you agree to share your badge with the FigBuild community
        </p>
      </div>

      <DecorativeElements />
    </div>
  );
}
