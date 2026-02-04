'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Requer: npm install framer-motion lucide-react
import { User, Heart, DollarSign, Zap, Radio } from 'lucide-react';

// ASSETS CORRIGIDOS (Mantive a constante original para o Chibi da WebCam)
const SHIKAMARU_CHIBI = 'https://i.imgur.com/etDvEDY.png'; // Chibi na webcam
const SHIKAMARU_HEAD = 'https://i.imgur.com/rq4bWai.png';   // Cabeça no Topo
const NARA_SYMBOL = 'https://i.imgur.com/etDvEDY.png';

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

        /* Fumo do Naruto (Efeito de fundo subtil) */
        .smoke-effect {
          background: radial-gradient(circle at center, rgba(74, 222, 128, 0.05), transparent 70%);
          animation: smoke-pulse 4s ease-in-out infinite alternate;
        }

        @keyframes smoke-pulse {
          0% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 0.6; transform: scale(1.1); }
        }

        .neon-text { text-shadow: 0 0 10px rgba(74, 222, 128, 0.6); }
      `}</style>

      {/* --- 1. BARRA SUPERIOR PRO (LAYOUT WIDE) --- */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-2 z-50">
        <div className="relative flex items-start gap-1"> {/* Gap reduzido para unir as peças */}
          
          {/* LADO ESQUERDO (Stats Sociais) */}
          {/* Puxei mais para cima (mt-4 em vez de mt-8) para alinhar com o topo da cabeça */}
          <div className="mt-4">
             <TacticalWing side="left">
                {/* Removi o value="N/A" para deixar espaço em branco */}
                <StatItem icon={<User size={14} />} label="LAST SUB" />
                <div className="h-8 w-[1px] bg-white/10 mx-8 skew-x-[20deg]" /> {/* Mais espaço (mx-8) */}
                <StatItem icon={<Heart size={14} />} label="FOLLOWER" />
             </TacticalWing>
          </div>

          {/* CENTRO (Logo + Cabeça Integrada) */}
          <div className="relative flex flex-col items-center z-20 mx-[-20px]"> {/* Margem negativa para unir */}
             
             {/* Cabeça do Shikamaru no topo (Brasão) */}
             <div className="relative -mb-12 z-30 transform scale-90"> {/* scale-90 para ajustar tamanho */}
                <motion.div 
                  className="absolute inset-0 w-full h-full border-2 border-dashed border-[#4ade80]/40 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="w-24 h-24 rounded-full bg-black/80 backdrop-blur-md border border-[#4ade80]/60 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                   <img 
                     src={SHIKAMARU_HEAD} 
                     className="w-20 h-20 object-contain mt-3" 
                     alt="Shikamaru Head"
                   />
                </div>
             </div>

             {/* Placa do Nome Central */}
             <div className="pt-14 pb-2 px-20 bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-lg border-b border-[#4ade80]/50 clip-path-trapezoid relative">
                <div className="smoke-effect absolute inset-0 pointer-events-none" />
                
                <div className="flex flex-col items-center">
                   <h1 className="font-ninja text-5xl tracking-tighter neon-text leading-none mt-1 drop-shadow-md">
                      SERA <span className="text-[#4ade80]">NARA</span>
                   </h1>
                   
                   {/* LIVE TAG */}
                   <div className="flex items-center gap-2 mt-2 bg-[#4ade80]/5 border border-[#4ade80]/20 px-4 py-0.5 rounded-sm">
                      <Radio size={10} className="text-red-500 animate-pulse" />
                      <span className="font-hud text-[10px] font-bold tracking-[0.3em] text-[#4ade80]">
                         TACTICAL LIVE // {time}
                      </span>
                   </div>
                </div>
             </div>
          </div>

          {/* LADO DIREITO (Stats Dinheiro) */}
          <div className="mt-4">
             <TacticalWing side="right">
                <StatItem icon={<DollarSign size={14} />} label="DONATION" />
                <div className="h-8 w-[1px] bg-white/10 mx-8 -skew-x-[20deg]" />
                <StatItem icon={<Zap size={14} />} label="BITS" />
             </TacticalWing>
          </div>

        </div>
      </div>

      {/* --- 2. WEBCAM TÁTICA --- */}
      <div className="absolute top-36 right-12 z-40">
        <div className="relative w-[400px] aspect-video group">
           
           {/* Fundo subtil de fumo ninja */}
           <div className="absolute -inset-4 smoke-effect opacity-30 pointer-events-none rounded-full blur-xl" />

           {/* Marcadores de Canto */}
           <CornerMarker position="tl" />
           <CornerMarker position="tr" />
           <CornerMarker position="bl" />
           <CornerMarker position="br" />

           {/* CHIBI PEQUENO (Imersivo por baixo) */}
           <div className="absolute -left-4 -bottom-8 z-50 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              <motion.img
                 src={SHIKAMARU_CHIBI} // Usa a constante original
                 alt="Guard"
                 className="w-24 h-24 object-contain" // Mais pequeno
                 animate={{ y: [0, -2, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
           </div>

           {/* Etiqueta da Webcam (Kage Mane) */}
           <div className="absolute -top-3 right-0">
              <div className="bg-black/80 backdrop-blur px-3 py-1 border-l-2 border-[#4ade80] transform -skew-x-12 shadow-lg">
                 <span className="font-naruto text-[10px] font-bold text-[#4ade80] tracking-wider not-italic">
                    Kage Mane no Jutsu
                 </span>
              </div>
           </div>

        </div>
      </div>

    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

// Asas Laterais (Mais largas e transparentes para evitar blocos pretos)
const TacticalWing = ({ children, side }: { children: React.ReactNode, side: 'left' | 'right' }) => {
  const skew = side === 'left' ? 'skew-x-[20deg]' : '-skew-x-[20deg]';
  const unSkew = side === 'left' ? '-skew-x-[20deg]' : 'skew-x-[20deg]';
  // Gradiente suave para transparência
  const gradient = side === 'left' 
    ? 'bg-gradient-to-r from-transparent via-black/70 to-black/90' 
    : 'bg-gradient-to-l from-transparent via-black/70 to-black/90';

  return (
    <div className={`h-14 flex items-center px-12 border-b border-[#4ade80]/40 backdrop-blur-sm ${skew} ${gradient}`}>
       <div className={`flex items-center ${unSkew} w-full justify-between`}>
          {children}
       </div>
    </div>
  );
};

// Item de Estatística (Com espaço em branco para o Streamlabs)
const StatItem = ({ icon, label }: { icon: any, label: string }) => (
  <div className="flex flex-col items-center min-w-[100px]"> {/* min-w-100px para dar espaço ao nome */}
     <div className="flex items-center gap-1.5 text-[#4ade80] mb-1 opacity-90">
        {icon}
        <span className="font-hud text-[10px] font-bold tracking-widest">{label}</span>
     </div>
     {/* Área vazia para o Streamlabs preencher */}
     <div className="h-5 w-full"></div> 
  </div>
);

const CornerMarker = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
   const styles = {
      tl: 'top-0 left-0 border-t-2 border-l-2',
      tr: 'top-0 right-0 border-t-2 border-r-2',
      bl: 'bottom-0 left-0 border-b-2 border-l-2',
      br: 'bottom-0 right-0 border-b-2 border-r-2'
   };
   return <div className={`absolute w-3 h-3 border-[#4ade80] ${styles[position]} opacity-80 shadow-[0_0_5px_#4ade80]`} />;
};