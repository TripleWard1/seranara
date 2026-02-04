'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Para animações suaves
import { User, Heart, DollarSign, Zap, Radio } from 'lucide-react'; // Ícones profissionais

// ASSETS CORRIGIDOS
// Nota: Organizei os links para garantir que cada imagem é a correta
const ASSETS = {
  SHIKAMARU_BODY: 'https://i.imgur.com/E8845Uf.png',
  SHIKAMARU_HEAD: 'https://i.imgur.com/rq4bWai.png',
  NARA_SYMBOL: 'https://i.imgur.com/etDvEDY.png'
};

export default function SeraNaraTacticalHUD() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Relógio
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
      {/* Estilos Globais de Fonte e Efeitos */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Space+Grotesk:wght@300;400;700&family=Shojumaru&display=swap');
        
        .font-ninja { font-family: 'Cinzel Decorative', cursive; }
        .font-hud { font-family: 'Space Grotesk', sans-serif; }
        .font-naruto { font-family: 'Shojumaru', system-ui; }

        .scanline {
          background: linear-gradient(to bottom, rgba(74,222,128,0), rgba(74,222,128,0.1) 50%, rgba(74,222,128,0));
          background-size: 100% 4px;
          animation: scan 10s linear infinite;
        }

        @keyframes scan {
          0% { background-position: 0 -100vh; }
          100% { background-position: 0 100vh; }
        }

        .neon-shadow {
          text-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
        }
      `}</style>

      {/* --- 1. BARRA SUPERIOR TÁTICA (REMODELADA) --- */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1100px]">
        <div className="relative flex items-start justify-center">
          
          {/* Lado Esquerdo: Stats Sociais */}
          <div className="flex items-center mt-6 mr-[-20px]">
            <TacticalBar side="left">
              <StatItem icon={<User size={14} />} label="Last Sub" value="N/A" />
              <div className="w-[1px] h-6 bg-white/10 mx-4" />
              <StatItem icon={<Heart size={14} />} label="Follower" value="N/A" />
            </TacticalBar>
          </div>

          {/* Centro: Logótipo e Cabeça */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Cabeça do Shikamaru com Anel de Energia */}
            <div className="relative -mb-6 z-20">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto w-24 h-24 border-2 border-dashed border-[#4ade80]/30 rounded-full"
              />
              <div className="relative w-20 h-20 bg-black/60 rounded-full border border-[#4ade80]/50 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                <img 
                  src={ASSETS.SHIKAMARU_HEAD} 
                  className="w-16 h-16 object-contain mt-2" 
                  alt="Head"
                />
              </div>
            </div>

            {/* Placa Principal do Nome */}
            <div className="relative pt-8 pb-3 px-12 bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-md border-x border-b border-[#4ade80]/50 clip-path-polygon">
               {/* Detalhes Decorativos */}
               <div className="absolute top-0 left-0 w-2 h-2 bg-[#4ade80]" />
               <div className="absolute top-0 right-0 w-2 h-2 bg-[#4ade80]" />

               <div className="flex flex-col items-center">
                  <h1 className="font-ninja text-4xl tracking-tighter neon-shadow">
                    SERA <span className="text-[#4ade80]">NARA</span>
                  </h1>
                  
                  {/* Indicador LIVE */}
                  <div className="flex items-center gap-2 mt-1 px-3 py-0.5 bg-[#4ade80]/10 rounded border border-[#4ade80]/20">
                    <Radio size={10} className="text-red-500 animate-pulse" />
                    <span className="font-hud text-[10px] font-bold tracking-[0.2em] uppercase text-[#4ade80]">
                      TACTICAL LIVE // {time}
                    </span>
                  </div>
               </div>
            </div>
            
            {/* Linha de Energia Inferior */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent shadow-[0_0_10px_#4ade80]" />
          </div>

          {/* Lado Direito: Stats Monetários */}
          <div className="flex items-center mt-6 ml-[-20px]">
             <TacticalBar side="right">
              <StatItem icon={<DollarSign size={14} />} label="Donation" value="N/A" />
              <div className="w-[1px] h-6 bg-white/10 mx-4" />
              <StatItem icon={<Zap size={14} />} label="Bits" value="N/A" />
            </TacticalBar>
          </div>

        </div>
      </div>

      {/* --- 2. WEBCAM IMERSIVA --- */}
      <div className="absolute top-32 right-12 z-40">
        {/* Moldura Tática */}
        <div className="relative w-[400px] aspect-video group">
            
            {/* Fundo da Cam (só aparece se não tiver cam, útil para teste) */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] border border-white/10" />

            {/* Cantos Táticos */}
            <CornerMarker position="top-left" />
            <CornerMarker position="top-right" />
            <CornerMarker position="bottom-left" />
            <CornerMarker position="bottom-right" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none scanline" />

            {/* Chibi - Posição Ajustada e Imersiva */}
            <div className="absolute -left-8 -bottom-16 z-50 filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
                <motion.img
                    src={ASSETS.SHIKAMARU_BODY}
                    alt="Shikamaru Guard"
                    className="w-40 h-40 object-contain"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Label da Cam */}
            <div className="absolute -top-3 right-0">
                <div className="bg-black/80 backdrop-blur border border-[#4ade80]/30 px-2 py-0.5 transform skew-x-[-10deg]">
                    <span className="font-hud text-[9px] text-[#4ade80] tracking-widest font-bold uppercase not-italic">
                        CAM_01 // ACTIVE
                    </span>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTES PARA ORGANIZAÇÃO ---

// Barras laterais inclinadas (efeito tático)
function TacticalBar({ children, side }: { children: React.ReactNode, side: 'left' | 'right' }) {
    const skewClass = side === 'left' ? 'skew-x-[20deg]' : '-skew-x-[20deg]';
    const contentSkew = side === 'left' ? '-skew-x-[20deg]' : 'skew-x-[20deg]';
    const gradient = side === 'left' 
        ? 'bg-gradient-to-r from-transparent via-black/80 to-black/90' 
        : 'bg-gradient-to-l from-transparent via-black/80 to-black/90';

    return (
        <div className={`relative h-12 px-8 flex items-center ${gradient} border-b border-[#4ade80]/30 backdrop-blur-sm ${skewClass}`}>
            <div className={`${contentSkew} flex items-center`}>
                {children}
            </div>
        </div>
    );
}

// Item individual de estatística
function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex flex-col items-start min-w-[80px]">
            <div className="flex items-center gap-1.5 text-[#4ade80]/70 mb-0.5">
                {icon}
                <span className="font-hud text-[9px] font-bold tracking-wider uppercase opacity-80">{label}</span>
            </div>
            <span className="font-hud text-sm font-bold tracking-tight text-white">{value}</span>
        </div>
    );
}

// Marcadores dos cantos da webcam
function CornerMarker({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
    const styles = {
        'top-left': 'top-0 left-0 border-t-2 border-l-2',
        'top-right': 'top-0 right-0 border-t-2 border-r-2',
        'bottom-left': 'bottom-0 left-0 border-b-2 border-l-2',
        'bottom-right': 'bottom-0 right-0 border-b-2 border-r-2',
    };

    return (
        <div className={`absolute w-6 h-6 border-[#4ade80] ${styles[position]} opacity-60`} />
    );
}