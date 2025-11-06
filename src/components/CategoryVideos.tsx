import React, { useState } from 'react';
import { TaxVideo } from '../data/taxVideos';
import { taxCategories } from './TaxCategories';
import { VideoRow } from './VideoRow';
import { VideoModal } from './VideoModal';
import { Video } from '../lib/supabase';

interface CategoryVideosProps {
  categoryId: number;
  videos: TaxVideo[];
  onBack: () => void;
}

export function CategoryVideos({ categoryId, videos, onBack }: CategoryVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const category = taxCategories.find(c => c.id === categoryId);

  if (!category) return null;

  const convertToVideo = (taxVideo: TaxVideo): Video => ({
    ...taxVideo,
    category_id: undefined,
  });

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const hasAccess = () => true;

  const handlePurchase = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
      <div className="px-4 sm:px-6 md:px-8 py-8">
        <button
          onClick={onBack}
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg flex-shrink-0"
            style={{ backgroundColor: category.color }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-80" />
            <span className="text-3xl sm:text-4xl relative z-10 filter drop-shadow-sm">
              {category.icon}
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-white/60 mt-1">{videos.length} videos available</p>
          </div>
        </div>

        <VideoRow
          videos={videos.map(convertToVideo)}
          hasAccess={hasAccess}
          onClick={handleVideoClick}
        />
      </div>

      <VideoModal
        isOpen={selectedVideo !== null}
        video={selectedVideo}
        onClose={handleCloseModal}
        hasAccess={true}
        onPurchase={handlePurchase}
      />
    </div>
  );
}
