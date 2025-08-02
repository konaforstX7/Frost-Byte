import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import VirtualKeyboard from './components/VirtualKeyboard';

const MinimalKeyboardTest: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [activeInput, setActiveInput] = useState<'main' | null>('main');
  const [keyboardElement, setKeyboardElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('组件挂载完成');
    // 定期检查键盘元素是否存在
    const interval = setInterval(() => {
      const element = document.querySelector('.virtual-keyboard');
      setKeyboardElement(element as HTMLDivElement | null);
      if (element) {
        console.log('找到键盘元素:', element);
        console.log('键盘元素样式:', window.getComputedStyle(element));
        // 确保键盘元素可见
        element.style.display = 'block';
        element.style.bottom = '0';
        element.style.zIndex = '500';
      } else {
        console.log('未找到键盘元素');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log('组件渲染，键盘可见性:', keyboardVisible);
  console.log('当前键盘元素状态:', keyboardElement ? '存在' : '不存在');

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Minimal Keyboard Test</h1>

      <div className="w-full max-w-md space-y-4 mb-8">
        <input
          id="main"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            setActiveInput('main');
            setKeyboardVisible(true);
            console.log('输入框获得焦点，激活键盘');
          }}
          className="w-full p-3 bg-slate-800 border border-cyan-400/50 rounded-md"
          placeholder="Click here to test keyboard"
        />

        <button
          onClick={() => {
            setKeyboardVisible(!keyboardVisible);
            console.log('切换键盘可见性:', !keyboardVisible);
          }}
          className="w-full py-2 px-4 bg-cyan-500 text-slate-900 font-bold rounded-md"
        >
          {keyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
        </button>

        <div className="mt-4 p-3 bg-slate-800 rounded-md">
          <h3 className="text-lg font-semibold mb-2">调试信息:</h3>
          <p>键盘可见性: {keyboardVisible ? '可见' : '隐藏'}</p>
          <p>活动输入框: {activeInput || '无'}</p>
          <p>键盘元素: {keyboardElement ? '已找到' : '未找到'}</p>
          {keyboardElement && (
            <p>键盘位置: {keyboardElement.getBoundingClientRect().bottom}px from bottom</p>
          )}
        </div>
      </div>

      {/* 使用createPortal渲染虚拟键盘 */}
      {console.log('准备渲染虚拟键盘:', keyboardVisible)}
      {createPortal(
        <VirtualKeyboard isVisible={keyboardVisible} activeInput={activeInput} />,
        document.body
      )}
    </div>
  );
};

export default MinimalKeyboardTest;