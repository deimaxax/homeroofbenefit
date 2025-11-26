  
  import React from 'react';
  
  // Pasirink vieną iš trijų variantų pakeisdamas "variant" propą: 'shield', 'monogram', arba 'seal'
  export default function BrandLogo({ variant = 'shield' }: { variant?: 'shield' | 'monogram' | 'seal' }) {
  
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


      return null;
}  }  
  // 2. THE MONOGRAM (Bankas/Finansai) - Labai oficialus, primena "Chase" ar dideles korporacijas