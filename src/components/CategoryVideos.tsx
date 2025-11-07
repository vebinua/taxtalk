import React, { useState } from 'react';
import { TaxVideo } from '../data/taxVideos';
import { taxCategories } from './TaxCategories';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';
import { Video } from '../lib/supabase';

interface CategoryVideosProps {
  categoryId: number;
  videos: TaxVideo[];
  onBack: () => void;
  onAuthClick?: () => void;
  onSubscribeClick?: () => void;
}

export function CategoryVideos({ categoryId, videos, onBack, onAuthClick, onSubscribeClick }: CategoryVideosProps) {
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
      <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.bgImage}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${category.color}40 0%, ${category.color}20 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />

        <button
          onClick={onBack}
          className="absolute top-6 left-4 sm:left-8 z-10 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="absolute top-6 right-4 sm:right-8 flex items-center space-x-2 z-10">
          <button
            onClick={onSubscribeClick || onAuthClick}
            className="px-4 py-1.5 rounded-full font-medium text-xs transition hover:opacity-90 text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #827546 0%, #a08f5a 100%)' }}
          >
            Subscribe
          </button>
          <button
            onClick={onAuthClick}
            className="px-4 py-1.5 rounded-full font-medium text-xs transition hover:bg-white/10 border border-white/40 text-white backdrop-blur-sm shadow-sm"
          >
            Sign In
          </button>
        </div>

        <div className="relative h-full flex items-center px-4 sm:px-8 py-8">
          <div className="flex items-center gap-6">
            <div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl flex-shrink-0"
              style={{ backgroundColor: category.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-80" />
              <span className="text-5xl sm:text-6xl relative z-10 filter drop-shadow-lg">
                {category.icon}
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-2">
                {category.name}
              </h1>
              <p className="text-white/80 text-base sm:text-lg">{videos.length} videos available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {videos.map((video) => (
            <div key={video.id}>
              <VideoCard
                video={convertToVideo(video)}
                hasAccess={true}
                onClick={handleVideoClick}
              />
            </div>
          ))}
        </div>
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
