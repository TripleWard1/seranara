'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { User, Heart, DollarSign, Zap, Radio } from 'lucide-react'; 

const ASSETS = {
  SHIKAMARU_BODY: 'https://i.imgur.com/zzBQNiq.png',
  SHIKAMARU_HEAD: 'https://i.imgur.com/rq4bWai.png',
  NARA_SYMBOL: 'https://i.imgur.com/tRWhkSk.png',
};

export default function SeraNaraTacticalHUD() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('pt-PT', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-transparent text-white pointer-events-none select-none overflow-hidden font-sans">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Space+Grotesk:wght@300;500;700&family=Shojumaru&display=swap');
        
        .font-ninja { font-family: 'Cinzel Decorative', cursive; }
        .font-hud { font-family: 'Space Grotesk', sans-serif; }

        .jutsu-smoke {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0) 70%);
          border-radius: 50%;
          filter: blur(8px);
          opacity: 0;
          animation: smoke-rise 3s infinite ease-out;
        }

        @keyframes smoke-rise {
          0% { transform: scale(0.5) translateY(10px); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: scale(2.5) translateY(-40px); opacity: 0; }
        }

        .smoke-effect {
          background: radial-gradient(circle at center, rgba(74, 222, 128, 0.18), transparent 75%);
          animation: smoke-pulse 4s ease-in-out infinite alternate;
        }

        @keyframes smoke-pulse {
          0% { opacity: 0.4; transform: scale(0.95); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }

        .neon-text { 
          text-shadow: 0 0 15px rgba(74, 222, 128, 0.6), 0 0 2px rgba(255, 255, 255, 0.5); 
        }

        .clip-path-trapezoid {
          clip-path: polygon(0 0, 100% 0, 92% 100%, 8% 100%);
        }

        @keyframes leaf-fall {
          0% { transform: translateY(-30px) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.5; }
          100% { transform: translateY(140px) translateX(50px) rotate(720deg); opacity: 0; }
        }
        .konoha-leaf {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #4ade80;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: leaf-fall 7s infinite linear;
          filter: drop-shadow(0 0 5px #4ade80);
        }

        .chakra-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #4ade80;
          border-radius: 50%;
          filter: blur(1px);
          box-shadow: 0 0 10px #4ade80;
          animation: chakra-float 5s infinite ease-in-out;
        }

        @keyframes chakra-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-30px) scale(1.6); opacity: 0.8; }
        }

        .radar-scan {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.15) 50%, transparent 100%);
          width: 40%;
          animation: scan 4s infinite linear;
        }

        @keyframes scan {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(300%); }
        }

        .glass-premium {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(25px);
          border-bottom: 2px solid rgba(74, 222, 128, 0.6);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(74, 222, 128, 0.05);
        }
      `}</style>

      {/* --- 1. BARRA SUPERIOR --- */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-50"> 
        <div className="absolute top-0 w-[60%] h-20 bg-[#4ade80]/5 blur-[60px] rounded-full" />

        <div className="relative flex items-start gap-0 pt-1"> 
          <div className="mt-0 relative group"> 
             <div className="chakra-dot left-10 top-6" />
             <div className="chakra-dot left-24 top-2" style={{ animationDelay: '2s' }} />
             <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#4ade80] to-transparent opacity-40" />
             <TacticalWing side="left">
                <StatItem icon={<User size={14} />} label="LAST SUB" color="#4ade80" />
                <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#4ade80]/50 to-transparent mx-10 rotate-[20deg] mt-[-20px]" />
                <StatItem icon={<Heart size={14} />} label="LAST FOLLOWER" color="#4ade80" />
             </TacticalWing>
          </div>

          <div className="relative flex flex-col items-center z-20 mx-[-10px]"> 
             <div className="konoha-leaf left-[-40px] top-0" style={{ animationDelay: '0s' }} />
             <div className="konoha-leaf right-[-40px] top-0" style={{ animationDelay: '3.5s' }} />
             <div className="h-16 flex flex-col justify-center items-center px-24 glass-premium clip-path-trapezoid relative overflow-hidden">
                <div className="radar-scan" />
                <div className="smoke-effect absolute inset-0 pointer-events-none" />
                <div className="absolute left-6 top-3 w-2 h-2 border-l border-t border-[#4ade80]" />
                <div className="absolute right-6 top-3 w-2 h-2 border-r border-t border-[#4ade80]" />
                <div className="flex flex-col items-center z-10">
                   <motion.div
                      animate={{ 
                        textShadow: ["0 0 15px rgba(74, 222, 128, 0.6)", "0 0 25px rgba(74, 222, 128, 0.9)", "0 0 15px rgba(74, 222, 128, 0.6)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                   >
                     <h1 className="font-ninja text-4xl tracking-tighter neon-text leading-none">
                        SERA <span className="text-[#4ade80]">NARA</span>
                     </h1>
                   </motion.div>
                   <div className="flex items-center gap-3 mt-2">
                      <div className="flex gap-1">
                        {[1,2,3].map(i => (
                          <motion.div key={i} className="w-4 h-[2px] bg-[#4ade80]/30" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: i*0.2, repeat: Infinity }} />
                        ))}
                      </div>
                      <Radio size={10} className="text-red-500 animate-pulse drop-shadow-[0_0_8px_red]" />
                      <div className="flex gap-1 rotate-180">
                        {[1,2,3].map(i => (
                          <motion.div key={i} className="w-4 h-[2px] bg-[#4ade80]/30" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: i*0.2, repeat: Infinity }} />
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-0 relative group"> 
             <div className="chakra-dot right-10 top-6" style={{ animationDelay: '1.5s' }} />
             <div className="chakra-dot right-24 top-2" style={{ animationDelay: '4s' }} />
             <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#4ade80] to-transparent opacity-40" />
             <TacticalWing side="right">
                <StatItem icon={<DollarSign size={14} />} label="DONATION" color="#4ade80" />
                <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#4ade80]/50 to-transparent mx-10 rotate-[-20deg] mt-[-20px]" />
                <StatItem icon={<Zap size={14} />} label="BITS" color="#4ade80" />
             </TacticalWing>
          </div>
        </div>
      </div>

      {/* --- 2. WEBCAM TÁTICA --- */}
      <div className="absolute top-36 left-12 z-40">
        <div className="relative w-[400px] aspect-video group">
           <div className="absolute -inset-4 smoke-effect opacity-30 pointer-events-none rounded-full blur-xl" />
           <CornerMarker position="tl" />
           <CornerMarker position="tr" />
           <CornerMarker position="bl" />
           <CornerMarker position="br" />
           <div className="absolute -left-4 -bottom-8 z-50 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-0 opacity-40 pointer-events-none">
                 <img src={ASSETS.NARA_SYMBOL} alt="Nara Clan" className="w-full h-full object-contain rotate-[-10deg] invert brightness-[1.8]" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 pointer-events-none z-0">
                 <div className="jutsu-smoke w-16 h-16 left-0 bottom-0" style={{ animationDelay: '0s' }} />
                 <div className="jutsu-smoke w-12 h-12 left-8 bottom-2" style={{ animationDelay: '1s' }} />
                 <div className="jutsu-smoke w-14 h-14 right-2 bottom-0" style={{ animationDelay: '2s' }} />
              </div>
              <motion.img
                 src={ASSETS.SHIKAMARU_BODY}
                 alt="Guard"
                 className="w-24 h-24 object-contain relative z-10" 
                 animate={{ y: [0, -2, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}

const TacticalWing = ({ children, side }: { children: React.ReactNode, side: 'left' | 'right' }) => {
  const skew = side === 'left' ? 'skew-x-[20deg]' : '-skew-x-[20deg]';
  const unSkew = side === 'left' ? '-skew-x-[20deg]' : 'skew-x-[20deg]';
  const gradient = side === 'left' 
    ? 'bg-gradient-to-r from-transparent via-black/90 to-black' 
    : 'bg-gradient-to-l from-transparent via-black/90 to-black';

  return (
    <div className={`h-16 flex items-center px-12 border-b-2 border-[#4ade80]/50 backdrop-blur-2xl ${skew} ${gradient} relative overflow-hidden group`}>
       <div className="absolute inset-0 bg-[#4ade80]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
       <div className={`flex items-center ${unSkew} w-full justify-between relative z-10`}>
          {children}
       </div>
    </div>
  );
};

const StatItem = ({ icon, label, color }: { icon: any, label: string, color: string }) => (
  <div className="flex flex-col items-center min-w-[110px] group -mt-5">
     <div className="flex items-center gap-2">
        <span style={{ color }}>{icon}</span>
        <span className="font-hud text-[10px] font-bold tracking-[0.3em] text-white/90 group-hover:text-white transition-colors">{label}</span>
     </div>
     <div className="w-full h-[3px] bg-black/50 rounded-full overflow-hidden border border-white/5 mt-1">
        <motion.div 
          className="h-full bg-[#4ade80]"
          initial={{ width: "30%" }}
          animate={{ width: ["30%", "70%", "40%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: `0 0 8px ${color}` }}
        />
     </div>
  </div>
);

const CornerMarker = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
   const styles = {
      tl: 'top-0 left-0 border-t-2 border-l-2',
      tr: 'top-0 right-0 border-t-2 border-r-2',
      bl: 'bottom-0 left-0 border-b-2 border-l-2',
      br: 'bottom-0 right-0 border-b-2 border-r-2'
   };
   return (
    <motion.div 
      className={`absolute w-3 h-3 border-[#4ade80] ${styles[position]} z-50`} 
      animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
   );
};