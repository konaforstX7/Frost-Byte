import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack, onDelete, isDeleting }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className={`bg-black/30 backdrop-blur-xl border border-cyan-400/20 rounded-lg p-6 md:p-8 shadow-2xl shadow-cyan-400/10 ${isDeleting ? 'animate-shatter-out' : 'animate-modal-in'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-200" style={{ textShadow: '0 0 8px rgba(0, 255, 255, 0.5)' }}>{post.title}</h2>
          <p className="text-sm text-slate-400 mt-2">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
         <button onClick={onBack} className="text-cyan-400 hover:text-white transition-colors duration-200 self-start text-sm whitespace-nowrap">
          &larr; Back to list
        </button>
      </div>

      <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-cyan-300 max-w-none text-lg leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700 flex justify-end">
         <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600/80 text-white font-bold py-2 px-4 rounded-md hover:bg-red-500 transition-all duration-300 shadow-md hover:shadow-red-500/40 disabled:bg-red-800/50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </button>
      </div>
    </div>
  );
};

export default BlogPostView;