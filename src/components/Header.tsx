import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../state/authSlice';
import { UserIcon, SettingsIcon, PowerIcon } from './icons';

const ArgentBankIconicLogo: React.FC = () => (
  <Link to="/" className="flex items-center" aria-label="Argent Bank Home">
    <span className="text-2xl text-[#00bc77]">
        <span className="font-bold">ARGENT</span><span>BANK</span>
    </span>
  </Link>
);


const Header: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md flex-shrink-0">
      <nav className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        <ArgentBankIconicLogo />
        <div>
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 sm:space-x-4 text-[#5c9978] font-bold">
                <Link to="/profile" className="flex items-center hover:opacity-80" aria-label="View Profile">
                    <span className="hidden sm:inline">{user.userName}</span>
                    <span className="bg-[#5c9978] rounded-full p-1.5 text-white ml-2">
                        <UserIcon className="w-5 h-5" />
                    </span>
                </Link>
                <Link to="/profile" className="hover:opacity-80" aria-label="Settings">
                    <SettingsIcon />
                </Link>
                <button onClick={handleSignOut} className="hover:opacity-80" aria-label="Sign Out">
                    <PowerIcon />
                </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-[#00bc77] font-bold flex items-center gap-1.5">
                <UserIcon />
                <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;