import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    setMounted(true);
    // In a real app, you would check authentication status here
    // For example: const token = localStorage.getItem('token');
    // setIsAuthenticated(!!token);
  }, []);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (mounted && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, mounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      // In a real app, you would call your registration API here
      // For example:
      // fetch('/api/register', { ... })
      //   .then(response => response.json())
      //   .then(data => { ... })
      //   .catch(err => { ... });

      // For demonstration purposes, we'll just check if fields are filled
      if (!username || !email || !password) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      // Simulate successful registration
      setLoading(false);
      alert('Registration successful! You can now sign in.');
      navigate('/auth');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/30 animate-[fadeIn_0.5s_ease-in-out]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Join our community of writers
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 text-red-400 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?
              <button
                onClick={() => navigate('/auth')}
                className="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}