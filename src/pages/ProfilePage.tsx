import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../state/store';
import WelcomeBanner from '../components/WelcomeBanner';
import AccountCard from '../components/AccountCard';
import { Account } from '../types';

const mockAccounts: Account[] = [
    { id: '1', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
    { id: '2', title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { id: '3', title: 'Argent Bank Credit Card (x5201)', amount: '$184.30', description: 'Current Balance' },
];

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) {
        // État de chargement pendant la récupération du profil
        return <div className="flex-grow bg-white p-8 flex items-center justify-center text-gray-800 text-xl">Loading profile...</div>;
    }

    return (
        <div className="bg-white text-gray-800 flex-grow p-8">
            <WelcomeBanner 
                firstName={user.firstName} 
                lastName={user.lastName}
            />
            <h2 className="sr-only">Accounts</h2>
            {mockAccounts.map(account => (
                <Link to={`/account/${account.id}/transactions`} key={account.id} state={{ account }}>
                    <AccountCard 
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                    />
                </Link>
            ))}
        </div>
    );
};

export default ProfilePage;