// src/components/ArgentBankIconicLogo.tsx
import React from 'react';

// SVG conforme à la maquette après connexion
const ArgentBankIconicLogo: React.FC = () => (
  <span className="flex items-center" aria-label="Argent Bank">
    <div className="bg-[#00bc77] rounded-md p-2 mr-2 flex items-center justify-center">
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="10" r="2" stroke="white" strokeWidth="1.5"/>
        <path d="M12 12V16" stroke="white" strokeWidth="1.5"/>
        <path d="M10 16H14" stroke="white" strokeWidth="1.5"/>
        <path d="M12 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 20V19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 12H4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17.6568 6.34315L16.9497 7.05025" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.05025 16.9497L6.34315 17.6568" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17.6568 17.6568L16.9497 16.9497" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.05025 7.05025L6.34315 6.34315" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
    <span className="text-[#00bc77] text-xl font-bold">Argent Bank</span>
  </span>
);

export default ArgentBankIconicLogo;