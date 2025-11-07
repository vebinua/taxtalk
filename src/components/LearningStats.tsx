import { Clock, Award, CreditCard, TrendingUp } from 'lucide-react';

interface LearningStatsProps {
  weeklyMinutes: number;
  weeklyChange: number;
  completedVideos: number;
  weeklyCompleted: number;
  subscriptionStatus: string;
  onUpgrade: () => void;
  hasPurchases?: boolean;
}

export function LearningStats({
  weeklyMinutes,
  weeklyChange,
  completedVideos,
  weeklyCompleted,
  subscriptionStatus,
  onUpgrade,
  hasPurchases = false
}: LearningStatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const isSubscribed = subscriptionStatus === 'active';
  const isPayPerView = !isSubscribed && hasPurchases;
  const displayPlan = isSubscribed ? 'Premium' : isPayPerView ? 'Pay-Per-View' : 'Free';

  return (
    <div className="mb-6 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm transition-all duration-200 active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            {weeklyChange !== 0 && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                weeklyChange > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <TrendingUp className={`w-3 h-3 ${weeklyChange < 0 ? 'rotate-180' : ''}`} />
                <span className="text-xs font-bold">{weeklyChange > 0 ? '+' : ''}{weeklyChange}%</span>
              </div>
            )}
          </div>
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Watch Time</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {formatTime(weeklyMinutes)}
          </p>
          <p className="text-gray-400 text-xs">
            {weeklyChange > 0 ? `+${Math.abs(weeklyChange)}% from last week` : weeklyChange < 0 ? `${weeklyChange}% from last week` : 'Same as last week'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm transition-all duration-200 active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <Award className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Completed Videos</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {completedVideos}
          </p>
          <p className="text-gray-400 text-xs">
            {weeklyCompleted > 0 ? `${weeklyCompleted} this week` : 'Start watching to track progress'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm sm:col-span-2 lg:col-span-1 transition-all duration-200 active:scale-[0.98]">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg`} style={{ backgroundColor: isSubscribed ? '#faf9f6' : '#f9fafb' }}>
              <CreditCard className={`w-5 h-5`} style={{ color: isSubscribed ? '#827546' : '#9ca3af' }} />
            </div>
            {!isSubscribed && (
              <button
                onClick={onUpgrade}
                className="px-3 py-1.5 text-white rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
                style={{ backgroundColor: '#827546' }}
              >
                Upgrade
              </button>
            )}
          </div>
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Membership</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1 capitalize">
            {displayPlan}
          </p>
          <p className="text-gray-400 text-xs">
            {isSubscribed ? 'Unlimited access to all content' : isPayPerView ? 'Access to purchased videos' : 'Limited to trailers only'}
          </p>
        </div>
      </div>
    </div>
  );
}
