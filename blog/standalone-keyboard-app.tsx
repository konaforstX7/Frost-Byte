import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// 最简单的虚拟键盘组件
const SimpleVirtualKeyboard: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  console.log('虚拟键盘组件被渲染');

  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderTop: '1px solid rgba(6, 182, 212, 0.5)',
      padding: '10px',
      zIndex: '1000',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '10px',
        color: 'rgba(148, 163, 184, 0.7)',
        fontSize: '12px'
      }}>Virtual Keyboard</div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        marginBottom: '5px'
      }}>
        <button style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>A</button>
        <button style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>B</button>
        <button style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>C</button>
        <button style={{
          padding: '8px 12px',
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '30%'
        }}>Space</button>
      </div>
    </div>
  );
};

// 主应用组件
const App: React.FC = () => {
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [inputText, setInputText] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
      }}>Standalone Virtual Keyboard Test</h1>

      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1e293b',
            border: '1px solid rgba(6, 182, 212, 0.5)',
            color: 'white',
            borderRadius: '4px',
            outline: 'none'
          }}
          placeholder="Click here to test keyboard"
        />
      </div>

      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <button
          onClick={() => setShowKeyboard(!showKeyboard)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#06b6d4',
            color: '#0f172a',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}
        </button>
      </div>

      <SimpleVirtualKeyboard isVisible={showKeyboard} />
    </div>
  );
};

// 渲染应用
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);