import React from 'react';

interface HeaderProps {
  onNewPostClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewPostClick }) => {
  return (
    <header className="sticky top-0 z-10 p-4 bg-slate-900/40 backdrop-blur-xl border-b border-cyan-300/20 shadow-lg shadow-cyan-400/10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.7), 0 0 2px rgba(255, 255, 255, 0.8)' }}>
          konaforst Journal
        </h1>
        <button
          onClick={onNewPostClick}
          className="bg-cyan-400/90 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-cyan-300/50 transform hover:-translate-y-px"
        >
          New Post
        </button>
      </div>
    </header>
  );
};

export default Header;