import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateUserProfile } from '../state/authSlice';
import WelcomeBanner from '../components/WelcomeBanner';
import AccountCard from '../components/AccountCard';
import { Account } from '../types';

const mockAccounts: Account[] = [
    { id: '1', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
    { id: '2', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
    { id: '3', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
];

const ProfilePage: React.FC = () => {
    const { user, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    if (!user) {
        return <main className="flex-grow bg-white p-8 flex items-center justify-center text-gray-800 text-xl">Loading profile...</main>;
    }

    const handleUserNameUpdate = (userName: string) => {
        dispatch(updateUserProfile({ userName }));
    };

    return (
        <main className="flex-grow bg-white p-8">
            <WelcomeBanner
                firstName={user.firstName}
                lastName={user.lastName}
                userName={user.userName}
                onUserNameUpdate={handleUserNameUpdate}
                isLoading={loading === 'pending'}
            />
            <h2 className="sr-only">Accounts</h2>
            {mockAccounts.map((account, index) => (
                <AccountCard 
                    key={`${account.id}-${index}`}
                    account={account}
                />
            ))}
        </main>
    );
};

export default ProfilePage;