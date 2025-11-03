import React, { useState } from 'react';

interface WelcomeBannerProps {
  userName: string;
  firstName: string;
  lastName: string;
  onUserNameUpdate: (newUserName: string) => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName, firstName, lastName, onUserNameUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editUserName, setEditUserName] = useState(userName);

  const handleSave = () => {
    onUserNameUpdate(editUserName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditUserName(userName);
    setIsEditing(false);
  }

  return (
    <div className="mb-8 text-center text-white">
      {!isEditing ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Welcome back<br />{firstName} {lastName}!
          </h1>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-[#00bc77] text-white font-bold rounded-md hover:bg-green-700 transition-colors"
          >
            Edit User Name
          </button>
        </>
      ) : (
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4">Edit user info</h2>
          <div className="grid grid-cols-1 gap-4 mb-4 text-left">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-white mb-1">User name:</label>
              <input
                id="username"
                type="text"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="firstname" className="block text-lg font-medium text-white mb-1">First name:</label>
              <input
                id="firstname"
                type="text"
                value={firstName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>
             <div>
              <label htmlFor="lastname" className="block text-lg font-medium text-white mb-1">Last name:</label>
              <input
                id="lastname"
                type="text"
                value={lastName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#5c9978] text-white font-bold rounded-md hover:opacity-80 transition-opacity"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white font-bold rounded-md hover:opacity-80 transition-opacity"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;