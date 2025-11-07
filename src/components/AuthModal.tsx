import { X, User, CreditCard, Crown, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { initializeDemoUsers } from '../lib/initDemoUsers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  onSubscribeClick?: () => void;
}

interface DemoAccount {
  email: string;
  password: string;
  name: string;
  type: 'free' | 'pay-per-view' | 'subscriber';
  description: string;
  icon: React.ReactNode;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess, onSubscribeClick }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializingDemo, setInitializingDemo] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleInitializeDemoUsers = async () => {
    setInitializingDemo(true);
    setError('');
    try {
      const results = await initializeDemoUsers();
      setError('');
      const message = 'Demo users setup complete!\n\n' + results.join('\n') + '\n\nYou can now click the demo account buttons to sign in.';
      alert(message);
    } catch (err: any) {
      setError('Error creating demo users: ' + (err.message || 'Unknown error'));
      console.error('Demo user creation error:', err);
    } finally {
      setInitializingDemo(false);
    }
  };

  if (!isOpen) return null;

  const demoAccounts: DemoAccount[] = [
    {
      email: 'free@taxtalkpro.com',
      password: 'demo123456',
      name: 'Free User',
      type: 'free',
      description: 'Watch trailers only',
      icon: <User className="w-5 h-5" />,
    },
    {
      email: 'payper@taxtalkpro.com',
      password: 'demo123456',
      name: 'Pay-Per-View User',
      type: 'pay-per-view',
      description: 'Purchased 5 videos',
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      email: 'subscriber@taxtalkpro.com',
      password: 'demo123456',
      name: 'Active Subscriber',
      type: 'subscriber',
      description: 'Full access to all videos',
      icon: <Crown className="w-5 h-5" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
      onClose();
      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full relative my-auto shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-all touch-manipulation z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-12 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isSignUp ? 'Join Tax Talk Pro today' : 'Sign in to continue learning'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3.5 rounded-xl font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-white font-semibold text-base transition-all active:scale-95 disabled:opacity-50 shadow-md touch-manipulation mt-6"
              style={{
                background: '#827546',
                boxShadow: '0 4px 12px rgba(130, 117, 70, 0.25)'
              }}
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                if (!isSignUp && onSubscribeClick) {
                  onClose();
                  onSubscribeClick();
                } else {
                  setIsSignUp(!isSignUp);
                }
              }}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
