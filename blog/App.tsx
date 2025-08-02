import React, { useState } from 'react';
import type { BlogPost } from './types';
import { useBlogPosts } from './hooks/useBlogPosts';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogPostView from './components/BlogPostView';
import CreatePostForm from './components/CreatePostForm';
import Snowfall from './components/Snowfall';
import AuroraBackground from './components/AuroraBackground';
import CursorTrail from './components/CursorTrail';

const App: React.FC = () => {
  
  const { posts, addPost, deletePost, isLoaded } = useBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);


  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  const handleSavePost = (postData: { title: string; content: string }) => {
    addPost(postData);
    setIsCreating(false);
  };
  
  const handleDeletePost = (id: string) => {
    setDeletingPostId(id);
    // Wait for animation to finish before removing the post from state
    setTimeout(() => {
      deletePost(id);
      setSelectedPost(null);
      setDeletingPostId(null);
    }, 500);
  }

  return (
    <div className="min-h-screen text-white">
      <AuroraBackground />
      <CursorTrail />
      <Snowfall />
      <Header onNewPostClick={() => setIsCreating(true)} />

      <main className="container mx-auto p-4 md:p-6 min-h-[calc(100vh-140px)] pb-20 overflow-y-auto">
        {isLoaded ? (
          <>
            {selectedPost ? (
              <BlogPostView 
                post={selectedPost} 
                onBack={handleBackToList} 
                onDelete={handleDeletePost} 
                isDeleting={deletingPostId === selectedPost.id}
              />
            ) : (
              <BlogList posts={posts} onPostSelect={handlePostSelect} />
            )}
          </>
        ) : (
          <div className="text-center py-20 text-xl text-slate-300">Loading posts...</div>
        )}
      </main>

      <CreatePostForm
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSave={handleSavePost}
      />
      <Footer />
    </div>
  );
};

export default App;
