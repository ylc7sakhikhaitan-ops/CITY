import React, { useEffect, useState } from 'react';
import { Compass, MapPin, Search } from 'lucide-react';
import { generateDailyMood } from '../services/geminiService';
import { Mood, ViewState } from '../types';

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dynamic mood on mount
    const fetchMood = async () => {
      try {
        const data = await generateDailyMood();
        setMood(data);
      } catch (e) {
        console.error("Failed to load mood", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMood();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cream pb-24 animate-fade-in">
      {/* Header */}
      <header className="pt-12 px-6 pb-6 flex justify-between items-end">
        <div>
          <p className="text-navy/60 font-sans text-xs tracking-[0.2em] uppercase mb-2">Welcome Back</p>
          <h1 className="text-4xl text-navy font-serif italic">CityPulse</h1>
        </div>
        <div className="h-10 w-10 rounded-full border border-gold/30 p-0.5">
          <img 
            src="https://picsum.photos/100/100" 
            alt="Profile" 
            className="h-full w-full rounded-full object-cover grayscale opacity-80"
          />
        </div>
      </header>

      <main className="flex-1 px-6 space-y-8">
        
        {/* Mood Card */}
        <div className="relative w-full bg-cream border border-gold p-8 shadow-sm">
           {/* Decorative corner borders */}
           <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/40"></div>
           <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/40"></div>
           <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/40"></div>
           <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/40"></div>

          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-navy/40 font-serif italic">Curating your essence...</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
               <h2 className="text-gold font-sans text-xs tracking-[0.2em] uppercase">Today's Essence</h2>
               <div className="space-y-2">
                 <h3 className="text-3xl text-navy font-serif">{mood?.title}</h3>
                 <p className="text-forest font-serif italic text-lg">{mood?.subtitle}</p>
               </div>
               <div className="w-12 h-[1px] bg-gold/50 mx-auto my-4"></div>
               <p className="text-navy/80 font-sans font-light leading-relaxed text-sm">
                 {mood?.description}
               </p>
            </div>
          )}
        </div>

        {/* Map Preview */}
        <div className="relative h-48 w-full bg-navy/5 overflow-hidden">
          <img 
            src="https://picsum.photos/800/400?grayscale" 
            alt="Map Location" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-navy">
             <MapPin size={16} className="text-gold" />
             <span className="font-sans text-xs tracking-widest uppercase">Current: West Village</span>
          </div>
        </div>

        {/* Feature Access Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <button className="group flex items-center justify-between p-6 bg-white border border-navy/10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-gold/50">
             <div className="flex items-center space-x-4">
               <div className="p-3 bg-navy/5 text-navy rounded-none group-hover:bg-navy group-hover:text-gold transition-colors duration-500">
                 <Compass size={20} strokeWidth={1.5} />
               </div>
               <div className="text-left">
                 <span className="block font-serif text-lg text-navy">AI Navigation</span>
                 <span className="block font-sans text-xs text-navy/50 tracking-wide mt-1">Scenic routes only</span>
               </div>
             </div>
          </button>

          <button 
            onClick={() => setView(ViewState.FOOD)}
            className="group flex items-center justify-between p-6 bg-white border border-navy/10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-gold/50"
          >
             <div className="flex items-center space-x-4">
               <div className="p-3 bg-navy/5 text-navy rounded-none group-hover:bg-navy group-hover:text-gold transition-colors duration-500">
                 <Search size={20} strokeWidth={1.5} />
               </div>
               <div className="text-left">
                 <span className="block font-serif text-lg text-navy">Food & Drink</span>
                 <span className="block font-sans text-xs text-navy/50 tracking-wide mt-1">Curated gastronomy</span>
               </div>
             </div>
          </button>
        </div>

      </main>
    </div>
  );
};

export default HomeView;