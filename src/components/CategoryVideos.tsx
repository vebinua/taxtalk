import React from 'react';
import { TaxVideo } from '../data/taxVideos';
import { taxCategories } from './TaxCategories';

interface CategoryVideosProps {
  categoryId: number;
  videos: TaxVideo[];
  onBack: () => void;
}

export function CategoryVideos({ categoryId, videos, onBack }: CategoryVideosProps) {
  const category = taxCategories.find(c => c.id === categoryId);

  if (!category) return null;

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-video bg-gray-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-base mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-white/60 text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
