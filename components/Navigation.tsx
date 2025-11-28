import React from 'react';
import { Home, Users, Wine } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItemClass = (view: ViewState) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300 ${
      currentView === view ? 'text-gold' : 'text-cream/60 hover:text-cream/80'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-navy border-t border-gold/20 shadow-2xl z-50">
      <div className="flex justify-around items-center h-full max-w-md mx-auto px-6">
        
        <button 
          onClick={() => setView(ViewState.HOME)}
          className={navItemClass(ViewState.HOME)}
        >
          <Home strokeWidth={1.5} size={24} />
          <span className="text-[10px] uppercase tracking-widest font-sans font-medium">Home</span>
        </button>

        <button 
          onClick={() => setView(ViewState.BUDDY)}
          className={navItemClass(ViewState.BUDDY)}
        >
          <Users strokeWidth={1.5} size={24} />
          <span className="text-[10px] uppercase tracking-widest font-sans font-medium">Network</span>
        </button>

        <button 
          onClick={() => setView(ViewState.FOOD)}
          className={navItemClass(ViewState.FOOD)}
        >
          <Wine strokeWidth={1.5} size={24} />
          <span className="text-[10px] uppercase tracking-widest font-sans font-medium">Dining</span>
        </button>

      </div>
    </nav>
  );
};

export default Navigation;