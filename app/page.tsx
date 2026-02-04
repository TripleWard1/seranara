'use client';

import React, { useState, useEffect } from 'react';

// ASSETS
// Nota: Corrigi o link do Chibi (estava com o link do símbolo) para aparecer o boneco
const SHIKAMARU_CHIBI = 'https://i.imgur.com/etDvEDY.png';
const SHIKAMARU_HEAD = 'https://i.imgur.com/rq4bWai.png';

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Space+Grotesk:wght@300;700&family=Shojumaru&display=swap');
        
        .font-ninja { font-family: 'Cinzel Decorative', cursive; }
        .font-hud { font-family: 'Space Grotesk', sans-serif; }
        .font-naruto { font-family: 'Shojumaru', system-ui; }

        .kage-shadow-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #4ade80, transparent);
          box-shadow: 0 0 15px #4ade80;
          animation: pulse-width 3s ease-in-out infinite;
        }

        @keyframes pulse-width {
          0%, 100% { opacity: 0.5; width: 80%; }
          50% { opacity: 1; width: 100%; }
        }

        .scanline {
          width: 100%;
          height: 100px;
          z-index: 10;
          background: linear-gradient(0deg, rgba(74, 222, 128, 0.05) 0%, transparent 100%);
          animation: scan 4s linear infinite;
        }

        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(400%); }
        }
      `,
        }}
      />

      {/* --- 1. PAINEL CENTRAL --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] z-50">
        <div className="flex flex-col items-center">
          {/* Cabeça do Shikamaru (Nova Adição) */}
          <div className="absolute -top-2 z-50 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            <img
              src={SHIKAMARU_HEAD}
              className="w-20 h-20 object-contain"
              alt="Shikamaru Head"
            />
          </div>

          <div className="flex items-center justify-center gap-0 w-full mt-10">
            {' '}
            {/* Ajustei mt-2 para mt-10 para dar espaço à cabeça */}
            <div className="flex gap-1">
              <StatBox label="ÚLTIMO SUB" value="" align="right" />
              <StatBox label="SEGUIDOR" value="" align="right" />
            </div>
            <div className="relative px-10 py-4 flex flex-col items-center min-w-[300px]">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md border-b-2 border-[#4ade80]" />
              <h1 className="relative z-10 font-ninja text-4xl tracking-tighter mt-2">
                SERA <span className="text-[#4ade80]">NARA</span>
              </h1>
              <div className="relative z-10 flex items-center gap-2 opacity-60">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="font-hud text-[9px] font-bold tracking-[0.4em] uppercase">
                  Tactical Live {time}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <StatBox label="DONATIVO" value="" align="left" />
              <StatBox label="BITS" value="" align="left" />
            </div>
          </div>
          <div className="kage-shadow-line w-full -mt-[2px]" />
        </div>
      </div>

      {/* --- 2. WEBCAM --- */}
      <div className="absolute top-28 right-12 z-40">
        <div className="relative w-[400px] aspect-video border border-white/10 bg-black/20 overflow-visible backdrop-blur-[2px]">
          <div className="scanline absolute inset-0 pointer-events-none overflow-hidden" />

          {/* Chibi Imersivo por baixo da Webcam */}
          <img
            src={SHIKAMARU_CHIBI}
            className="absolute -left-10 -bottom-10 w-32 h-32 object-contain z-50 drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)] transform rotate-6"
            alt="Shikamaru Webcam Guard"
          />
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  align,
}: {
  label: string;
  value: string;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={`flex flex-col bg-black/40 backdrop-blur-sm px-5 py-2 border-b border-white/5 min-w-[140px] ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <span className="text-[#4ade80] font-hud text-[8px] font-black tracking-widest opacity-70 uppercase">
        {label}
      </span>
      <span className="text-white font-hud text-xs font-bold tracking-tight uppercase h-4">
        {value}
      </span>
    </div>
  );
}
