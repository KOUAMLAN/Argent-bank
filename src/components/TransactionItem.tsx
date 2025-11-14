import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { Transaction } from '../types';
import { updateTransaction } from '../state/transactionsSlice';
import { PencilIcon, ChevronDownIcon, ChevronUpIcon } from './icons';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    if (!transaction) {
        return null;
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [category, setCategory] = useState(transaction.category);
    const [note, setNote] = useState(transaction.notes);

    const dispatch = useAppDispatch();

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
        setCategory(transaction.category);
        setIsEditingCategory(false);
    };

    const handleSaveNote = () => {
        if (note !== transaction.notes) {
            dispatch(updateTransaction({ transactionId: transaction.id, data: { notes: note } }));
        }
        setIsEditingNote(false);
    };

    const handleCancelNote = () => {
        setNote(transaction.notes);
        setIsEditingNote(false);
    };

    const formattedAmount = `$${transaction.amount.toFixed(2)}`;
    const formattedBalance = `$${transaction.balance.toFixed(2)}`;

    return (
        <div className="mb-2 rounded-md overflow-hidden shadow last:mb-0">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 py-4 items-center bg-[#00bc77] text-white">
                <div className="md:hidden">
                    <p className="font-bold">{transaction.description}</p>
                    <p>{formattedAmount}</p>
                </div>
                 <div className="md:hidden text-right">
                    <button onClick={() => setIsExpanded(!isExpanded)} aria-label="Toggle details" className="text-white">{isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}</button>
                </div>

                <div className="hidden md:block">{transaction.date}</div>
                <div className="hidden md:block">{transaction.description}</div>
                <div className="hidden md:block text-right">{formattedAmount}</div>
                <div className="hidden md:block text-right">{formattedBalance}</div>
                <div className="hidden md:flex justify-center">
                    <button onClick={() => setIsExpanded(!isExpanded)} aria-label="Toggle details" className="text-white">{isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}</button>
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 py-4 bg-[#2c8e59] text-white">
                    <div className="md:hidden space-y-2 mb-4 pt-4 border-t border-white/30">
                        <p><strong>Date:</strong> {transaction.date}</p>
                        <p><strong>Balance:</strong> {formattedBalance}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-y-2 gap-x-4">
                        <div><strong>Transaction Type:</strong> {transaction.type}</div>
                        <div className="flex items-center gap-1">
                            <strong>Category:</strong>
                            {isEditingCategory ? (
                                <div className="inline-flex items-center ml-2 space-x-2">
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-1 border rounded text-gray-900 bg-white">
                                        <option>Food</option>
                                        <option>Shopping</option>
                                        <option>Utilities</option>
                                        <option>Transport</option>
                                        <option>Income</option>
                                    </select>
                                    <button onClick={handleSaveCategory} className="px-2 py-1 bg-green-600 text-white font-bold text-sm rounded">Save</button>
                                    <button onClick={handleCancelCategory} className="px-2 py-1 bg-gray-500 text-white text-sm rounded">Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span className="ml-2">{category}</span>
                                    <button onClick={() => setIsEditingCategory(true)} aria-label="Edit category"><PencilIcon /></button>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <strong>Note:</strong>
                             {isEditingNote ? (
                                <div className="inline-flex items-center ml-2 space-x-2">
                                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="p-1 border rounded text-gray-900 bg-white" />
                                    <button onClick={handleSaveNote} className="ml-2 px-2 py-1 bg-green-600 text-white font-bold text-sm rounded">Save</button>
                                    <button onClick={handleCancelNote} className="px-2 py-1 bg-gray-500 text-white text-sm rounded">Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span className="ml-2">{note || ''}</span>
                                    <button onClick={() => setIsEditingNote(true)} aria-label="Edit note"><PencilIcon /></button>
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