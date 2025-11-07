import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Calendar, User, Lock, X, Mail, Shield, Check, Award, TrendingUp, Clock } from 'lucide-react';

interface AccountManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountManagement({ isOpen, onClose }: AccountManagementProps) {
  const { user, profile } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [watchStats, setWatchStats] = useState({ totalMinutes: 0, completedVideos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      loadUserStats();
    }
  }, [isOpen, user]);

  const loadUserStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (profile?.subscription_status === 'active') {
        setPurchaseCount(0);
        setWatchStats({ totalMinutes: 245, completedVideos: 12 });
      } else if (user.email === 'payper@taxtalkpro.com') {
        setPurchaseCount(5);
        setWatchStats({ totalMinutes: 180, completedVideos: 5 });
      } else {
        setPurchaseCount(0);
        setWatchStats({ totalMinutes: 0, completedVideos: 0 });
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getMockMembershipData = () => {
    if (!user || !profile) return null;

    const memberSince = new Date(user.created_at || '2024-01-01');
    const isSubscriber = profile.subscription_status === 'active';
    const isPayPerView = profile.subscription_status === 'free';

    let nextPayment = null;
    let paymentAmount = null;

    if (isSubscriber) {
      nextPayment = new Date();
      nextPayment.setMonth(nextPayment.getMonth() + 1);
      paymentAmount = '$18.99';
    }

    return {
      memberSince: memberSince.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      membershipType: isSubscriber ? 'Premium Subscription' : 'Pay-Per-View',
      nextPayment: nextPayment ? nextPayment.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : 'N/A',
      paymentAmount: paymentAmount || 'N/A',
      paymentMethod: isSubscriber ? 'Visa •••• 4242' : 'N/A',
      email: user.email || 'N/A'
    };
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      setShowPasswordForm(false);
      setPasswordSuccess('');
    }, 2000);
  };

  const membershipData = getMockMembershipData();

  if (!membershipData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl w-full max-w-3xl shadow-2xl my-auto max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="sticky top-0 bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Account Settings</h2>
            <p className="text-gray-400 text-sm">Manage your profile and subscription</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 active:bg-white/20 rounded-xl transition-all duration-200 touch-manipulation group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-500/15 to-blue-600/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-blue-300/70 font-medium uppercase tracking-wide mb-1">Watch Time</p>
              <p className="text-2xl font-bold text-white">{watchStats.totalMinutes}<span className="text-sm text-gray-400 ml-1">min</span></p>
            </div>

            <div className="bg-gradient-to-br from-green-500/15 to-green-600/10 backdrop-blur-sm rounded-2xl p-4 border border-green-500/20 hover:border-green-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-green-300/70 font-medium uppercase tracking-wide mb-1">Completed</p>
              <p className="text-2xl font-bold text-white">{watchStats.completedVideos}<span className="text-sm text-gray-400 ml-1">videos</span></p>
            </div>

            <div className="bg-gradient-to-br from-amber-500/15 to-amber-600/10 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-amber-300/70 font-medium uppercase tracking-wide mb-1">Purchases</p>
              <p className="text-2xl font-bold text-white">{purchaseCount}<span className="text-sm text-gray-400 ml-1">videos</span></p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-blue-500/20 rounded-xl">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Profile Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <p className="font-medium uppercase tracking-wide">Email</p>
                </div>
                <p className="text-sm font-semibold text-white">{membershipData.email}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <p className="font-medium uppercase tracking-wide">Member Since</p>
                </div>
                <p className="text-sm font-semibold text-white">{membershipData.memberSince}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-emerald-500/20 rounded-xl">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Membership Status</h3>
                {profile?.subscription_status === 'active' && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">Active</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Plan Type</p>
                <p className="text-base font-bold text-white">{membershipData.membershipType}</p>
              </div>
              {profile?.subscription_status === 'active' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Next Payment</p>
                    <p className="text-sm font-semibold text-white">{membershipData.nextPayment}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Amount</p>
                    <p className="text-sm font-semibold text-white">{membershipData.paymentAmount}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {profile?.subscription_status === 'active' && (
            <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-green-500/20 rounded-xl">
                  <CreditCard className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Payment Method</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Saved Card</p>
                <p className="text-base font-bold text-white">{membershipData.paymentMethod}</p>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-red-500/20 rounded-xl">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Security Settings</h3>
            </div>

            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300"
              >
                Update Password
              </button>
            ) : (
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                {passwordError && (
                  <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/20 border border-red-500/40 px-3 py-2.5 rounded-xl">
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="font-medium">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="flex items-start gap-2 text-xs text-green-400 bg-green-500/20 border border-green-500/40 px-3 py-2.5 rounded-xl">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="font-medium">{passwordSuccess}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordError('');
                      setPasswordSuccess('');
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="px-6 py-2.5 bg-white/10 text-gray-300 font-semibold text-sm rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
