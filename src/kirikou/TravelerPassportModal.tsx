import React, { useState, useRef, useEffect } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';
import {
  Download,
  Share2,
  Check,
  Copy,
  Award,
  X,
  RefreshCw,
} from 'lucide-react';

interface TravelerPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectedCowriesCount: number;
}

export const TravelerPassportModal: React.FC<TravelerPassportModalProps> = ({
  isOpen,
  onClose,
  collectedCowriesCount,
}) => {
  const [visitorName, setVisitorName] = useState<string>('Voyageur du Web');
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const playSuccess = useAudioStore((s) => s.playSuccess);
  const playInteract = useAudioStore((s) => s.playInteract);

  // Generate procedural Bogolan Seed hash from name
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  // Render high-definition artistic passport on HTML5 Canvas (840 x 540)
  const drawPassport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 840;
    const height = 540;
    canvas.width = width;
    canvas.height = height;

    const name = visitorName.trim() || 'Voyageur Curieux';
    const hash = getHash(name);

    // 1. Warm Savanna Parchment Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#FAF7F2');
    bgGrad.addColorStop(0.5, '#F5EDE0');
    bgGrad.addColorStop(1, '#EDE2D0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Double Border with Terracotta & Golden Ochre
    ctx.strokeStyle = '#D95D39';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.strokeStyle = '#E9C46A';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(22, 22, width - 44, height - 44);

    // 3. Corner Bogolan Geometric Chevrons
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = '#8C4A28';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(24, 0);
      ctx.lineTo(24, 24);
      ctx.lineTo(0, 24);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#D95D39';
      ctx.beginPath();
      ctx.moveTo(12, 4);
      ctx.lineTo(20, 12);
      ctx.lineTo(12, 20);
      ctx.lineTo(4, 12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    drawCorner(28, 28, 0);
    drawCorner(width - 52, 28, 0);
    drawCorner(28, height - 52, 0);
    drawCorner(width - 52, height - 52, 0);

    // 4. Header Titles
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('✦ ROYAUME DU CODE & EXPÉDITION DU SAHEL ✦', width / 2, 54);

    ctx.fillStyle = '#2B201A';
    ctx.font = '900 24px system-ui, -apple-system, sans-serif';
    ctx.fillText('PASSEPORT DU VOYAGEUR INITIÉ', width / 2, 84);

    ctx.fillStyle = '#D95D39';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('PORTFOLIO OFFICIEL DE JUNES AGASSOUNON · DÉVELOPPEUR WEB & GRAPHISTE', width / 2, 106);

    // Horizontal Separator Line
    ctx.strokeStyle = '#D95D39';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.lineTo(width - 60, 120);
    ctx.stroke();

    // ========================================================
    // LEFT COLUMN : Procedural Bogolan Seal & Identity (x: 50 to 380)
    // ========================================================
    // Frame for Seal
    ctx.fillStyle = '#FAF0CA';
    ctx.fillRect(60, 140, 160, 160);
    ctx.strokeStyle = '#D4BA93';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 140, 160, 160);

    // Procedural Bogolan Seal Canvas Drawing
    const sealCx = 140;
    const sealCy = 220;

    // Diamond Shield outer
    ctx.save();
    ctx.translate(sealCx, sealCy);
    ctx.fillStyle = '#D95D39';
    ctx.beginPath();
    ctx.moveTo(0, -60);
    ctx.lineTo(60, 0);
    ctx.lineTo(0, 60);
    ctx.lineTo(-60, 0);
    ctx.closePath();
    ctx.fill();

    // Inner Diamond
    ctx.fillStyle = '#264653';
    ctx.beginPath();
    ctx.moveTo(0, -42);
    ctx.lineTo(42, 0);
    ctx.lineTo(0, 42);
    ctx.lineTo(-42, 0);
    ctx.closePath();
    ctx.fill();

    // Procedural Ray pattern derived from name hash
    ctx.strokeStyle = '#E9C46A';
    ctx.lineWidth = 2.5;
    const numRays = 4 + (hash % 5) * 2;
    for (let r = 0; r < numRays; r++) {
      const angle = (r * Math.PI * 2) / numRays;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 12, Math.sin(angle) * 12);
      ctx.lineTo(Math.cos(angle) * 34, Math.sin(angle) * 34);
      ctx.stroke();
    }

    // Sacred Center Cowrie in Seal
    ctx.fillStyle = '#FFFDF0';
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3D2619';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCEAU BOGOLAN UNIQUE', sealCx, 316);

    // Identity fields (to the right of the seal)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('NOM DU VOYAGEUR :', 240, 160);

    ctx.fillStyle = '#1C120C';
    ctx.font = 'bold 19px system-ui, sans-serif';
    ctx.fillText(name.slice(0, 24), 240, 186);

    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('DATE DE TRAVERSÉE :', 240, 218);

    const todayStr = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    ctx.fillStyle = '#2B201A';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(todayStr, 240, 238);

    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('STATUT DU VOYAGEUR :', 240, 268);

    ctx.fillStyle = '#2A9D8F';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('✦ INITIÉ DU CODE & TÉMOIN DU CONTE ✦', 240, 288);

    // ========================================================
    // RIGHT COLUMN : 5 Chapter Ritual Stamps & Cowries (x: 480 to 800)
    // ========================================================
    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('TAMPONS RITUELS DES 5 CHAPITRES VALIDÉS :', 490, 160);

    const stampLabels = [
      { name: '1. VILLAGE', color: '#D95D39', x: 530, y: 205 },
      { name: '2. CRÉATIONS', color: '#E76F51', x: 620, y: 205 },
      { name: '3. BAOBAB', color: '#2A9D8F', x: 710, y: 205 },
      { name: '4. PALABRE', color: '#E9C46A', x: 575, y: 275 },
      { name: '5. ÉPILOGUE', color: '#8C4A28', x: 665, y: 275 },
    ];

    stampLabels.forEach((st) => {
      // Circular wax stamp
      ctx.save();
      ctx.translate(st.x, st.y);
      ctx.rotate(((hash % 10) - 5) * 0.03); // Slight realistic stamp angle

      ctx.strokeStyle = st.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = st.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = st.color;
      ctx.font = '900 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VALIDÉ', 0, -10);
      ctx.font = 'bold 7px monospace';
      ctx.fillText(st.name, 0, 4);
      ctx.fillText('★ JA ★', 0, 16);
      ctx.restore();
    });

    // Cowries discovery status badge
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(490, 318, 290, 34);
    ctx.strokeStyle = '#E9C46A';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(490, 318, 290, 34);

    ctx.fillStyle = '#8C4A28';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('CAURIS SACRÉS DU SAHEL :', 505, 340);

    // 4 Cowrie icons
    for (let c = 0; c < 4; c++) {
      const cx = 680 + c * 24;
      const cy = 335;
      const isFound = c < Math.max(1, collectedCowriesCount);

      ctx.fillStyle = isFound ? '#FFFDF0' : '#D4BA93';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 6, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3D2619';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx, cy + 6);
      ctx.stroke();
    }

    // ========================================================
    // BOTTOM AREA : Scribe Wisdom & Official Signature
    // ========================================================
    // Quote Box
    ctx.fillStyle = '#F2E8DC';
    ctx.fillRect(60, 370, width - 120, 85);
    ctx.strokeStyle = '#D95D39';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(60, 370, width - 120, 85);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#3D2619';
    ctx.font = 'italic 13px system-ui, serif';
    ctx.fillText(
      '« Qui marche dans la savane avec curiosité repart enrichi de sagesse et de code durable. »',
      width / 2,
      400
    );

    ctx.fillStyle = '#D95D39';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(
      'Parole de Junes AGASSOUNON · Développeur Web & Graphiste',
      width / 2,
      422
    );

    ctx.fillStyle = '#2A9D8F';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(
      '✦ Rigueur TypeScript 100% · Graphisme Vectoriel & UI au Code · Architecture Propre ✦',
      width / 2,
      442
    );

    // Official Seal Footer
    ctx.fillStyle = '#7A583A';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(
      `CERTIFICAT D’EXPÉDITION OFFICIEL · ID #${(hash % 99999).toString().padStart(5, '0')} · portfolio-junes-agassounon.dev`,
      width / 2,
      485
    );
  };

  // Re-render canvas whenever name or cowries count change
  useEffect(() => {
    if (isOpen) {
      setTimeout(drawPassport, 60);
    }
  }, [isOpen, visitorName, collectedCowriesCount]);

  if (!isOpen) return null;

  // 1-Click PNG Download
  const handleDownload = () => {
    playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `passeport-voyageur-junes-agassounon-${visitorName
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`;
    link.href = imageUri;
    link.click();
  };

  // 1-Click LinkedIn Share
  const handleShareLinkedIn = () => {
    playSuccess();
    const shareText = encodeURIComponent(
      `Je viens de vivre une expérience interactive incroyable à travers la savane africaine de Junes AGASSOUNON (Développeur Web & Graphiste) ! Un univers web inspiré du patrimoine ouest-africain avec musique mandingue, conteur et 100% de rigueur logicielle. À découvrir absolument !`
    );
    const siteUrl = encodeURIComponent(window.location.origin);
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${shareText}%0A%0A${siteUrl}`;
    window.open(linkedInUrl, '_blank');
  };

  // Copy Direct Link
  const handleCopyLink = () => {
    playInteract();
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-none animate-fadeIn select-none font-sans">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] border-2 border-[#D95D39]/30 rounded-3xl p-5 md:p-7 shadow-2xl overflow-hidden text-[#2B201A] max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playInteract();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-black/5 hover:bg-[#D95D39] hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D95D39] to-[#E9C46A] text-white flex items-center justify-center shadow-md">
            <Award className="w-6 h-6 text-[#FAF0CA]" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D95D39]">
              RÉCOMPENSE &amp; SOUVENIR OFFICIEL
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold">
              Le Passeport du Voyageur de la Savane
            </h3>
          </div>
        </div>

        {/* Customization Name Input */}
        <div className="p-3.5 bg-[#FFFDF7] border border-[#D95D39]/20 rounded-2xl mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="text-xs font-mono font-bold text-[#8C4A28] flex items-center gap-2">
            <span>Personnaliser avec votre nom ou société :</span>
          </label>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Votre Nom ou Entreprise..."
              className="px-3.5 py-1.5 border border-[#D95D39]/30 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#D95D39] bg-white w-full sm:w-64"
            />
            <button
              onClick={() => {
                playInteract();
                drawPassport();
              }}
              className="p-2 rounded-xl bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#8C4A28] transition-all"
              title="Régénérer le Sceau Bogolan"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="w-full overflow-x-auto rounded-2xl border-2 border-[#D95D39]/30 shadow-inner bg-white flex justify-center p-2 mb-5">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[800px] h-auto rounded-xl shadow-md"
            style={{ aspectRatio: '840 / 540' }}
          />
        </div>

        {/* Action Buttons: Download, LinkedIn, Share */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Download PNG Button */}
          <button
            onClick={handleDownload}
            className="py-3 px-4 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:opacity-95 text-white font-mono font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>TÉLÉCHARGER (PNG)</span>
          </button>

          {/* Share on LinkedIn Button */}
          <button
            onClick={handleShareLinkedIn}
            className="py-3 px-4 bg-[#0A66C2] hover:bg-[#084e96] text-white font-mono font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
          >
            <Share2 className="w-4 h-4" />
            <span>PARTAGER LINKEDIN</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="py-3 px-4 bg-[#2A9D8F] hover:bg-[#218175] text-white font-mono font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-[#FAF0CA]" />
                <span>LIEN COPIÉ !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPIER LE LIEN</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
