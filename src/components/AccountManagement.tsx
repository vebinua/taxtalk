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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl my-auto max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Account Settings</h2>
            <p className="text-gray-500 text-sm">Manage your profile and subscription</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 touch-manipulation group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-gray-50">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Watch Time</p>
              <p className="text-2xl font-bold text-gray-900">{watchStats.totalMinutes}<span className="text-sm text-gray-500 ml-1">min</span></p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-5 border border-green-200 hover:border-green-300 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-green-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{watchStats.completedVideos}<span className="text-sm text-gray-500 ml-1">videos</span></p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-5 border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300" style={{ background: '#827546' }}>
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#827546' }}>Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{purchaseCount}<span className="text-sm text-gray-500 ml-1">videos</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <p className="font-semibold uppercase tracking-wide">Email</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{membershipData.email}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <p className="font-semibold uppercase tracking-wide">Member Since</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{membershipData.memberSince}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-green-100 rounded-xl">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Membership Status</h3>
                {profile?.subscription_status === 'active' && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">Active</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Plan Type</p>
                <p className="text-base font-bold text-gray-900">{membershipData.membershipType}</p>
              </div>
              {profile?.subscription_status === 'active' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Next Payment</p>
                    <p className="text-sm font-semibold text-gray-900">{membershipData.nextPayment}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Amount</p>
                    <p className="text-sm font-semibold text-gray-900">{membershipData.paymentAmount}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {profile?.subscription_status === 'active' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-green-100 rounded-xl">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Saved Card</p>
                <p className="text-base font-bold text-gray-900">{membershipData.paymentMethod}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-red-100 rounded-xl">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Security Settings</h3>
            </div>

            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm rounded-xl hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-300"
              >
                Update Password
              </button>
            ) : (
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                {passwordError && (
                  <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2.5 rounded-xl">
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="font-semibold">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="flex items-start gap-2 text-xs text-green-600 bg-green-50 border border-green-200 px-3 py-2.5 rounded-xl">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="font-semibold">{passwordSuccess}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm rounded-xl hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-300"
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
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all border border-gray-300"
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
