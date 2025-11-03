import React, { useState } from 'react';
import { Transaction } from '../types';
import { PencilIcon, ChevronDownIcon } from './icons';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState(transaction.category);
  const [notes, setNotes] = useState(transaction.notes);

  return (
    <div className="bg-white">
      {/* Collapsed View */}
      <div className="p-4 grid md:grid-cols-5 grid-cols-2 gap-4 text-left items-center border-b border-gray-200">
        <div className="font-bold md:font-normal"><span className="md:hidden font-bold mr-2">Date:</span>{transaction.date}</div>
        <div><span className="md:hidden font-bold mr-2">Description:</span>{transaction.description}</div>
        <div className="text-left md:text-right"><span className="md:hidden font-bold mr-2">Amount:</span>${transaction.amount.toFixed(2)}</div>
        <div className="text-left md:text-right"><span className="md:hidden font-bold mr-2">Balance:</span>${transaction.balance.toFixed(2)}</div>
        <div className="flex justify-end col-span-2 md:col-span-1">
          <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-gray-500 hover:text-green-500 transform transition-transform"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-expanded={isExpanded}
              aria-label="Toggle transaction details"
          >
              <ChevronDownIcon />
          </button>
        </div>
      </div>
      
      {/* Expanded View */}
      {isExpanded && (
        <div className="bg-green-100 text-gray-800 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-b-2 border-green-200">
            <div>
                <p><span className="font-bold">Transaction type:</span> {transaction.type}</p>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor={`category-${transaction.id}`} className="font-bold">Category:</label>
                <select 
                  id={`category-${transaction.id}`}
                  value={category} 
                  // FIX: Cast e.target.value to the correct union type to resolve TypeScript error.
                  onChange={(e) => setCategory(e.target.value as Transaction['category'])}
                  className="p-1 border border-gray-400 rounded-md"
                >
                    <option>Food</option>
                    <option>Shopping</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                    <option>Transport</option>
                    <option>Income</option>
                    <option>Other</option>
                </select>
                <PencilIcon />
            </div>
            <div className="flex items-center gap-2 col-span-1 md:col-span-2">
                <label htmlFor={`notes-${transaction.id}`} className="font-bold">Note:</label>
                <input 
                  id={`notes-${transaction.id}`}
                  type="text" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="p-1 border border-gray-400 rounded-md flex-grow"
                />
                <PencilIcon />
            </div>
        </div>
      )}
    </div>
  );
};

export default TransactionRow;