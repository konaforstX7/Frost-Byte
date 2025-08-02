
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const size = Math.random() * 2.5 + 1;
      const animationType = Math.ceil(Math.random() * 3); // 1, 2, or 3
      const duration = Math.random() * 15 + 10; // 10s to 25s
      const delay = Math.random() * 20;

      const style: React.CSSProperties = {
        left: `${Math.random() * 100}vw`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0, // Set by animation
        animationName: `snowfall-${animationType}`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      };
      return <div key={i} className="snowflake" style={style}></div>;
    });
  }, []);

  return <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">{snowflakes}</div>;
};

export default Snowfall;
