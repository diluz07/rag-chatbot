import React from 'react';
import StorePage from './components/StorePage';
import ChatWidget from './components/ChatWidget';
import './index.css';

function App() {
  return (
    <div className="relative w-full h-full">
      {/* Background Page - E-commerce Store */}
      <StorePage />

      {/* Overlay - Customer Support Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
