import React from 'react';

const taxCategories = [
  { id: 1, name: 'Income Tax', icon: '💰', color: '#34C759' },
  { id: 2, name: 'GST', icon: '🧾', color: '#007AFF' },
  { id: 3, name: 'Property Tax', icon: '🏠', color: '#FF9500' },
  { id: 4, name: 'Motor Vehicle Tax', icon: '🚗', color: '#FF2D55' },
  { id: 5, name: 'Customs & Excise Duties', icon: '📦', color: '#5856D6' },
  { id: 6, name: 'Foreign Worker Levy', icon: '👷', color: '#AF52DE' },
  { id: 7, name: 'CPF Contributions', icon: '💼', color: '#00C7BE' },
  { id: 8, name: 'Stamp Duty', icon: '📝', color: '#32ADE6' },
  { id: 9, name: 'Environmental & Carbon Taxes', icon: '🌱', color: '#30B0C7' },
  { id: 10, name: 'Betting & Gambling Taxes', icon: '🎰', color: '#FF453A' },
  { id: 11, name: 'Tobacco & Alcohol Taxes', icon: '🚬', color: '#FFD60A' },
  { id: 12, name: 'Business & Corporate Taxes', icon: '🏢', color: '#64D2FF' }
];

export function TaxCategories() {
  return (
    <div className="px-6 sm:px-8 py-8 pb-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
        {taxCategories.map((category) => (
          <button
            key={category.id}
            className="flex flex-col items-center gap-2 group"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-transform duration-200 active:scale-90 relative overflow-hidden shadow-lg"
              style={{ backgroundColor: category.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-80" />
              <span className="text-3xl sm:text-4xl relative z-10 filter drop-shadow-sm">
                {category.icon}
              </span>
            </div>
            <span className="text-white text-xs sm:text-sm font-medium text-center leading-tight max-w-[80px] sm:max-w-[90px]">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
