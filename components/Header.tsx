
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white">
            ImperativeUI
            </h1>
            <p className="text-sm text-gray-400">Generate React UIs from JSON with AI</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
