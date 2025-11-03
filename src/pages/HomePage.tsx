import React from 'react';
import Hero from '../components/Hero';
import FeatureItem from '../components/FeatureItem';
import chatIcon from '../assets/img/icon-chat.png';
import moneyIcon from '../assets/img/icon-money.png';
import securityIcon from '../assets/img/icon-security.png';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <section className="flex flex-col md:flex-row p-4 sm:p-8 container mx-auto bg-white">
        <h2 className="sr-only">Fonctionnalités</h2>
        <FeatureItem 
            iconSrc={chatIcon} 
            title="Vous êtes notre priorité n°1"
            description="Besoin de parler à un représentant ? Contactez-nous via notre chat disponible 24h/24 et 7j/7 ou par téléphone en moins de 5 minutes."
        />
        <FeatureItem 
            iconSrc={moneyIcon} 
            title="Plus d'économies signifie des taux plus élevés"
            description="Plus vous économisez avec nous, plus votre taux d'intérêt sera élevé !"
        />
        <FeatureItem 
            iconSrc={securityIcon} 
            title="Une sécurité à laquelle vous pouvez faire confiance"
            description="Nous utilisons un cryptage haut de gamme pour garantir que vos données et votre argent sont toujours en sécurité."
        />
      </section>
    </>
  );
};

export default HomePage;