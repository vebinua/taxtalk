import { X, Lock, Play } from 'lucide-react';
import { Video } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { VideoFeedback } from './VideoFeedback';
import { VideoPlayer } from './VideoPlayer';

interface VideoModalProps {
  isOpen: boolean;
  video: Video | null;
  onClose: () => void;
  hasAccess: boolean;
  onPurchase: (video: Video) => void;
}

export function VideoModal({ isOpen, video, onClose, hasAccess, onPurchase }: VideoModalProps) {
  const { user, profile } = useAuth();

  if (!isOpen || !video) return null;

  const isSubscriber = profile?.subscription_status === 'active';
  const isPayPerView = user && profile?.subscription_status === 'free';
  const isFreeUser = !user;

  const canWatchFull = hasAccess || isSubscriber;
  const videoUrl = canWatchFull ? video.full_video_url : video.trailer_url;

  const getAccessType = () => {
    if (!user) return 'free';
    if (isSubscriber) return 'subscriber';
    if (hasAccess) return 'purchased';
    return 'payPerView';
  };

  const accessType = getAccessType();

  console.log('VideoModal Debug:', {
    user: !!user,
    profile: profile,
    isSubscriber,
    hasAccess,
    canWatchFull,
    accessType,
    videoId: video.id
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-5xl w-full my-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-black/60 hover:bg-black/80 active:bg-black text-white p-2 sm:p-2.5 rounded-full transition touch-manipulation"
            aria-label="Close video"
          >
            <X className="w-6 h-6 sm:w-6 sm:h-6" />
          </button>

          <div className="relative">
            <VideoPlayer
              videoUrl={videoUrl}
              posterUrl={video.thumbnail_url}
              videoId={video.id}
            />

            {canWatchFull && user && (
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-10">
                <VideoFeedback videoId={video.id} />
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#033a66' }}>
                  {video.title}
                </h2>
                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  <span>{video.duration_minutes} minutes</span>
                  <span>•</span>
                  <span>{video.view_count} views</span>
                  <span>•</span>
                  <span className="font-semibold" style={{ color: '#827546' }}>
                    ${video.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
              {video.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
