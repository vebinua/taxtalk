import { X } from 'lucide-react';
import { useState } from 'react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'annual') => void;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [billedTo, setBilledTo] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('Singapore');
  const [zipCode, setZipCode] = useState('');

  if (!isOpen) return null;

  const monthlyPrice = 99;
  const annualPrice = 999;
  const monthlyPricePerMonth = monthlyPrice;
  const annualPricePerMonth = Math.round(annualPrice / 12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe(selectedPlan);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl my-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-all z-10 touch-manipulation"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-12 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Upgrade to Pro
            </h2>
            <p className="text-sm text-gray-500">
              Get unlimited access and save 20% with annual billing
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Membership Type */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Membership Type
                </label>

                {/* Annual Option */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('annual')}
                  className="w-full p-4 rounded-2xl border-2 transition text-left relative touch-manipulation active:scale-98"
                  style={{
                    borderColor: selectedPlan === 'annual' ? '#827546' : '#e5e7eb',
                    backgroundColor: selectedPlan === 'annual' ? '#faf9f6' : 'white'
                  }}
                >
                  <div className="absolute -top-2 right-4 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-sm" style={{ backgroundColor: '#827546' }}>
                    Save 20%
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: selectedPlan === 'annual' ? '#827546' : '#d1d5db' }}
                      >
                        {selectedPlan === 'annual' && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#827546' }}></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Annual</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          ${annualPricePerMonth}/month
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${annualPrice}</div>
                      <div className="text-xs text-gray-500">per year</div>
                    </div>
                  </div>
                </button>

                {/* Monthly Option */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan('monthly')}
                  className="w-full p-4 rounded-2xl border-2 transition text-left touch-manipulation active:scale-98"
                  style={{
                    borderColor: selectedPlan === 'monthly' ? '#827546' : '#e5e7eb',
                    backgroundColor: selectedPlan === 'monthly' ? '#faf9f6' : 'white'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: selectedPlan === 'monthly' ? '#827546' : '#d1d5db' }}
                      >
                        {selectedPlan === 'monthly' && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#827546' }}></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Monthly</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          ${monthlyPricePerMonth}/month
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${monthlyPrice}</div>
                      <div className="text-xs text-gray-500">per month</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Payment Information */}
              <div className="space-y-4 pt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Information
                </label>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Billed to
                  </label>
                  <input
                    type="text"
                    value={billedTo}
                    onChange={(e) => setBilledTo(e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12 / 25"
                      maxLength={7}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all appearance-none"
                      required
                    >
                      <option>Singapore 🇸🇬</option>
                      <option>United States 🇺🇸</option>
                      <option>United Kingdom 🇬🇧</option>
                      <option>Australia 🇦🇺</option>
                      <option>Canada 🇨🇦</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4">
              <p className="text-xs text-center text-gray-500 mb-4">
                By continuing you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </p>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-white font-semibold text-base transition-all active:scale-95 shadow-md touch-manipulation"
                style={{
                  background: '#827546',
                  boxShadow: '0 4px 12px rgba(130, 117, 70, 0.25)'
                }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
