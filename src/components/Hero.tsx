import React, { useState, useEffect } from 'react';

export function Hero() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="pt-16 sm:pt-20 pb-8 sm:pb-12 px-6 text-center">
      <div className="text-7xl sm:text-8xl md:text-9xl font-light text-white mb-4 tracking-tight" style={{ fontFeatureSettings: '"tnum"' }}>
        {timeString}
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2 tracking-tight">
        Tax Information
      </h1>
      <p className="text-base sm:text-lg text-white/70 font-normal">
        Everything you need to know
      </p>
    </div>
  );
}
