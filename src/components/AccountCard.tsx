import React from 'react';

interface AccountCardProps {
  title: string;
  amount: string;
  description: string;
}

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


const AccountCard: React.FC<AccountCardProps> = ({ title, amount, description }) => {
  return (
    <section className="bg-gray-700 text-white p-8 mb-8 border border-transparent rounded-lg shadow-lg w-full max-w-4xl mx-auto flex flex-row justify-between items-center">
      <div className="flex-1 text-left">
        <h3 className="text-lg font-normal text-gray-200">{title}</h3>
        <p className="text-5xl font-bold">{amount}</p>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="w-auto flex justify-end">
        <ChevronRightIcon />
      </div>
    </section>
  );
};

export default AccountCard;