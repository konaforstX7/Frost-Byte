import React from 'react';
import type { BlogPost } from '../types';
import React, { useState } from 'react';

interface BlogListProps {
  posts: BlogPost[];
  onPostSelect: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onPostSelect }) => {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-slate-300">No posts yet.</h2>
        <p className="text-slate-400">"The world we witness is not the objective truth, but a projection born from our internal state."</p>
      </div>
    );
  }

  const togglePostExpand = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <div
          key={post.id}
          onClick={() => onPostSelect(post)}
          className="bg-black/20 backdrop-blur-lg border border-cyan-400/20 rounded-lg p-6 cursor-pointer group transition-all duration-300 hover:border-cyan-300/70 hover:bg-black/40 hover:shadow-2xl hover:shadow-cyan-300/30 transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold text-cyan-300 truncate mb-2 transition-colors group-hover:text-cyan-200">{post.title}</h3>
          <div className="relative">
            <p className={`text-slate-400 transition-all duration-300 ${expandedPostId === post.id ? 'max-h-[500px]' : 'h-24 overflow-hidden'}`}>
              {post.content}
            </p>
            {post.content.length > 100 && (
              <button
                onClick={(e) => togglePostExpand(post.id, e)}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {expandedPostId === post.id ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-4">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;