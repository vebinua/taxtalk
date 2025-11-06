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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full my-auto shadow-2xl overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 bg-white/90 hover:bg-white active:bg-white/80 text-gray-900 p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 touch-manipulation"
            aria-label="Close video"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          <div className="relative bg-black rounded-t-xl sm:rounded-t-2xl overflow-hidden">
            <VideoPlayer
              videoUrl={videoUrl}
              posterUrl={video.thumbnail_url}
              videoId={video.id}
            />

            {canWatchFull && user && (
              <div className="absolute bottom-3 right-3 z-10">
                <VideoFeedback videoId={video.id} />
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight" style={{ color: '#033a66' }}>
                {video.title}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md">
                  <Play className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">{video.duration_minutes} min</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {video.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
