'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASSETS = {
  NARA_SYMBOL: 'https://i.imgur.com/tRWhkSk.png'
};

export default function PremiumFollowerAlert() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden font-sans">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Space+Grotesk:wght@300;700&family=Noto+Sans+JP:wght@900&display=swap');
        
        .font-ninja { font-family: 'Cinzel Decorative', cursive; }
        .font-hud { font-family: 'Space Grotesk', sans-serif; }
        .font-japan { font-family: 'Noto Sans JP', sans-serif; }

        .shadow-beam {
          position: absolute;
          bottom: -100%;
          width: 2px;
          background: linear-gradient(to top, transparent, #4ade80, transparent);
          filter: drop-shadow(0 0 8px #4ade80);
        }

        .premium-clip {
          clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <div className="relative flex flex-col items-center">
            
            {/* Sombras Verticais Estilizadas */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
               <motion.div 
                initial={{ height: 0 }} animate={{ height: '200vh' }}
                className="shadow-beam" style={{ left: '-150px' }} 
               />
               <motion.div 
                initial={{ height: 0 }} animate={{ height: '200vh' }}
                className="shadow-beam" style={{ right: '-150px' }} 
               />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative mb-4"
              >
                <motion.img 
                  src={ASSETS.NARA_SYMBOL}
                  className="w-20 h-20 invert brightness-[2] drop-shadow-[0_0_20px_#4ade80]"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="relative group">
                <motion.div 
                  initial={{ width: 0, opacity: 0 }} animate={{ width: '120%', opacity: 1 }}
                  className="absolute -top-2 -left-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent" 
                />
                
                <div className="premium-clip bg-gradient-to-b from-black/40 via-black/80 to-black/40 backdrop-blur-xl px-24 py-10 border-y border-white/10 relative overflow-hidden">
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4ade80]/5 to-transparent pointer-events-none" />

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <span className="font-japan text-[#4ade80] text-xl tracking-[0.8em] mb-2 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                      影真似 de 術
                    </span>
                    
                    <div className="flex items-center gap-3 mb-1">
                      <div className="h-[1px] w-8 bg-[#4ade80]/30" />
                      <span className="font-hud text-white/50 text-[10px] tracking-[0.5em] uppercase">
                        Strategic Ally Acquired
                      </span>
                      <div className="h-[1px] w-8 bg-[#4ade80]/30" />
                    </div>
                    
                    <h2 className="font-hud text-7xl font-black text-white tracking-tight flex items-center min-h-[1.2em]">
                      <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        {/* O NOME DO USER ENTRA AQUI PELO STREAMLABS */}
                      </span>
                    </h2>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ width: 0, opacity: 0 }} animate={{ width: '120%', opacity: 1 }}
                  className="absolute -bottom-2 -left-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent" 
                />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex flex-col items-center"
              >
                <p className="font-ninja text-[#4ade80] text-sm italic tracking-widest">
                   &quot;What a drag... but welcome to the clan.&quot;
                </p>
                <div className="w-1/2 h-[2px] mt-1 bg-[#4ade80]/20 rounded-full" />
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.15 }}
              className="absolute z-0 w-[500px] h-[500px] bg-[#4ade80] rounded-full blur-[120px]"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}