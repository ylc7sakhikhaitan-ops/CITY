import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import BuddyView from './components/BuddyView';
import FoodView from './components/FoodView';
import { ViewState } from './types';

function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView setView={setView} />;
      case ViewState.BUDDY:
        return <BuddyView />;
      case ViewState.FOOD:
        return <FoodView />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-navy font-sans antialiased selection:bg-gold selection:text-white">
      {renderView()}
      <Navigation currentView={currentView} setView={setView} />
    </div>
  );
}

export default App;