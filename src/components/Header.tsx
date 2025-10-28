import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { logout } from '../state/authSlice';
import ArgentBankLogo from '../assets/img/logo.svg?react';

// Nouveau logo iconique pour la vue connectée, correspondant à la maquette.
const ArgentBankIconicLogo: React.FC = () => (
  <span className="flex items-center" aria-label="Argent Bank">
    <div className="bg-[#00bc77] rounded-md p-1 mr-2 flex items-center justify-center">
        {/* SVG mis à jour pour correspondre à l'icône de coffre-fort de la maquette */}
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
            <circle cx="12" cy="10" r="2" stroke="white" strokeWidth="1.5"/>
            <path d="M12 12V16" stroke="white" strokeWidth="1.5"/>
            <path d="M10 16H14" stroke="white" strokeWidth="1.5"/>
            <path d="M12 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 20V19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M20 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M5 12H4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17.6568 6.34315L16.9497 7.05025" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.05025 16.9497L6.34315 17.6568" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17.6568 17.6568L16.9497 16.9497" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7.05025 7.05025L6.34315 6.34315" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    </div>
    <span className="text-[#00bc77] text-xl font-medium">Argent Bank</span>
  </span>
);


const UserIcon: React.FC = () => (
  <svg
    className="w-5 h-5"
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

const SettingsIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.07 2.564a1.5 1.5 0 011.86 0l.07.055a1.5 1.5 0 001.272.518l.128-.016a1.5 1.5 0 011.62.72l.06.108a1.5 1.5 0 00.934 1.013l.12.044a1.5 1.5 0 01.954 1.432l-.001.134a1.5 1.5 0 00.518 1.272l.055.07a1.5 1.5 0 010 1.86l-.055.07a1.5 1.5 0 00-.518 1.272l.001.128a1.5 1.5 0 01-.72 1.62l-.108.06a1.5 1.5 0 00-1.013.934l-.044.12a1.5 1.5 0 01-1.432.954l-.134-.001a1.5 1.5 0 00-1.272.518l-.07.055a1.5 1.5 0 01-1.86 0l-.07-.055a1.5 1.5 0 00-1.272-.518l-.128.016a1.5 1.5 0 01-1.62-.72l-.06-.108a1.5 1.5 0 00-.934-1.013l-.12-.044a1.5 1.5 0 01-.954-1.432l.001-.134a1.5 1.5 0 00-.518-1.272l-.055-.07a1.5 1.5 0 010-1.86l.055-.07a1.5 1.5 0 00.518-1.272l-.001-.128a1.5 1.5 0 01.72-1.62l.108-.06a1.5 1.5 0 001.013-.934l.044-.12a1.5 1.5 0 011.432-.954l.134.001a1.5 1.5 0 001.272-.518l.07-.055zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    </svg>
);

const PowerIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
    </svg>
);

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md flex-shrink-0">
      <nav className="container mx-auto px-6 py-1 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {isAuthenticated && user ? <ArgentBankIconicLogo /> : <ArgentBankLogo className="h-8" />}
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4 text-[#00bc77] font-bold">
                <span>{user.userName}</span>
                <Link to="/profile" className="flex items-center hover:opacity-80">
                    <span className="bg-[#00bc77] rounded-full p-1 text-white">
                        <UserIcon />
                    </span>
                </Link>
                <Link to="/profile/edit" className="hover:opacity-80">
                    <SettingsIcon />
                </Link>
                <button onClick={handleSignOut} className="hover:opacity-80">
                    <PowerIcon />
                </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-[#00bc77] font-bold flex items-center gap-1">
                <UserIcon />
                Se connecter
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
