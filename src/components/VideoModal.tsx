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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
      <div className="bg-black rounded-none sm:rounded-2xl max-w-6xl w-full my-auto shadow-2xl overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 bg-black/70 hover:bg-black/90 active:bg-black text-white p-2.5 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110 touch-manipulation"
            aria-label="Close video"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>

          <div className="relative bg-black">
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

          <div className="bg-gradient-to-b from-gray-900 to-black p-5 sm:p-8 md:p-10">
            <div className="flex items-start justify-between mb-4 sm:mb-5">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white leading-tight">
                  {video.title}
                </h2>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Play className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 font-medium">{video.duration_minutes} minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-white/80 leading-relaxed text-sm sm:text-base md:text-lg">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
