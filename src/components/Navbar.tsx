import { Search, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onAuthClick: () => void;
  onSubscribeClick?: () => void;
  onAccountClick?: () => void;
  hasPurchases?: boolean;
}

export function Navbar({ onSearch, onAuthClick, onSubscribeClick, onAccountClick, hasPurchases = false }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (user) return; // Only hide navbar for guest view

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, user]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (user) {
    // iPhone-style navbar for signed-in users
    return (
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold">
              Tax Talk <span style={{ color: '#827546' }}>Pro</span>
            </h1>
            {profile?.subscription_status === 'active' ? (
              <span className="px-2 py-0.5 rounded-full font-medium text-xs bg-green-100 text-green-700">
                Subscriber
              </span>
            ) : hasPurchases ? (
              <>
                <span className="px-2 py-0.5 rounded-full font-medium text-xs bg-blue-100 text-blue-700">
                  Pay-Per-View
                </span>
                <button
                  onClick={onSubscribeClick}
                  className="px-2 py-0.5 rounded-full font-medium text-xs text-white transition hover:opacity-90"
                  style={{ background: '#827546' }}
                >
                  Subscribe
                </button>
              </>
            ) : (
              <button
                onClick={onSubscribeClick}
                className="px-2 py-0.5 rounded-full font-medium text-xs text-white transition hover:opacity-90"
                style={{ background: '#827546' }}
              >
                Subscribe
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={onAccountClick}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <Settings className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <LogOut className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-300">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search videos..."
                className="bg-transparent text-gray-900 placeholder-gray-500 outline-none w-full text-sm"
                onChange={(e) => onSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>
    );
  }

  // iOS-style navbar for guests
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 transition-transform duration-300"
      style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-[1800px] mx-auto">
        <div className="flex items-center">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">
            Tax Talk <span style={{ color: '#827546' }}>Pro</span>
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onSubscribeClick || onAuthClick}
            className="px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 text-white shadow-sm active:scale-95"
            style={{
              background: '#827546',
              boxShadow: '0 2px 6px rgba(130, 117, 70, 0.2)'
            }}
          >
            Subscribe
          </button>

          <button
            onClick={onAuthClick}
            className="px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
