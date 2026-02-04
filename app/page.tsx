'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { User, Heart, DollarSign, Zap, Radio } from 'lucide-react'; 

const ASSETS = {
  SHIKAMARU_BODY: 'https://i.imgur.com/zzBQNiq.png',
  SHIKAMARU_HEAD: 'https://i.imgur.com/rq4bWai.png',
  NARA_SYMBOL: 'https://i.imgur.com/tRWhkSk.png',
  GAME_BG: 'https://cdn2.unrealengine.com/marvel-rivals-gameplay-1920x1080-a6062b61e4b5.jpg' // Imagem de Fundo Adicionada
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
      
      {/* --- ESTILOS GLOBAIS --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Space+Grotesk:wght@300;500;700&family=Shojumaru&display=swap');
        
        .font-ninja { font-family: 'Cinzel Decorative', cursive; }
        .font-hud { font-family: 'Space Grotesk', sans-serif; }
        .font-naruto { font-family: 'Shojumaru', system-ui; }

        /* Padrão de Grelha Tática */
        .tech-grid {
          background-image: 
            linear-gradient(rgba(74, 222, 128, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 222, 128, 0.05) 1px, transparent 1px);
          background-size: 10px 10px;
        }

        .scanline {
          background: linear-gradient(to bottom, rgba(74,222,128,0), rgba(74,222,128,0.02) 50%, rgba(74,222,128,0));
          background-size: 100% 3px;
          animation: scan 8s linear infinite;
          pointer-events: none;
        }

        @keyframes scan {
          from { background-position: 0 -100vh; }
          to { background-position: 0 100vh; }
        }

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
          background: radial-gradient(circle at center, rgba(74, 222, 128, 0.05), transparent 70%);
          animation: smoke-pulse 4s ease-in-out infinite alternate;
        }

        @keyframes smoke-pulse {
          0% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 0.6; transform: scale(1.1); }
        }

        .neon-text { text-shadow: 0 0 10px rgba(74, 222, 128, 0.4); }
      `}</style>

      {/* --- BACKGROUND DE TESTE (MARVEL RIVALS) --- */}
      <div className="absolute inset-0 z-0">
        <img 
            src={ASSETS.GAME_BG} 
            alt="Game Background" 
            className="w-full h-full object-cover opacity-100"
        />
        {/* Overlay escuro subtil apenas para simular a stream real se quiseres, removível */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* --- 1. BARRA SUPERIOR PRO (PREMIUM & IMERSIVA) --- */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-2 z-50">
        <div className="relative flex items-start gap-0"> 
          
          {/* LADO ESQUERDO */}
          <div className="mt-4 relative">
             {/* Conector Decorativo */}
             <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-2 bg-[#4ade80]/10 z-0 transform skew-x-[20deg]" />
             
             <TacticalWing side="left">
                <StatItem icon={<User size={14} />} label="LAST SUB" />
                {/* Separador Premium */}
                <div className="h-6 w-[2px] bg-gradient-to-b from-transparent via-[#4ade80]/30 to-transparent mx-8 skew-x-[20deg]" />
                <StatItem icon={<Heart size={14} />} label="LAST FOLLOWER" />
             </TacticalWing>
          </div>

          {/* CENTRO (NOME PREMIUM) */}
          <div className="relative flex flex-col items-center z-20 mx-[-15px] mt-4">
             
             {/* Placa do Nome */}
             <div className="h-14 flex flex-col justify-center items-center px-16 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-xl border-b border-[#4ade80]/40 clip-path-trapezoid relative overflow-hidden shadow-lg">
                
                {/* Textura de Fundo Tech */}
                <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
                <div className="smoke-effect absolute inset-0 pointer-events-none" />
                
                {/* Borda Superior Brilhante (Efeito Vidro) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex flex-col items-center pt-1 z-10">
                   <h1 className="font-ninja text-4xl tracking-tighter neon-text leading-none drop-shadow-lg">
                      SERA <span className="text-[#4ade80]">NARA</span>
                   </h1>
                   
                   {/* LIVE INDICATOR (Sem texto, apenas pulso e sinal) */}
                   <div className="flex items-center gap-2 mt-1 opacity-80">
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent" />
                      <Radio size={8} className="text-red-500 animate-pulse drop-shadow-[0_0_5px_red]" />
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent" />
                   </div>
                </div>
             </div>
          </div>

          {/* LADO DIREITO */}
          <div className="mt-4 relative">
             {/* Conector Decorativo */}
             <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-2 bg-[#4ade80]/10 z-0 transform -skew-x-[20deg]" />

             <TacticalWing side="right">
                <StatItem icon={<DollarSign size={14} />} label="DONATION" />
                {/* Separador Premium */}
                <div className="h-6 w-[2px] bg-gradient-to-b from-transparent via-[#4ade80]/30 to-transparent mx-8 -skew-x-[20deg]" />
                <StatItem icon={<Zap size={14} />} label="BITS" />
             </TacticalWing>
          </div>

        </div>
      </div>

      {/* --- 2. WEBCAM TÁTICA (LADO ESQUERDO) --- */}
      <div className="absolute top-36 left-12 z-40">
        <div className="relative w-[400px] aspect-video group">
           
           <div className="absolute -inset-4 smoke-effect opacity-30 pointer-events-none rounded-full blur-xl" />

           <CornerMarker position="tl" />
           <CornerMarker position="tr" />
           <CornerMarker position="bl" />
           <CornerMarker position="br" />

           <div className="absolute -left-4 -bottom-8 z-50 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              
              {/* SÍMBOLO NARA (MARCA D'ÁGUA ATRÁS DO CHIBI) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-0 opacity-40 pointer-events-none">
                 <img 
                    src={ASSETS.NARA_SYMBOL} 
                    alt="Nara Clan" 
                    className="w-full h-full object-contain rotate-[-10deg]"
                 />
              </div>

              {/* CAMADA DE FUMO DO NARUTO */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 pointer-events-none z-0">
                 <div className="jutsu-smoke w-16 h-16 left-0 bottom-0" style={{ animationDelay: '0s' }} />
                 <div className="jutsu-smoke w-12 h-12 left-8 bottom-2" style={{ animationDelay: '1s' }} />
                 <div className="jutsu-smoke w-14 h-14 right-2 bottom-0" style={{ animationDelay: '2s' }} />
              </div>

              {/* CHIBI */}
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

// --- COMPONENTES AUXILIARES ---

const TacticalWing = ({ children, side }: { children: React.ReactNode, side: 'left' | 'right' }) => {
  const skew = side === 'left' ? 'skew-x-[20deg]' : '-skew-x-[20deg]';
  const unSkew = side === 'left' ? '-skew-x-[20deg]' : 'skew-x-[20deg]';
  
  // Gradiente melhorado para parecer vidro fumado tech (MAIS ESCURO E FOSCO)
  const gradient = side === 'left' 
    ? 'bg-gradient-to-r from-transparent via-black/90 to-black/95' 
    : 'bg-gradient-to-l from-transparent via-black/90 to-black/95';

  return (
    <div className={`h-14 flex items-center px-12 border-b border-[#4ade80]/20 border-t border-t-white/5 backdrop-blur-md shadow-lg ${skew} ${gradient} relative overflow-hidden`}>
       {/* Grelha subtil no fundo */}
       <div className={`absolute inset-0 tech-grid opacity-10 ${unSkew}`} />
       
       <div className={`flex items-center ${unSkew} w-full justify-between relative z-10`}>
          {children}
       </div>
    </div>
  );
};

const StatItem = ({ icon, label }: { icon: any, label: string }) => (
  <div className="flex flex-col items-center min-w-[100px] group">
     <div className="flex items-center gap-1.5 text-[#4ade80] mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
        <span className="font-hud text-[10px] font-bold tracking-widest">{label}</span>
     </div>
     <div className="h-5 w-full bg-white/5 rounded-sm border border-white/5"></div> 
  </div>
);

const CornerMarker = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
   const styles = {
      tl: 'top-0 left-0 border-t-2 border-l-2',
      tr: 'top-0 right-0 border-t-2 border-r-2',
      bl: 'bottom-0 left-0 border-b-2 border-l-2',
      br: 'bottom-0 right-0 border-b-2 border-r-2'
   };
   return <div className={`absolute w-3 h-3 border-[#4ade80] ${styles[position]} opacity-60 shadow-[0_0_5px_#4ade80]`} />;
};