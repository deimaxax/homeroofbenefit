import React from 'react';

// Pasirink vieną iš trijų variantų pakeisdamas "variant" propą: 'shield', 'monogram', arba 'seal'
export default function BrandLogo({ variant = 'shield' }: { variant?: 'shield' | 'monogram' | 'seal' }) {
  
  // 1. THE SHIELD (Saugumas/Draudimas) - Geriausias "Eligibility" tikrinimui
  if (variant === 'shield') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Mėlynas Skydas */}
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-blue-700" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor"/>
          </svg>
          {/* Balta Varnelė viduje */}
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 absolute text-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-slate-900 font-bold text-lg leading-none tracking-tight">HOUSING BENEFIT</span>
          <span className="text-slate-500 font-semibold text-[10px] uppercase tracking-[0.2em] leading-none mt-1">Check Program</span>
        </div>
      </div>
    );
  }

  // 2. THE MONOGRAM (Bankas/Finansai) - Labai oficialus, primena "Chase" ar dideles korporacijas
  if (variant === 'monogram') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-xl tracking-tighter">HB</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-slate-900 font-extrabold text-xl leading-none tracking-tight">HBC</span>
          <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest leading-none mt-1">Official Verify</span>
        </div>
      </div>
    );
  }

  // 3. THE SEAL (Valstybinis/Biuras) - Apvalus, primena antspaudą.
  if (variant === 'seal') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center p-1">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
             <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21M5 21V7L13 3L21 7V21M6 10H10M6 14H10M6 18H10M14 10H18M14 14H18M14 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-slate-900 font-bold text-base leading-none">HOUSING BENEFIT</span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-slate-600 font-medium text-[10px] uppercase tracking-wide leading-none">Eligibility Center</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}