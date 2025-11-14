import React from 'react';
import Hero from '../components/Hero';
import FeatureItem from '../components/FeatureItem';
import chatIcon from '../assets/img/icon-chat.png';
import moneyIcon from '../assets/img/icon-money.png';
import securityIcon from '../assets/img/icon-security.png';

const HomePage: React.FC = () => {
  return (
    <main className="flex-1">
      <Hero />
      <section className="flex flex-col md:flex-row p-4 sm:p-8 container mx-auto bg-white">
        <h2 className="sr-only">Features</h2>
        <FeatureItem 
            iconSrc={chatIcon} 
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItem 
            iconSrc={moneyIcon} 
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItem 
            iconSrc={securityIcon} 
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
};

export default HomePage;
