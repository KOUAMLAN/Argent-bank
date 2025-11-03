import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { logout } from '../state/authSlice';
import { UserIcon, SettingsIcon, PowerIcon } from './icons';
import argentBankLogo from '../assets/img/argentBankLogo.png';

const ArgentBankStandardLogo: React.FC = () => (
  <Link to="/" className="flex items-center flex-shrink-0">
    <img className="h-10" src={argentBankLogo} alt="Argent Bank Logo" />
    <h1 className="sr-only">Argent Bank</h1>
  </Link>
);

const ArgentBankIconicLogo: React.FC = () => (
  <Link to="/" className="flex items-center" aria-label="Argent Bank Home">
    <div className="bg-[#5c9978] rounded-md p-1.5 mr-2 flex items-center justify-center">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Safe dial: A compass/starburst design, matching the image. */}
            <g transform="translate(-2, 0)" stroke="white" strokeWidth="1.5">
                <circle cx="7" cy="12" r="5" fill="none"/>
                {/* 8 rays forming a starburst, with a central gap */}
                <path d="M7,10 L7,7.5"/>
                <path d="M7,14 L7,16.5"/>
                <path d="M9,12 L11.5,12"/>
                <path d="M5,12 L2.5,12"/>
                <path d="M9.1,10.1 L10.6,8.6"/>
                <path d="M4.9,13.9 L3.4,15.4"/>
                <path d="M9.1,13.9 L10.6,15.4"/>
                <path d="M4.9,10.1 L3.4,8.6"/>
            </g>
            
            {/* Key: Tilted right, separated, with a thicker arm. */}
            <g transform="translate(19 12) rotate(35)" fill="white">
                <circle cy="-2.5" r="3.2" />
                <path d="M-1.4 1.7 H1.4 L1.7 11 H-1.7 Z" />
            </g>
        </svg>
    </div>
    <span className="text-[#5c9978] text-xl font-medium">Argent Bank</span>
  </Link>
);


const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md flex-shrink-0">
      <nav className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        {isAuthenticated && user ? <ArgentBankIconicLogo /> : <ArgentBankStandardLogo />}
        
        <div>
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 sm:space-x-4 text-[#5c9978] font-bold">
                <span className="hidden sm:inline">{user.userName}</span>
                <Link to="/profile" className="flex items-center hover:opacity-80" aria-label="View Profile">
                    <span className="bg-[#5c9978] rounded-full p-1.5 text-white">
                        <UserIcon />
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
                <span>Se connecter</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;