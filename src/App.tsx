import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TaxCategories } from './components/TaxCategories';
import { CategoryVideos } from './components/CategoryVideos';
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { VideoModal } from './components/VideoModal';
import { AccountManagement } from './components/AccountManagement';
import { LearningStats } from './components/LearningStats';
import { ContinueWatchingRow } from './components/ContinueWatchingRow';
import { Navbar } from './components/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { taxVideos } from './data/taxVideos';

function AppContent() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof taxVideos[0] | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { user, profile } = useAuth();

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleBack = () => {
    setSelectedCategoryId(null);
  };

  const getMockStats = () => {
    if (!profile) return { weeklyMinutes: 0, weeklyChange: 0, completedVideos: 0, weeklyCompleted: 0, hasPurchases: false };
    
    if (profile.subscription_status === 'active') {
      return { weeklyMinutes: 145, weeklyChange: 23, completedVideos: 12, weeklyCompleted: 3, hasPurchases: false };
    } else if (user?.email === 'payper@taxtalkpro.com') {
      return { weeklyMinutes: 85, weeklyChange: 15, completedVideos: 5, weeklyCompleted: 2, hasPurchases: true };
    } else {
      return { weeklyMinutes: 0, weeklyChange: 0, completedVideos: 0, weeklyCompleted: 0, hasPurchases: false };
    }
  };

  const getContinueWatchingVideos = () => {
    if (!profile) return [];
    
    if (profile.subscription_status === 'active') {
      return taxVideos.slice(0, 4);
    } else if (user?.email === 'payper@taxtalkpro.com') {
      return taxVideos.slice(0, 3);
    }
    return [];
  };

  const hasAccess = (videoId: string) => {
    if (!profile) return false;
    return profile.subscription_status === 'active' || user?.email === 'payper@taxtalkpro.com';
  };

  const mockWatchProgress = new Map([
    [taxVideos[0]?.id, { progress_seconds: 450, duration_seconds: 900 }],
    [taxVideos[1]?.id, { progress_seconds: 200, duration_seconds: 800 }],
    [taxVideos[2]?.id, { progress_seconds: 350, duration_seconds: 700 }],
    [taxVideos[3]?.id, { progress_seconds: 100, duration_seconds: 600 }],
  ]);

  if (selectedCategoryId !== null) {
    const categoryVideos = taxVideos.filter(v => v.categoryId === selectedCategoryId);
    return (
      <>
        <CategoryVideos
          categoryId={selectedCategoryId}
          videos={categoryVideos}
          onBack={handleBack}
          onAuthClick={() => setShowAuthModal(true)}
          onSubscribeClick={() => setShowSubscriptionModal(true)}
        />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSubscribeClick={() => setShowSubscriptionModal(true)}
        />

        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={(plan) => {
            console.log('Subscribed to:', plan);
            setShowSubscriptionModal(false);
          }}
        />
      </>
    );
  }

  const stats = getMockStats();
  const continueWatchingVideos = getContinueWatchingVideos();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onSearch={(query) => console.log('Search:', query)}
        onAuthClick={() => setShowAuthModal(true)}
        onSubscribeClick={() => setShowSubscriptionModal(true)}
        onAccountClick={() => setShowAccountModal(true)}
      />

      {!user && (
        <Hero
          onAuthClick={() => setShowAuthModal(true)}
          onSubscribeClick={() => setShowSubscriptionModal(true)}
        />
      )}

      {user && (
        <div className="pt-24 pb-6">
          <div className="px-4 sm:px-6 md:px-8 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.full_name || 'User'}
            </h1>
            <p className="text-gray-500 text-base">
              Continue your tax learning journey
            </p>
          </div>

          <LearningStats
            weeklyMinutes={stats.weeklyMinutes}
            weeklyChange={stats.weeklyChange}
            completedVideos={stats.completedVideos}
            weeklyCompleted={stats.weeklyCompleted}
            subscriptionStatus={profile?.subscription_status || 'free'}
            onUpgrade={() => setShowSubscriptionModal(true)}
            hasPurchases={stats.hasPurchases}
          />

          {continueWatchingVideos.length > 0 && (
            <div className="mb-8 px-4 sm:px-6 md:px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Continue Watching
              </h2>
              <ContinueWatchingRow
                videos={continueWatchingVideos}
                watchProgress={mockWatchProgress}
                hasAccess={hasAccess}
                onClick={(video) => {
                  setSelectedVideo(video);
                  setShowVideoModal(true);
                }}
              />
            </div>
          )}
        </div>
      )}

      <TaxCategories onCategoryClick={handleCategoryClick} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSubscribeClick={() => setShowSubscriptionModal(true)}
      />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={(plan) => {
          console.log('Subscribed to:', plan);
          setShowSubscriptionModal(false);
        }}
      />

      <AccountManagement
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />

      <VideoModal
        isOpen={showVideoModal}
        video={selectedVideo}
        onClose={() => {
          setShowVideoModal(false);
          setSelectedVideo(null);
        }}
        hasAccess={selectedVideo ? hasAccess(selectedVideo.id) : false}
        onPurchase={(video) => {
          console.log('Purchase video:', video.title);
          setShowVideoModal(false);
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
