import { Clock, Lock } from 'lucide-react';
import { Video } from '../lib/supabase';

interface VideoCardProps {
  video: Video;
  hasAccess: boolean;
  onClick: (video: Video) => void;
  progress?: number;
  showPrice?: boolean; // Optional prop to control price visibility
}

export function VideoCard({
  video,
  hasAccess,
  onClick,
  progress,
  showPrice = true
}: VideoCardProps) {
  return (
    <div
      className="cursor-pointer transition-all duration-200 active:scale-[0.97]"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {!hasAccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md">
              <Lock className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        )}

        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Clock className="w-3 h-3" />
          <span>{video.duration_minutes}m</span>
        </div>

        {video.is_new && (
          <div className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm" style={{ backgroundColor: '#827546' }}>
            NEW
          </div>
        )}

        {!hasAccess && showPrice && video.price !== undefined && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            ${video.price.toFixed(2)}
          </div>
        )}

        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-1 transition-all"
              style={{
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: '#827546'
              }}
            />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mt-2 line-clamp-2 leading-snug px-1">
        {video.title}
      </h3>
    </div>
  );
}