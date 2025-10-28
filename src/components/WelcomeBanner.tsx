import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WelcomeBannerProps {
  firstName: string;
  lastName: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ firstName, lastName }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Welcome back
        <br />
        {`${firstName} ${lastName}!`}
      </h1>
      <button
        onClick={() => navigate('/profile/edit')}
        className="px-6 py-2 bg-[#00bc77] text-white font-bold rounded-md hover:bg-green-600 transition-colors"
      >
        Edit User Name
      </button>
    </div>
  );
};

export default WelcomeBanner;
