import React, { useEffect, useMemo } from 'react';

const AuroraBackground: React.FC = () => {
  const starShadows = useMemo(() => {
    let shadow = '';
    for (let i = 0; i < 700; i++) {
      shadow += `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF,`;
    }
    return shadow.slice(0, -1);
  }, []);

  useEffect(() => {
    document.body.style.setProperty('--star-shadows', starShadows);
  }, [starShadows]);

  return (
    <div className="aurora-container">
      <div className="aurora-layer"></div>
      <div className="aurora-layer"></div>
      <div className="aurora-layer"></div>
      <div className="stars"></div>
    </div>
  );
};

export default AuroraBackground;
