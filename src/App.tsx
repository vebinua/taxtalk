import React from 'react';
import { Hero } from './components/Hero';
import { TaxCategories } from './components/TaxCategories';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
      <Hero />
      <TaxCategories />
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
