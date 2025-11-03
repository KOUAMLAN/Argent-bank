import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => (
  <div className="flex-1 text-center p-4">
    <div className="mx-auto w-24 h-24 border-8 border-[#00bc77] rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

export default FeatureCard;
