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
    <div className="mb-12 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-6">
            <div className="bg-blue-500/20 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            {weeklyChange !== 0 && (
              <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full ${
                weeklyChange > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${weeklyChange < 0 ? 'rotate-180' : ''}`} />
                <span className="text-sm font-bold">{weeklyChange > 0 ? '+' : ''}{weeklyChange}%</span>
              </div>
            )}
          </div>
          <h3 className="text-blue-300/80 text-sm font-semibold uppercase tracking-wide mb-3">Watch Time</h3>
          <p className="text-4xl font-bold text-white mb-2">
            {formatTime(weeklyMinutes)}
          </p>
          <p className="text-white/40 text-sm">
            {weeklyChange > 0 ? `+${Math.abs(weeklyChange)}% from last week` : weeklyChange < 0 ? `${weeklyChange}% from last week` : 'Same as last week'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 hover:border-green-500/30 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-6">
            <div className="bg-green-500/20 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <h3 className="text-green-300/80 text-sm font-semibold uppercase tracking-wide mb-3">Completed Videos</h3>
          <p className="text-4xl font-bold text-white mb-2">
            {completedVideos}
          </p>
          <p className="text-white/40 text-sm">
            {weeklyCompleted > 0 ? `${weeklyCompleted} this week` : 'Start watching to track progress'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300 sm:col-span-2 lg:col-span-1 group">
          <div className="flex items-start justify-between mb-6">
            <div className={`${isSubscribed ? 'bg-amber-500/20' : 'bg-gray-500/20'} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
              <CreditCard className={`w-8 h-8 ${isSubscribed ? 'text-amber-400' : 'text-gray-400'}`} />
            </div>
            {!isSubscribed && (
              <button
                onClick={onUpgrade}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/30 text-amber-300 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105"
              >
                Upgrade
              </button>
            )}
          </div>
          <h3 className={`${isSubscribed ? 'text-amber-300/80' : 'text-gray-400/80'} text-sm font-semibold uppercase tracking-wide mb-3`}>Membership</h3>
          <p className="text-4xl font-bold text-white mb-2 capitalize">
            {displayPlan}
          </p>
          <p className="text-white/40 text-sm">
            {isSubscribed ? 'Unlimited access to all content' : isPayPerView ? 'Access to purchased videos' : 'Limited to trailers only'}
          </p>
        </div>
      </div>
    </div>
  );
}
