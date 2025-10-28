import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../state/store';
import { updateUserProfile } from '../state/authSlice';
import AccountCard from '../components/AccountCard';
import { Account } from '../types';

// Les mêmes données de compte que sur la page de profil, pour l'affichage
const mockAccounts: Account[] = [
    { id: '1', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
    { id: '2', title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { id: '3', title: 'Argent Bank Credit Card (x5201)', amount: '$184.30', description: 'Current Balance' },
];

const EditProfilePage: React.FC = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [editUserName, setEditUserName] = useState(user?.userName || '');
    
    useEffect(() => {
        if (user) {
            setEditUserName(user.userName);
        }
    }, [user]);

    if (!user) {
        return <div className="text-center p-8">Loading...</div>;
    }

    const handleSave = () => {
        dispatch(updateUserProfile({ userName: editUserName }))
            .unwrap()
            .then(() => {
                navigate('/profile');
            });
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className="bg-white flex-grow p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                 <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Edit user info</h1>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow mb-8 border border-gray-200">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                        <label htmlFor="username" className="block text-left font-bold mb-1">User name:</label>
                        <input
                            type="text"
                            id="username"
                            value={editUserName}
                            onChange={(e) => setEditUserName(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                        />
                        </div>
                        <div>
                        <label className="block text-left font-bold mb-1">First name:</label>
                        <input
                            type="text"
                            value={user.firstName}
                            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 w-full cursor-not-allowed"
                            disabled
                        />
                        </div>
                        <div>
                        <label className="block text-left font-bold mb-1">Last name:</label>
                        <input
                            type="text"
                            value={user.lastName}
                            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 w-full cursor-not-allowed"
                            disabled
                        />
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                        onClick={handleSave}
                        disabled={loading === 'pending'}
                        className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                        {loading === 'pending' ? 'Saving...' : 'Save'}
                        </button>
                        <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-400 transition-colors"
                        >
                        Cancel
                        </button>
                    </div>
                </div>

                <h2 className="sr-only">Accounts</h2>
                {mockAccounts.map(account => (
                    // Ces cartes ne sont pas cliquables ici pour éviter une navigation confuse
                    <div key={account.id}>
                         <AccountCard 
                            title={account.title}
                            amount={account.amount}
                            description={account.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditProfilePage;