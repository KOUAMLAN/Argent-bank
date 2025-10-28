import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { loginUser } from '../state/authSlice';

const UserIcon: React.FC = () => (
    <svg
      className="w-5 h-5 text-gray-600"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('ben@hong.com');
    const [password, setPassword] = useState('Password123!');
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

  return (
    <div className="flex-grow bg-[#12002b] p-8 flex flex-col items-center justify-center">
        <section className="bg-white w-full max-w-sm p-8 rounded-lg shadow-xl">
            <div className="flex justify-center mb-4">
                <UserIcon />
            </div>
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h1>
            <form onSubmit={handleSignIn}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="mb-6">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                </div>
                <button
                    className="w-full bg-[#00bc77] hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
                    type="submit"
                    disabled={loading === 'pending'}
                >
                    {loading === 'pending' ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </section>
        <footer className="text-center text-gray-400 py-4 mt-auto">
            <p>Copyright 2020 Argent Bank</p>
        </footer>
    </div>
  );
};

export default SignInPage;