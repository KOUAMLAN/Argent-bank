import React from 'react';
import bankTreeImage from '../assets/img/bank-tree.jpeg';

const Hero: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[300px] md:h-[400px] flex-shrink-0"
      style={{ backgroundImage: `url(${bankTreeImage})` }}
    >
      <div className="relative md:absolute top-1/2 md:top-auto md:bottom-8 md:right-20 transform -translate-y-1/2 md:transform-none bg-white p-6 md:p-8 w-10/12 md:w-auto max-w-sm mx-auto md:mx-0 text-left shadow-lg mt-8 md:mt-0">
        <h2 className="sr-only">Contenu promotionnel</h2>
        <p className="font-bold text-xl md:text-2xl text-gray-800">Aucuns frais.</p>
        <p className="font-bold text-xl md:text-2xl text-gray-800">Aucun dépôt minimum.</p>
        <p className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Taux d'intérêt élevés.</p>
        <p className="text-md md:text-lg text-gray-600">Ouvrez un compte d'épargne chez Argent Bank dès aujourd'hui !</p>
      </div>
    </div>
  );
};

export default Hero;