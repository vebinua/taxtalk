import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TaxCategories } from './components/TaxCategories';
import { CategoryVideos } from './components/CategoryVideos';
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AccountManagement } from './components/AccountManagement';
import { Navbar } from './components/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { taxVideos } from './data/taxVideos';

function AppContent() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { user, profile } = useAuth();

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleBack = () => {
    setSelectedCategoryId(null);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
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
      <div className={user ? 'pt-20' : ''}>
        <TaxCategories onCategoryClick={handleCategoryClick} />
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
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
