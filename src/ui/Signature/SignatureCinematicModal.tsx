import React, { useEffect, useRef, useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { Sparkles, Mail, Linkedin, ArrowRight, X } from 'lucide-react';

export const SignatureCinematicModal: React.FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const openContactModal = useUIStore((s) => s.openContactModal);
  const toggleRecruiterMode = useUIStore((s) => s.toggleRecruiterMode);
  const playSuccess = useAudioStore((s) => s.playSuccess);
  const playInteract = useAudioStore((s) => s.playInteract);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phaseText, setPhaseText] = useState('JUNES AGASSOUNON');
  const [subText, setSubText] = useState('DÉVELOPPEUR WEB × GRAPHISTE');
  const [isFinalCallToAction, setIsFinalCallToAction] = useState(false);

  useEffect(() => {
    if (activeModal !== 'signature_cinematic') {
      setIsFinalCallToAction(false);
      return;
    }

    playSuccess();

    // Sequence stages
    const t1 = setTimeout(() => {
      setPhaseText('INGÉNIERIE & ART DIRECTION');
      setSubText('DU CODE ROBUSTE AU DESIGN D’IMPACT');
    }, 2800);

    const t2 = setTimeout(() => {
      setPhaseText('IMAGINER. BÂTIR. ÉLEVER.');
      setSubText('EXPÉRIENCES IMMERSIVES & HAUTE PERFORMANCE');
    }, 5600);

    const t3 = setTimeout(() => {
      setPhaseText('CRÉONS VOTRE PROCHAINE EXPÉRIENCE.');
      setSubText('DISPONIBLE POUR MISSIONS AMBITIEUSES & RÔLES CLÉS');
      setIsFinalCallToAction(true);
    }, 8400);

    // Warm golden savanna particle convergence
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = ['#E9C46A', '#D95D39', '#2A9D8F', '#FAF0CA'];
    const particleCount = 220;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5,
      radius: Math.random() * 2.5 + 1.2,
      targetX: width / 2 + (Math.random() - 0.5) * 450,
      targetY: height / 2 + (Math.random() - 0.5) * 220,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(43, 32, 26, 0.22)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += (p.targetX - p.x) * 0.035 + p.vx;
        p.y += (p.targetY - p.y) * 0.035 + p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(animId);
    };
  }, [activeModal, playSuccess]);

  if (activeModal !== 'signature_cinematic') return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#2B201A] via-[#3D2619] to-[#1C120C] text-[#FAF0CA] overflow-hidden font-sans select-none animate-fadeIn">
      {/* Background Particle Convergence Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Close button top right */}
      <button
        onClick={() => {
          playInteract();
          closeModal();
        }}
        className="absolute top-6 right-6 p-3 text-[#E9C46A] hover:text-white bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 rounded-full backdrop-blur-md transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Center Narrative Typographic Core */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D95D39]/25 border border-[#E9C46A]/50 rounded-full text-xs font-mono text-[#E9C46A] uppercase tracking-widest font-bold shadow-lg">
          <Sparkles className="w-4 h-4 text-[#E9C46A] animate-spin-slow" />
          <span>SÉQUENCE SIGNATURE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight transition-all duration-700 bg-clip-text text-transparent bg-gradient-to-r from-[#FAF0CA] via-[#E9C46A] to-[#D95D39] drop-shadow-lg">
          {phaseText}
        </h1>

        <p className="text-sm sm:text-base md:text-xl font-mono text-[#FAF0CA]/80 max-w-xl transition-all duration-500 font-medium">
          {subText}
        </p>

        {/* Action Buttons (Visible at conclusion) */}
        {isFinalCallToAction && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 animate-fadeIn">
            <button
              onClick={() => {
                playInteract();
                openContactModal();
              }}
              className="flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>CONTACTER JUNES</span>
            </button>

            <button
              onClick={() => {
                playInteract();
                toggleRecruiterMode(true);
              }}
              className="flex items-center gap-2 px-7 py-4 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF0CA] border border-[#E9C46A]/40 font-mono font-bold text-sm rounded-2xl transition-all"
            >
              <span>EXPLORER LE DOSSIER COMPLET</span>
              <ArrowRight className="w-4 h-4 text-[#E9C46A]" />
            </button>

            <a
              href="https://linkedin.com/in/junes-agassounon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF0CA] border border-white/20 font-mono text-sm rounded-2xl transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#E9C46A]" />
              <span>LINKEDIN</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
