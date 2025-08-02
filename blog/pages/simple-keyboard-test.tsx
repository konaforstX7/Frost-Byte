import React from 'react';
import SimpleKeyboard from '../components/SimpleKeyboard';

const SimpleKeyboardTest: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-8">Simple Keyboard Test</h1>
      
      <p className="mb-8">This is a test for the simple virtual keyboard component.</p>

      {/* 强制显示简化版虚拟键盘 */}
      <SimpleKeyboard isVisible={true} />
    </div>
  );
};

export default SimpleKeyboardTest;