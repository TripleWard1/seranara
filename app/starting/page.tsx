'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ASSETS = {
  SHIKAMARU: 'https://i.imgur.com/uYupv0J.jpeg',
  NARA_SYMBOL: 'https://i.imgur.com/tRWhkSk.png',
};

export default function NaraUltimateScreen() {
  return (
    <div className="fixed inset-0 bg-[#020403] flex items-center justify-center overflow-hidden font-sans uppercase">
      
      {/* --- CAMADA 1: O PERSONAGEM --- */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center contrast-[1.1] brightness-[0.85]"
          style={{ backgroundImage: `url(${ASSETS.SHIKAMARU})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_10%,rgba(0,0,0,0.9)_110%)]" />
      </motion.div>

      {/* --- CAMADA 2: O NOME "SERA NARA" (AGORA COMO NÉVOA SUBTIL) --- */}
      <div className="absolute inset-0 flex items-start justify-center z-10 pointer-events-none pt-24"> 
        <motion.div
          animate={{ opacity: [0.1, 0.18, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full text-center"
        >
          <h2 className="text-[14vw] font-black text-[#4ade80] italic tracking-[-0.02em] leading-none blur-[12px] select-none">
            SERA NARA
          </h2>
        </motion.div>
      </div>

      {/* --- CAMADA 3: ANIMAÇÕES DE AMBIENTE --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            initial={{ x: '-10vw', y: Math.random() * 100 + 'vh', opacity: 0 }}
            animate={{ 
              x: '110vw', 
              y: (Math.random() * 100 - 20) + 'vh', 
              rotate: 720, 
              opacity: [0, 0.6, 0] 
            }}
            transition={{ 
              duration: 6 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-2 h-1 bg-[#4ade80]/60 rounded-full blur-[1px]"
          />
        ))}

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`sh-${i}`}
            animate={{ 
              height: ['40vh', '85vh', '40vh'],
              skewX: [20, -20, 20],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15%] bg-black/70 blur-[100px]"
            style={{ 
              width: `${350 + i * 120}px`,
              left: `${i * 22 - 15}%`,
            }}
          />
        ))}
      </div>

      {/* --- CAMADA 4: CONTEÚDO PRINCIPAL --- */}
      <main className="relative z-40 flex flex-col items-center">
        
        {/* Símbolo com Brilho Atmosférico */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-10"
        >
          <div className="absolute inset-[-30px] bg-[#4ade80]/20 rounded-full blur-[60px] animate-pulse" />
          <div className="relative border-none">
            <img 
              src={ASSETS.NARA_SYMBOL} 
              className="w-28 h-28 invert brightness-150 drop-shadow-[0_0_25px_rgba(74,222,128,0.7)]" 
              alt="Nara" 
            />
          </div>
        </motion.div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            className="mb-6"
          >
            <span className="text-[#4ade80] font-black tracking-[1.2em] text-sm drop-shadow-lg pl-[1.2em] opacity-80">
              SERA NARA
            </span>
          </motion.div>

          <h1 className="font-black italic text-7xl md:text-[140px] leading-[0.85] tracking-tighter text-white">
            STREAM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#4ade80] to-[#166534] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
              STARTING
            </span>
          </h1>

          {/* Rodapé Tático */}
          <div className="mt-14 flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#4ade80]/50" />
              <p className="text-white/80 font-bold tracking-[0.5em] text-lg">
                NARA CLAN IS COMING
              </p>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#4ade80]/50" />
            </div>
            
            <motion.p 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-[#4ade80]/50 font-bold tracking-[0.2em] text-xs"
            >
              &quot;Thinking is my greatest weapon.&quot;
            </motion.p>
          </div>
        </div>
      </main>

      {/* --- OVERLAYS --- */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
      </div>

    </div>
  );
}