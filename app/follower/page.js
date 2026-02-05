'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASSETS = {
  NARA_SYMBOL: 'https://i.imgur.com/tRWhkSk.png', // Símbolo que já usamos no HUD
};

export default function FollowerAlert() {
  const [visible, setVisible] = useState(true);

  // Simulação de trigger para teste
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Space+Grotesk:wght@700&family=Shojumaru&display=swap');
        
        .font-ninja { font-family: 'Cinzel Decorative', cursive; }
        .font-hud { font-family: 'Space Grotesk', sans-serif; }
        .font-japan { font-family: 'Shojumaru', cursive; }

        /* Efeito de fumo denso de invocação */
        .smoke-poof {
          position: absolute;
          background: radial-gradient(circle, rgba(200, 200, 200, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
        }

        /* Animação das sombras táticas */
        @keyframes shadow-extend {
          0% { height: 0; opacity: 0; }
          100% { height: 100vh; opacity: 1; }
        }
        .shadow-line {
          position: absolute;
          bottom: 0;
          width: 4px;
          background: #000;
          box-shadow: 0 0 15px #4ade80;
          animation: shadow-extend 0.8s ease-out forwards;
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <div className="relative flex flex-col items-center">
            
            {/* 1. KAGE MANE (Sombras subindo do fundo do ecrã) */}
            <div className="absolute bottom-[-50vh] flex gap-8">
               <div className="shadow-line" style={{ left: '-100px', animationDelay: '0.1s' }} />
               <div className="shadow-line" style={{ width: '8px', animationDelay: '0s' }} />
               <div className="shadow-line" style={{ right: '-100px', animationDelay: '0.2s' }} />
            </div>

            {/* 2. EFEITO DE FUMO (Invocação) */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.5], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
              className="smoke-poof w-64 h-64 z-0"
            />

            {/* 3. CONTEÚDO PRINCIPAL */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Símbolo Nara Giratório */}
              <motion.img 
                src={ASSETS.NARA_SYMBOL}
                className="w-20 h-20 mb-4 invert brightness-[1.5] drop-shadow-[0_0_10px_#4ade80]"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Título Estilo Pergaminho Tático */}
              <div className="relative group">
                {/* Linhas de fecho do Jutsu */}
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: '140%' }}
                  className="absolute top-[-10px] left-[-20%] h-[1px] bg-[#4ade80]" 
                />
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: '140%' }}
                  className="absolute bottom-[-10px] left-[-20%] h-[1px] bg-[#4ade80]" 
                />

                <div className="bg-black/95 px-16 py-6 border-x-4 border-[#4ade80] shadow-[0_0_40px_rgba(74,222,128,0.2)]">
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <span className="font-japan text-[#4ade80] text-sm tracking-[0.5em] mb-2">
                      影真似の術
                    </span>
                    <span className="font-ninja text-white text-xs tracking-[0.3em] opacity-70 mb-1">
                      INTELLIGENCE REPORT: NEW ALLY
                    </span>
                    
                    {/* NOME DO USER */}
                    <h2 className="font-hud text-5xl font-black text-white tracking-tighter uppercase italic">
                      <span className="text-[#4ade80]">{'<'}</span> 
                      USER_NAME 
                      <span className="text-[#4ade80] font-normal">{' />'}</span>
                    </h2>
                  </motion.div>
                </div>

                {/* Tags de Canto (UI Tática) */}
                <div className="absolute -top-4 -left-4 font-hud text-[10px] text-[#4ade80]">LVL: 07</div>
                <div className="absolute -bottom-4 -right-4 font-hud text-[10px] text-[#4ade80]">CHAKRA: 100%</div>
              </div>

              {/* Frase icónica do Shikamaru */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ delay: 1 }}
                className="mt-6 font-ninja text-[#4ade80] text-[10px] tracking-widest uppercase"
              >
                "What a drag... but welcome to the team."
              </motion.p>
            </motion.div>

            {/* 4. SOMBRA CIRCULAR NO CHÃO */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute bottom-[-40px] w-48 h-4 bg-black rounded-[100%] blur-md"
              style={{ boxShadow: '0 0 20px 5px #000' }}
            />

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}