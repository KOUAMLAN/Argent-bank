import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchTransactions } from '../state/transactionsSlice';
import TransactionItem from '../components/TransactionItem';
import { Account } from '../types';

// Données de compte factices pour permettre le rechargement de la page
const mockAccounts: Account[] = [
    { id: '1', title: 'Argent Bank Checking (x3448)', amount: '$48,098.43', description: 'Available Balance' },
    { id: '2', title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { id: '3', title: 'Argent Bank Credit Card (x5201)', amount: '$184.30', description: 'Current Balance' },
];

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const TransactionsPage: React.FC = () => {
    const { accountId } = useParams<{ accountId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { items: transactions, loading } = useSelector((state: RootState) => state.transactions);

    // Essaye d'abord d'obtenir les infos du compte depuis l'état de navigation (plus rapide)
    let account = location.state?.account;
    
    // Si l'état n'est pas disponible (ex: rechargement de page), on le cherche dans nos données factices
    if (!account && accountId) {
        account = mockAccounts.find(acc => acc.id === accountId);
    }

    useEffect(() => {
        if (accountId) {
            dispatch(fetchTransactions(accountId));
        }
    }, [accountId, dispatch]);

    if (!account) {
        // Redirige si l'utilisateur arrive sur la page sans contexte valide
        return (
            <div className="flex-grow bg-white p-8 text-center text-gray-800">
                <p className="mb-4">Could not find account details.</p>
                <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-[#00bc77] text-white rounded hover:bg-green-600">
                    Back to Profile
                </button>
            </div>
        );
    }

    return (
        <div className="flex-grow bg-white p-4 sm:p-8">
            <header className="bg-gray-800 text-white p-6 mb-8 rounded-lg shadow-lg w-full max-w-6xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-xl sm:text-2xl font-normal">{account.title}</h1>
                    <p className="text-4xl sm:text-5xl font-bold">{account.amount}</p>
                    <p className="text-gray-300">{account.description}</p>
                </div>
                <button onClick={() => navigate('/profile')} className="opacity-80 hover:opacity-100">
                    <CloseIcon />
                </button>
            </header>

            <div className="w-full max-w-6xl mx-auto">
                <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-3 font-bold text-left text-gray-800 bg-green-200 border-b-2 border-green-300 rounded-t-lg">
                    <div>Date</div>
                    <div>Description</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Balance</div>
                    <div className="lg:col-span-1"></div>
                </div>

                {loading === 'pending' && <p className="text-center mt-4 text-gray-600">Loading transactions...</p>}
                
                {loading === 'succeeded' && transactions.length > 0 ? (
                     transactions.map(tx => (
                        <TransactionItem key={tx.id} transaction={tx} />
                    ))
                ) : (
                    loading !== 'pending' && <p className="text-center mt-4 text-gray-600">No transactions for this month.</p>
                )}
            </div>
        </div>
    );
};

export default TransactionsPage;