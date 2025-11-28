import React, { useState } from 'react';
import { Tag, Share2, ChevronRight, X, Clock, MapPin } from 'lucide-react';
import { Venue } from '../types';

const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Gilded Lily',
    type: 'Cocktail Salon',
    tags: ['Candlelit', 'Jazz', 'Speakeasy'],
    description: 'A subterranean sanctuary offering pre-prohibition cocktails in an intimate, velvet-draped setting.',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    priceLevel: '$$$'
  },
  {
    id: '2',
    name: 'Atelier Racine',
    type: 'Neo-Bistro',
    tags: ['Solo-Dining Friendly', 'Farm-to-Table', 'Natural Wine'],
    description: 'Quietly confident seasonal dishes served at a limestone counter perfect for the solitary epicurean.',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    priceLevel: '$$'
  },
  {
    id: '3',
    name: 'Vault & Vine',
    type: 'Wine Cellar',
    tags: ['Historical', 'Sommelier Selection'],
    description: 'Located in a former bank vault, offering rare vintages and artisan cheeses.',
    imageUrl: 'https://picsum.photos/600/400?random=12',
    priceLevel: '$$$$'
  }
];

const FoodView: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const handleShare = async (venue: Venue) => {
    const shareData = {
      title: venue.name,
      text: `Discover ${venue.name} on CityPulse: ${venue.description}`,
      url: window.location.href, 
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled or failed:', err);
      }
    } else {
      try {
        const textToCopy = `${shareData.title}\n${shareData.text}`;
        await navigator.clipboard.writeText(textToCopy);
        alert('Venue details copied to clipboard.');
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream pb-24 relative">
      {/* Header */}
      <header className="pt-12 px-6 pb-6 sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b border-navy/5">
        <h1 className="text-3xl text-navy font-serif">Epicurean Edit</h1>
        <div className="flex space-x-4 mt-4 overflow-x-auto no-scrollbar pb-2">
           {['Quiet Ambience', 'Solo-Dining', 'Architecture'].map(filter => (
             <button key={filter} className="flex-shrink-0 text-xs font-sans uppercase tracking-widest px-3 py-1.5 border border-navy/20 text-navy/60 hover:bg-navy hover:text-gold hover:border-navy transition-colors">
               {filter}
             </button>
           ))}
        </div>
      </header>

      <main className="p-6 space-y-12">
        {MOCK_VENUES.map((venue, idx) => (
          <article key={venue.id} className="group relative">
            {/* Image Container with Film Look */}
            <div 
              className="w-full h-64 overflow-hidden mb-6 relative cursor-pointer"
              onClick={() => setSelectedVenue(venue)}
            >
              <div className="absolute inset-0 bg-navy/20 z-10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
              <img 
                src={venue.imageUrl} 
                alt={venue.name} 
                className="w-full h-full object-cover saturate-50 contrast-125 sepia-[.15] group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute top-4 right-4 z-20 bg-cream/90 backdrop-blur text-navy font-serif px-3 py-1 text-sm shadow-md">
                {venue.priceLevel}
              </div>
            </div>

            {/* Content */}
            <div className="px-2">
              <div className="flex justify-between items-baseline mb-2">
                <h2 
                  className="text-2xl text-navy font-serif group-hover:text-forest transition-colors cursor-pointer"
                  onClick={() => setSelectedVenue(venue)}
                >
                  {idx + 1}. {venue.name}
                </h2>
                <span className="text-xs uppercase tracking-widest text-navy/40">{venue.type}</span>
              </div>
              
              <p className="text-navy/70 font-sans font-light leading-relaxed mb-4 text-sm">
                {venue.description}
              </p>

              <div className="flex justify-between items-end mt-4">
                <div className="flex flex-col gap-4 flex-1 pr-4">
                  <div className="flex flex-wrap gap-3">
                    {venue.tags.map(tag => (
                      <span key={tag} className="flex items-center text-forest text-[10px] uppercase tracking-widest font-medium">
                        <span className="w-1 h-1 bg-gold rounded-full mr-2"></span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedVenue(venue)}
                    className="self-start flex items-center gap-1 text-xs font-serif italic text-navy border-b border-transparent hover:border-gold hover:text-gold transition-all duration-300 pb-0.5"
                  >
                    See Details <ChevronRight size={12} />
                  </button>
                </div>

                <button 
                  onClick={() => handleShare(venue)}
                  className="flex-shrink-0 flex items-center justify-center p-2 rounded-full text-navy/40 hover:text-gold hover:bg-navy/5 transition-all duration-300"
                  aria-label="Share venue"
                  title="Share"
                >
                  <Share2 size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            
            {/* Decorative separator */}
            {idx !== MOCK_VENUES.length - 1 && (
              <div className="w-1/2 mx-auto h-[1px] bg-navy/10 mt-12"></div>
            )}
          </article>
        ))}
      </main>

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedVenue(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-cream w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20 flex flex-col animate-scale-in">
            
            <button 
              onClick={() => setSelectedVenue(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-cream/80 backdrop-blur rounded-full text-navy hover:text-gold transition-colors shadow-sm"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Hero Image */}
            <div className="h-64 w-full relative shrink-0">
               <img 
                 src={selectedVenue.imageUrl} 
                 alt={selectedVenue.name}
                 className="w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent mix-blend-multiply"></div>
               <div className="absolute bottom-6 left-6 right-6 text-white">
                 <div className="flex items-center space-x-2 mb-2">
                   <span className="px-2 py-0.5 border border-gold/50 text-gold text-[10px] uppercase tracking-widest backdrop-blur-sm">
                     {selectedVenue.type}
                   </span>
                 </div>
                 <h2 className="text-3xl font-serif leading-tight text-cream">{selectedVenue.name}</h2>
               </div>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-8">
              
              {/* Metadata Row */}
              <div className="flex justify-between items-center border-b border-navy/10 pb-6">
                 <div className="flex items-center space-x-2 text-navy/60 text-sm">
                    <Clock size={14} className="text-gold" />
                    <span className="font-sans text-xs tracking-wide">Tue - Sun: 6PM - 2AM</span>
                 </div>
                 <span className="font-serif text-lg text-navy">{selectedVenue.priceLevel}</span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-navy/40 mb-3 font-medium">The Experience</h3>
                <p className="text-navy/80 font-serif leading-relaxed text-sm">
                  {selectedVenue.description} 
                  <span className="block mt-4 text-navy/70">
                    Expect an atmosphere of understated elegance, where every detail from the lighting to the table setting has been curated to ensure a memorable evening. We recommend arriving early for an aperitif.
                  </span>
                </p>
              </div>

              {/* Location */}
              <div className="space-y-3">
                 <h3 className="text-xs uppercase tracking-widest text-navy/40 font-medium">Location</h3>
                 <div className="flex items-start space-x-3 text-navy/70">
                   <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                   <span className="text-sm font-sans leading-relaxed">
                     123 Heritage Lane, West Village<br/>
                     New York, NY 10014
                   </span>
                 </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-navy text-gold py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-forest transition-colors duration-300">
                Request Reservation
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodView;