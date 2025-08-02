import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import VirtualKeyboard from '../components/VirtualKeyboard';

const KeyboardTestVite: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeInput, setActiveInput] = useState<'title' | 'content' | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Virtual Keyboard Test (Vite)</h1>

      <div className="w-full max-w-2xl space-y-4 mb-8">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => {
              setActiveInput('title');
              setKeyboardVisible(true);
            }}
            className="w-full p-3 bg-slate-800 border border-cyan-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Click here to test keyboard"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => {
              setActiveInput('content');
              setKeyboardVisible(true);
            }}
            className="w-full p-3 bg-slate-800 border border-cyan-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 h-32"
            placeholder="Click here to test keyboard"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setKeyboardVisible(!keyboardVisible)}
            className="py-2 px-4 bg-cyan-500 text-slate-900 font-bold rounded-md hover:bg-cyan-400 transition"
          >
            {keyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
          </button>
          <button
            onClick={() => {
              // 加载并执行测试脚本
              const script = document.createElement('script');
              script.src = '/test-keyboard.js';
              script.onload = () => {
                console.log('测试脚本加载完成');
              };
              script.onerror = (error) => {
                console.error('测试脚本加载失败:', error);
              };
              document.body.appendChild(script);
            }}
            className="py-2 px-4 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-400 transition"
          >
            Run Keyboard Test
          </button>
        </div>
      </div>

      {/* 使用createPortal渲染虚拟键盘 */}
      {createPortal(
        <VirtualKeyboard isVisible={keyboardVisible} activeInput={activeInput} />,
        document.body
      )}
    </div>
  );
};

export default KeyboardTestVite;