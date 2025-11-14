import React from 'react';

interface FeatureItemProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex-1 text-center p-4">
      <div className="mx-auto w-24 h-24 border-8 border-[#00bc77] rounded-full flex items-center justify-center mb-4">
        <img src={iconSrc} alt={`${title} icon`} className="p-4" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;
