import React from 'react';

export function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: '40vh', minHeight: '300px' }}>
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Your Gateway to Tax Knowledge
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
            Gain access to exclusive video content, expert discussions, and tax learning resources designed for professionals in Singapore.
          </p>
        </div>
      </div>
    </div>
  );
}
