import React, { useEffect } from 'react';

const CursorTrail: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      document.body.appendChild(sparkle);

      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      
      // Randomize movement for a more natural effect
      const randomX = (Math.random() - 0.5) * 40;
      const randomY = (Math.random() - 0.5) * 40;
      sparkle.style.setProperty('--x', `${randomX}px`);
      sparkle.style.setProperty('--y', `${randomY}px`);

      setTimeout(() => {
        sparkle.remove();
      }, 700); // Must be same as animation duration
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null; // This component does not render anything itself
};

export default CursorTrail;
