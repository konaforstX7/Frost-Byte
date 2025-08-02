
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 p-4 text-center text-slate-400 text-sm">
      <p>&copy; {new Date().getFullYear()} Konaforst Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
