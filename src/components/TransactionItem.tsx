import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { Transaction } from '../types';
import { updateTransaction } from '../state/transactionsSlice';

interface TransactionItemProps {
  transaction: Transaction;
}

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-2 cursor-pointer text-gray-600 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);
const ChevronDownIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);
const ChevronUpIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    // Garde de sécurité pour empêcher le composant de planter si la prop est invalide.
    if (!transaction) {
        return null;
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    
    const [category, setCategory] = useState(transaction.category);
    const [note, setNote] = useState(transaction.notes);

    const dispatch: AppDispatch = useDispatch();

    // Cet effet synchronise l'état local si la prop `transaction` change
    useEffect(() => {
        setCategory(transaction.category);
        setNote(transaction.notes);
    }, [transaction]);

    const handleSaveCategory = () => {
        if (category !== transaction.category) {
            dispatch(updateTransaction({ transactionId: transaction.id, data: { category } }));
        }
        setIsEditingCategory(false);
    };
    const handleCancelCategory = () => {
        setCategory(transaction.category); // Réinitialise à la valeur originale
        setIsEditingCategory(false);
    };

    const handleSaveNote = () => {
        if (note !== transaction.notes) {
            dispatch(updateTransaction({ transactionId: transaction.id, data: { notes: note } }));
        }
        setIsEditingNote(false);
    };
    const handleCancelNote = () => {
        setNote(transaction.notes); // Réinitialise à la valeur originale
        setIsEditingNote(false);
    };

    return (
        <div className="bg-white border-b border-gray-200 text-gray-700">
            {/* Vue repliée */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-4 items-center">
                <div className="md:hidden font-bold">Details</div>
                <div className="md:hidden text-right">
                    <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}</button>
                </div>
                <div className="hidden md:block">{transaction.date}</div>
                <div className="hidden md:block">{transaction.description}</div>
                <div className="hidden md:block text-right">${transaction.amount.toFixed(2)}</div>
                <div className="hidden md:block text-right">${transaction.balance.toFixed(2)}</div>
                <div className="hidden md:flex justify-end">
                    <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}</button>
                </div>
            </div>

            {/* Vue dépliée */}
            {isExpanded && (
                <div className="px-4 py-4 bg-green-50 border-t-2 border-green-200">
                    {/* Vue mobile */}
                    <div className="md:hidden space-y-2">
                        <p><strong>Date:</strong> {transaction.date}</p>
                        <p><strong>Description:</strong> {transaction.description}</p>
                        <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                        <p><strong>Balance:</strong> ${transaction.balance.toFixed(2)}</p>
                    </div>
                     <hr className="md:hidden my-2 border-green-200"/>
                    <div className="grid md:grid-cols-3 gap-4 text-gray-800">
                        <div><strong>Transaction Type:</strong> {transaction.type}</div>
                        <div>
                            <strong>Category:</strong>
                            {isEditingCategory ? (
                                <div className="inline-flex items-center ml-2 space-x-2">
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-1 border rounded text-gray-900 bg-white">
                                        <option>Food</option>
                                        <option>Shopping</option>
                                        <option>Utilities</option>
                                        <option>Transport</option>
                                    </select>
                                    <button onClick={handleSaveCategory} className="px-2 py-1 bg-green-600 text-white font-bold text-sm rounded">Save</button>
                                    <button onClick={handleCancelCategory} className="px-2 py-1 bg-gray-500 text-white text-sm rounded">Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span> {category}</span>
                                    <span onClick={() => setIsEditingCategory(true)}><PencilIcon /></span>
                                </>
                            )}
                        </div>
                        <div>
                            <strong>Note:</strong>
                             {isEditingNote ? (
                                <div className="inline-flex items-center ml-2 space-x-2">
                                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="p-1 border rounded text-gray-900 bg-white" />
                                    <button onClick={handleSaveNote} className="ml-2 px-2 py-1 bg-green-600 text-white font-bold text-sm rounded">Save</button>
                                    <button onClick={handleCancelNote} className="px-2 py-1 bg-gray-500 text-white text-sm rounded">Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span> {note || 'N/A'}</span>
                                    <span onClick={() => setIsEditingNote(true)}><PencilIcon /></span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionItem;