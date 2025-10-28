import React from 'react';
import bankTree from '../assets/img/bank-tree.jpeg';
import iconChat from '../assets/img/icon-chat.png';
import iconMoney from '../assets/img/icon-money.png';
import iconSecurity from '../assets/img/icon-security.png';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[300px] md:h-[400px] flex-shrink-0"
        style={{ backgroundImage: `url(${bankTree})` }}
      >
        <div className="relative md:absolute top-1/2 md:top-auto md:bottom-8 md:right-20 transform -translate-y-1/2 md:transform-none bg-white p-6 md:p-8 w-10/12 md:w-auto max-w-sm mx-auto md:mx-0 text-left shadow-lg mt-8 md:mt-0">
          <h2 className="sr-only">Contenu promotionnel</h2>
          <p className="font-bold text-xl md:text-2xl text-gray-800">Aucun frais.</p>
          <p className="font-bold text-xl md:text-2xl text-gray-800">Aucun dépôt minimum.</p>
          <p className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Taux d'intérêt élevés.</p>
          <p className="text-md md:text-lg text-gray-600">Ouvrez un compte d'épargne avec Argent Bank dès aujourd'hui !</p>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="flex flex-col md:flex-row p-4 sm:p-8 container mx-auto bg-white">
        <h2 className="sr-only">Fonctionnalités</h2>
        <div className="flex-1 text-center p-4">
          <div className="mx-auto w-24 h-24 border-8 border-[#00bc77] rounded-full flex items-center justify-center mb-4">
            <img src={iconChat} alt="Chat Icon" className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Vous êtes notre priorité n°1</h3>
          <p className="text-gray-600">
            Besoin de parler à un représentant ? Contactez-nous via notre chat disponible 24h/24 et 7j/7 ou par téléphone en moins de 5 minutes.
          </p>
        </div>
        <div className="flex-1 text-center p-4">
          <div className="mx-auto w-24 h-24 border-8 border-[#00bc77] rounded-full flex items-center justify-center mb-4">
            <img src={iconMoney} alt="Money Icon" className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Plus d'économies signifie des taux plus élevés</h3>
          <p className="text-gray-600">
            Plus vous économisez avec nous, plus votre taux d'intérêt sera élevé !
          </p>
        </div>
        <div className="flex-1 text-center p-4">
          <div className="mx-auto w-24 h-24 border-8 border-[#00bc77] rounded-full flex items-center justify-center mb-4">
             <img src={iconSecurity} alt="Security Icon" className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Une sécurité à laquelle vous pouvez faire confiance</h3>
          <p className="text-gray-600">
            Nous utilisons un cryptage haut de gamme pour garantir que vos données et votre argent sont toujours en sécurité.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;