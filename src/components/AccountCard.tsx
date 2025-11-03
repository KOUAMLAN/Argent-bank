import React from 'react';

interface AccountCardProps {
  title: string;
  amount: string;
  description: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ title, amount, description }) => {
  return (
    <section className="bg-zinc-800 text-white p-6 mb-8 border border-transparent rounded-lg shadow-lg w-full max-w-4xl mx-auto flex justify-between items-center cursor-pointer">
      <div className="flex-1 text-left">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-5xl font-bold">{amount}</p>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </section>
  );
};

export default AccountCard;