import React from 'react';
import { ShieldCheck, MessageCircle, Star } from 'lucide-react';
import { CityBuddy } from '../types';

const MOCK_BUDDIES: CityBuddy[] = [
  {
    id: '1',
    name: 'Eleanor Sterling',
    expertise: 'Art History & Galleries',
    isVerified: true,
    languages: ['English', 'French'],
    imageUrl: 'https://picsum.photos/200/200?random=1',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Julian Vance',
    expertise: 'Jazz Clubs & Speakeasies',
    isVerified: true,
    languages: ['English', 'Italian'],
    imageUrl: 'https://picsum.photos/200/200?random=2',
    rating: 5.0
  },
  {
    id: '3',
    name: 'Sophia Chen',
    expertise: 'Artisan Markets',
    isVerified: true,
    languages: ['English', 'Mandarin'],
    imageUrl: 'https://picsum.photos/200/200?random=3',
    rating: 4.8
  }
];

const BuddyView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cream pb-24">
      {/* Header */}
      <header className="pt-12 px-6 pb-8 border-b border-navy/5">
        <h1 className="text-3xl text-navy font-serif mb-2">CityBuddy™ Network</h1>
        <p className="text-navy/60 font-sans text-sm font-light">
          Connect with vetted local connoisseurs for an insider's perspective.
        </p>
      </header>

      {/* Trust Indicator */}
      <div className="px-6 py-4 bg-navy/5 flex items-center justify-center space-x-2">
        <ShieldCheck size={14} className="text-forest" />
        <span className="text-forest text-[10px] tracking-widest uppercase font-medium">All guides strictly verified</span>
      </div>

      <main className="p-6 space-y-6">
        {MOCK_BUDDIES.map((buddy) => (
          <div key={buddy.id} className="bg-white p-5 border border-navy/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Top Row */}
            <div className="flex items-start space-x-4">
              <div className="relative w-16 h-16">
                <img 
                  src={buddy.imageUrl} 
                  alt={buddy.name} 
                  className="w-full h-full object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {buddy.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-navy text-gold p-1 rounded-none border border-white">
                    <ShieldCheck size={10} strokeWidth={3} />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <h3 className="font-serif text-lg text-navy">{buddy.name}</h3>
                   <div className="flex items-center space-x-1">
                     <Star size={12} className="text-gold fill-gold" />
                     <span className="text-xs font-sans text-navy/60">{buddy.rating}</span>
                   </div>
                </div>
                <p className="text-forest font-serif italic text-sm mt-1">{buddy.expertise}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {buddy.languages.map(lang => (
                    <span key={lang} className="text-[10px] uppercase tracking-wide text-navy/40 border border-navy/10 px-2 py-0.5">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-5 pt-4 border-t border-navy/5 flex justify-between items-center">
              <span className="text-[10px] text-navy/40 italic">Replies typically within 1 hour</span>
              <button className="flex items-center space-x-2 bg-navy text-cream px-4 py-2 hover:bg-forest transition-colors">
                <MessageCircle size={14} />
                <span className="text-xs uppercase tracking-widest">Connect</span>
              </button>
            </div>
          </div>
        ))}

        <div className="text-center py-6">
          <p className="text-xs text-navy/40 font-sans max-w-xs mx-auto">
            Your privacy is paramount. All initial communications are anonymized for your safety.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BuddyView;