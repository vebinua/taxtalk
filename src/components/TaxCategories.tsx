import React from 'react';

export const taxCategories = [
  { id: 1, name: 'Income Tax', icon: '💰', color: '#34C759', bgImage: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 2, name: 'GST', icon: '🧾', color: '#007AFF', bgImage: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 3, name: 'Property Tax', icon: '🏠', color: '#FF9500', bgImage: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 4, name: 'Motor Vehicle Tax', icon: '🚗', color: '#FF2D55', bgImage: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 5, name: 'Customs & Excise Duties', icon: '📦', color: '#5856D6', bgImage: 'https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 6, name: 'Foreign Worker Levy', icon: '👷', color: '#AF52DE', bgImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 7, name: 'CPF Contributions', icon: '💼', color: '#00C7BE', bgImage: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 8, name: 'Stamp Duty', icon: '📝', color: '#32ADE6', bgImage: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 9, name: 'Environmental & Carbon Taxes', icon: '🌱', color: '#30B0C7', bgImage: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 10, name: 'Betting & Gambling Taxes', icon: '🎰', color: '#FF453A', bgImage: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 11, name: 'Tobacco & Alcohol Taxes', icon: '🚬', color: '#FFD60A', bgImage: 'https://images.pexels.com/photos/5926207/pexels-photo-5926207.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { id: 12, name: 'Business & Corporate Taxes', icon: '🏢', color: '#64D2FF', bgImage: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=1920' }
];

interface TaxCategoriesProps {
  onCategoryClick: (categoryId: number) => void;
}

export function TaxCategories({ onCategoryClick }: TaxCategoriesProps) {
  return (
    <div className="px-6 sm:px-8 py-8 pb-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
        {taxCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
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
