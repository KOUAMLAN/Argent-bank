import React, { useState, useEffect } from 'react';

interface WelcomeBannerProps {
  firstName: string;
  lastName: string;
  userName: string;
  onUserNameUpdate: (newUserName: string) => void;
  isLoading: boolean;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ firstName, lastName, userName, onUserNameUpdate, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);

  useEffect(() => {
    setNewUserName(userName);
  }, [userName]);

  const handleSave = () => {
    onUserNameUpdate(newUserName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewUserName(userName);
    setIsEditing(false);
  };

  return (
    <div className="mb-8">
      {!isEditing ? (
        <div className="text-center text-gray-800 p-4">
          <h1 className="text-3xl font-bold">
            Welcome back<br />{firstName} {lastName}!
          </h1>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-6 py-2 bg-[#00bc77] text-white font-bold rounded-md hover:bg-green-600 transition-colors"
          >
            Edit Name
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Edit user info
          </h1>
          <div className="max-w-md mx-auto">
             <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-3 items-center mb-4">
                <label htmlFor="username" className="block font-medium text-right">User name:</label>
                <input
                    id="username"
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label htmlFor="firstname" className="block font-medium text-right">First name:</label>
                <input
                    id="firstname"
                    type="text"
                    value={firstName}
                    disabled
                    className="px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
                />
                <label htmlFor="lastname" className="block font-medium text-right">Last name:</label>
                <input
                    id="lastname"
                    type="text"
                    value={lastName}
                    disabled
                    className="px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
                />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="px-8 py-2 bg-[#00bc77] text-white font-bold rounded-md hover:bg-green-600 transition-opacity disabled:bg-gray-400"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;