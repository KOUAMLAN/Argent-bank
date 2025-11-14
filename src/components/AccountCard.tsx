import React from 'react';
import { Link } from 'react-router-dom';
import { Account } from '../types';
import { ChevronRightIcon } from './icons';

const AccountCard: React.FC<{ account: Account }> = ({ account }) => {
  return (
    <section className="bg-[#424242] text-white p-6 mb-4 rounded-lg w-full max-w-4xl mx-auto">
      <Link 
        to={`/account/${account.id}/transactions`}
        state={{ account }}
        className="w-full flex justify-between items-center"
        aria-label={`View transactions for ${account.title}`}
      >
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold">{account.title}</h3>
          <p className="text-5xl font-bold tracking-tight">{account.amount}</p>
          <p className="text-sm">{account.description}</p>
        </div>
        <ChevronRightIcon />
      </Link>
    </section>
  );
};

export default AccountCard;