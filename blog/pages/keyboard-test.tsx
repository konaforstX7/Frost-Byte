import React, { useState } from 'react';
import VirtualKeyboard from '../components/VirtualKeyboard';

const KeyboardTest: React.FC = () => {
  const [activeInput, setActiveInput] = useState<'test' | null>('test');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-8">Virtual Keyboard Test</h1>
      
      <div className="w-full max-w-md mb-8">
        <input
          id="test"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setActiveInput('test')}
          className="w-full p-4 bg-slate-800 border border-cyan-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Click here and test the keyboard"
        />
      </div>

      {/* 强制显示虚拟键盘 */}
      <VirtualKeyboard isVisible={true} activeInput={activeInput} />
    </div>
  );
};

export default KeyboardTest;