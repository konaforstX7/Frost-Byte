
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import VirtualKeyboard from './VirtualKeyboard';

interface CreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: { title: string; content: string }) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  // 初始化为true进行测试
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [activeInput, setActiveInput] = useState<'title' | 'content' | null>(null);

  // 当表单打开时显示键盘
  // 调试键盘可见性状态
  useEffect(() => {
    console.log('表单状态:', isOpen ? '打开' : '关闭');
    console.log('键盘可见性状态:', keyboardVisible);
  }, [isOpen, keyboardVisible]);

  // 确保表单打开时键盘可见
  useEffect(() => {
    if (isOpen) {
      console.log('表单已打开，强制显示键盘');
      setKeyboardVisible(true);
    } else {
      console.log('表单已关闭，隐藏键盘');
      setKeyboardVisible(false);
    }
  }, [isOpen]);

  // 调试状态
  useEffect(() => {
    console.log('键盘可见性:', keyboardVisible);
  }, [keyboardVisible]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }
    onSave({ title, content });
    setTitle('');
    setContent('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-cyan-400/50 rounded-lg shadow-2xl shadow-cyan-400/30 w-full max-w-2xl text-white animate-modal-in transform transition-transform duration-300 hover:scale-[1.01] max-h-[80vh] overflow-y-auto pb-24">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Create New Post</h2>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-slate-300 mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setActiveInput('title')}
              onBlur={() => setActiveInput(null)}
              className="w-full p-2 bg-slate-800/60 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition placeholder-slate-400"
              placeholder="Enter your post title"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-slate-300 mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setActiveInput('content')}
              onBlur={() => setActiveInput(null)}
              rows={10}
              className="w-full p-2 bg-slate-800/60 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition placeholder-slate-400"
              placeholder="Write your blog post here..."
            />
          </div>
          <div className="flex justify-end gap-4 mb-4">
            <button
              type="button"
              onClick={() => setKeyboardVisible(!keyboardVisible)}
              className="py-2 px-4 bg-purple-600 rounded-md hover:bg-purple-500 transition"
            >
              {keyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-slate-600 rounded-md hover:bg-slate-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-cyan-500 text-slate-900 font-bold rounded-md hover:bg-cyan-400 transition"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
      {/* 在模态框内部添加测试元素 */}
          <div className="fixed bottom-0 left-0 right-0 bg-red-500/90 text-white p-4 z-50">
            <p>测试元素 - 应该可见</p>
          </div>
          
          {/* 直接嵌入简单键盘HTML */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-cyan-400/50 p-4 z-50">
            <div className="text-center mb-2 text-slate-400 text-sm">Embedded Keyboard</div>
            <div className="flex justify-center gap-2 mb-2">
              <button className="py-2 px-4 bg-slate-800/60 hover:bg-slate-700 text-white rounded-md">A</button>
              <button className="py-2 px-4 bg-slate-800/60 hover:bg-slate-700 text-white rounded-md">B</button>
              <button className="py-2 px-4 bg-slate-800/60 hover:bg-slate-700 text-white rounded-md">C</button>
              <button className="py-2 px-4 bg-slate-800/60 hover:bg-slate-700 text-white rounded-md" style={{width: '50%'}}>Space</button>
            </div>
          </div>

      {/* 使用createPortal渲染虚拟键盘 */}
      {console.log('准备渲染虚拟键盘:', keyboardVisible)}
      {createPortal(
        <VirtualKeyboard isVisible={keyboardVisible} activeInput={activeInput} />,
        document.body
      )}

      {/* 调试按钮 */}
      <button
        onClick={() => {
          console.log('手动切换键盘可见性');
          setKeyboardVisible(!keyboardVisible);
        }}
        className="fixed bottom-4 right-4 z-500 bg-red-500 text-white p-2 rounded-full"
      >
        {keyboardVisible ? '隐藏' : '显示'}键盘
      </button>
    </div>
  );
};

export default CreatePostForm;
