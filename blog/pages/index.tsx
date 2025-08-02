import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBlogPosts } from '../hooks/useBlogPosts';
import Navbar from '../components/Navbar';
import AuroraBackground from '../components/AuroraBackground';
import CursorTrail from '../components/CursorTrail';
import Snowfall from '../components/Snowfall';
import Footer from '../components/Footer';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const { posts, addPost, deletePost, isLoaded, error, setError } = useBlogPosts();
  const navigate = useNavigate();
  const [newPostTitle, setNewPostTitle] = React.useState('');
  const [newPostContent, setNewPostContent] = React.useState('');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState('');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostContent.trim()) {
      await addPost({ title: newPostTitle, content: newPostContent });
      setNewPostTitle('');
      setNewPostContent('');
      setShowAddForm(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      setDeleteError('');
    } catch (err) {
      if (err instanceof Error && err.message.includes('403')) {
        setDeleteError('Sorry, It\'s not created by your account.');
      } else {
        setDeleteError(err instanceof Error ? err.message : 'Failed to delete post');
      }
    }
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AuroraBackground />
      <CursorTrail />
      <Snowfall />
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showAddForm ? 'Cancel' : 'Add Post'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-md shadow-md mb-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-white">Add New Post</h2>
            <form onSubmit={handleAddPost}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                <textarea
                  id="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder="Enter post content"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Post
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="bg-amber-900/30 border border-amber-500/30 text-amber-300 px-4 py-3 rounded mb-6 flex items-center justify-between animate-fade-in">
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" /></svg> {error}</p>
            <button onClick={() => setError('')} className="text-amber-400 hover:text-amber-200 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
          </div>
        )}

        {deleteError && (
          <div className="bg-amber-900/30 border border-amber-500/30 text-amber-300 px-4 py-3 rounded mb-6 flex items-center justify-between animate-fade-in">
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" /></svg> {deleteError}</p>
            <button onClick={() => setDeleteError('')} className="text-amber-400 hover:text-amber-200 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
          </div>
        )}

        {posts.length === 0 && !showAddForm ? (
          <div className="text-center py-12 bg-gray-900/80 backdrop-blur-sm rounded-md shadow-sm border border-gray-700">
            <p className="text-gray-300">No blog posts yet.</p>
            <p className="text-slate-400">"The world we witness is not the objective truth, but a projection born from our internal state."</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-md shadow-sm border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-white">{post.title}</h2>
                  <span className="text-xs text-gray-500">By {post.author?.username || 'Unknown'}</span>
                </div>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}