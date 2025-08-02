import React from 'react';

interface SimpleKeyboardProps {
  isVisible: boolean;
}

const SimpleKeyboard: React.FC<SimpleKeyboardProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  console.log('渲染简化版虚拟键盘');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 border-t border-white/20 z-50">
      <div className="text-center mb-2">Simple Virtual Keyboard</div>
      <div className="flex justify-center gap-2 mb-2">
        <button className="py-2 px-4 bg-white/10 rounded">A</button>
        <button className="py-2 px-4 bg-white/10 rounded">B</button>
        <button className="py-2 px-4 bg-white/10 rounded">C</button>
        <button className="py-2 px-4 bg-white/10 rounded">Space</button>
      </div>
    </div>
  );
};

export default SimpleKeyboard;