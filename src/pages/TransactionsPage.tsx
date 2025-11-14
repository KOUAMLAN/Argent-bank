import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchTransactions } from '../state/transactionsSlice';
import TransactionItem from '../components/TransactionItem';
import { Account } from '../types';
import { CloseIcon } from '../components/icons';

const mockAccounts: Account[] = [
    { id: '1', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
    { id: '2', title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { id: '3', title: 'Argent Bank Credit Card (x5201)', amount: '$184.30', description: 'Current Balance' },
];

const TransactionsPage: React.FC = () => {
    const { accountId } = useParams<{ accountId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { items: transactions, loading } = useAppSelector((state) => state.transactions);

    let account = location.state?.account;
    
    if (!account && accountId) {
        account = mockAccounts.find(acc => acc.id === accountId);
    }

    useEffect(() => {
        if (accountId) {
            dispatch(fetchTransactions(accountId));
        }
    }, [accountId, dispatch]);

    if (!account) {
        return (
            <main className="flex-grow bg-white p-8 text-center text-gray-800">
                <p className="mb-4">Could not find account details.</p>
                <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-[#00bc77] text-white rounded hover:bg-green-600">
                    Back to Profile
                </button>
            </main>
        );
    }

    return (
        <main className="flex-grow bg-white text-gray-800 p-4 sm:p-8">
            <header className="bg-[#424242] text-white p-6 mb-8 rounded-lg shadow-lg w-full max-w-6xl mx-auto flex justify-between items-start">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">{account.title}</h1>
                    <p className="text-4xl sm:text-5xl font-bold">{account.amount}</p>
                    <p className="text-sm">{account.description}</p>
                </div>
                <button onClick={() => navigate('/profile')} className="text-gray-300 hover:text-white" aria-label="Close">
                    <CloseIcon />
                </button>
            </header>

            <section className="w-full max-w-6xl mx-auto">
                <header className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 font-bold text-left text-gray-800 bg-white">
                    <div>Date</div>
                    <div>Description</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Balance</div>
                    <div></div>
                </header>

                <div>
                    {loading === 'pending' && <p className="text-center p-8 text-gray-600">Loading transactions...</p>}
                    
                    {loading === 'succeeded' && transactions.length > 0 ? (
                        transactions.map(tx => (
                            <TransactionItem key={tx.id} transaction={tx} />
                        ))
                    ) : (
                        loading !== 'pending' && <p className="text-center p-8 text-gray-600">No transactions for this month.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default TransactionsPage;