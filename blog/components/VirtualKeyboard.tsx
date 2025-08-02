import React, { useState, useEffect } from 'react';

interface VirtualKeyboardProps {
  isVisible: boolean;
  activeInput: 'title' | 'content' | null;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ isVisible, activeInput }) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isUpperCase, setIsUpperCase] = useState(false);

  // 键盘布局配置
  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
    ['Shift', ' ', 'Backspace', 'Enter']
  ];

  // 切换大小写
  const toggleCase = () => {
    setIsUpperCase(!isUpperCase);
  };

  // 模拟按键点击
  const handleKeyClick = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 200);

    if (activeInput) {
      // 找到对应的输入框并更新值
      const inputElement = document.getElementById(activeInput);
      if (inputElement) {
        const currentValue = (inputElement as HTMLInputElement | HTMLTextAreaElement).value;
        let newValue = currentValue;

        if (key === ' ') {
          newValue += ' ';
        } else if (key === 'Backspace') {
          newValue = currentValue.slice(0, -1);
        } else if (key === 'Enter') {
          newValue += '\n';
        } else if (key === 'Shift') {
          // 不处理，由toggleCase处理
          return;
        } else {
          newValue += isUpperCase && /^[a-z]$/.test(key) ? key.toUpperCase() : key;
        }

        // 更新输入框的值
        (inputElement as HTMLInputElement | HTMLTextAreaElement).value = newValue;

        // 触发input和change事件
        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        inputElement.dispatchEvent(inputEvent);
        inputElement.dispatchEvent(changeEvent);
      }
    }
  };

  // 计算按键宽度
  const getKeyWidth = (key: string) => {
    if (key === ' ') return '50%';
    if (key === 'Backspace' || key === 'Enter') return '15%';
    if (key === 'Shift') return '15%';
    return '8%';
  };

  // 始终渲染键盘，不考虑isVisible状态
// if (!isVisible) return null;

  // 调试信息
  useEffect(() => {
    console.log('虚拟键盘渲染状态:', isVisible ? '可见' : '隐藏');
    if (isVisible) {
      console.log('活动输入框:', activeInput);
      // 强制显示键盘
      const keyboardElement = document.querySelector('.virtual-keyboard');
      if (keyboardElement) {
        keyboardElement.style.display = 'block';
        console.log('键盘元素已强制显示');
      }
    }
  }, [isVisible, activeInput]);

  return (
    <div className="virtual-keyboard fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-cyan-400/50 p-4 shadow-2xl shadow-cyan-400/30 z-500" style={{ display: 'block' }}>
      <div className="text-center mb-2 text-slate-400 text-sm">Virtual Keyboard</div>
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => key === 'Shift' ? toggleCase() : handleKeyClick(key)}
              className={`py-3 rounded-md transition-all duration-200 focus:outline-none ${pressedKey === key ? 'scale-95 bg-cyan-500/70 text-slate-900 font-bold' : key === 'Shift' && isUpperCase ? 'bg-cyan-600/40 text-cyan-300' : 'bg-slate-800/60 hover:bg-slate-700 text-white'}`}
              style={{ width: getKeyWidth(key) }}
            >
              {key === 'Shift' ? '⇧' : (isUpperCase && /^[a-z]$/.test(key) ? key.toUpperCase() : key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;