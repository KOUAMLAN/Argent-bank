import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../state/store';
import { updateUserProfile } from '../state/authSlice';
import WelcomeBanner from '../components/WelcomeBanner';
import AccountCard from '../components/AccountCard';
import { Account } from '../types';

const mockAccounts: Account[] = [
    { id: '1', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available balance' },
    { id: '2', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available balance' },
    { id: '3', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available balance' },
];

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    if (!user) {
        return <div className="flex-grow p-8 flex items-center justify-center text-white text-xl">Loading profile...</div>;
    }

    const handleUserNameUpdate = (newUserName: string) => {
        dispatch(updateUserProfile({ userName: newUserName }));
    };

    return (
        <div className="flex-grow p-8">
            <WelcomeBanner 
                userName={user.userName}
                firstName={user.firstName} 
                lastName={user.lastName}
                onUserNameUpdate={handleUserNameUpdate}
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