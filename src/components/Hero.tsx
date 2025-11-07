import React from 'react';

interface HeroProps {
  onAuthClick?: () => void;
  onSubscribeClick?: () => void;
}

export function Hero({ onAuthClick, onSubscribeClick }: HeroProps) {
  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: '50vh', minHeight: '400px' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-page.png"
      >
        <source src="https://esg-talent.com/jenn/sample_tax1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" />

      <div className="relative h-full flex items-end justify-center px-6 pb-12">
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Your Gateway to Tax Knowledge
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Gain access to exclusive video content, expert discussions, and tax learning resources designed for professionals in Singapore.
          </p>
        </div>
      </div>
    </div>
  );
}
