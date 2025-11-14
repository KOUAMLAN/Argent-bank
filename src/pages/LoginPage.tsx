import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginUser } from '../state/authSlice';
import { UserIcon } from '../components/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('tony@stark.com');
  const [password, setPassword] = useState('P@ssword123!');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#12002b] flex items-center justify-center p-4">
        <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <div className="text-center mb-6 flex justify-center">
              <UserIcon />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading === 'pending'}
              className="w-full bg-[#00bc77] text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400"
            >
              {loading === 'pending' ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;