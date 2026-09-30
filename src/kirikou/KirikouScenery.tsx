import React, { useState } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';

// Traditional West African Bogolan Geometric Border Frieze
export const BogolanFrieze: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '', color = '#E9C46A' }) => {
  return (
    <svg
      viewBox="0 0 240 12"
      preserveAspectRatio="none"
      className={`w-full h-2.5 opacity-85 select-none pointer-events-none ${className}`}
    >
      <path
        d="M0 6 L8 1 L16 6 L8 11 Z M20 6 L28 1 L36 6 L28 11 Z M40 6 L48 1 L56 6 L48 11 Z M60 6 L68 1 L76 6 L68 11 Z M80 6 L88 1 L96 6 L88 11 Z M100 6 L108 1 L116 6 L108 11 Z M120 6 L128 1 L136 6 L128 11 Z M140 6 L148 1 L156 6 L148 11 Z M160 6 L168 1 L176 6 L168 11 Z M180 6 L188 1 L196 6 L188 11 Z M200 6 L208 1 L216 6 L208 11 Z M220 6 L228 1 L236 6 L228 11 Z"
        fill={color}
      />
      <circle cx="8" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="28" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="48" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="68" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="88" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="108" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="128" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="148" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="168" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="188" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="208" cy="6" r="1.5" fill="#FAF0CA" />
      <circle cx="228" cy="6" r="1.5" fill="#FAF0CA" />
    </svg>
  );
};

// 1. Traditional African Adobe Hut (Case Africaine aux motifs peints et toit de chaume)
export const AfricanHut: React.FC<{
  className?: string;
  size?: number;
  patternColor?: string;
  roofColor?: string;
}> = ({
  className = '',
  size = 220,
  patternColor = '#E9C46A',
  roofColor = '#FAF0CA',
}) => {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 200 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg overflow-visible ${className}`}
    >
      {/* Ground Shadow */}
      <ellipse cx="100" cy="222" rx="90" ry="8" fill="#3D2619" fillOpacity="0.25" />

      {/* Round Adobe Clay Wall */}
      <path
        d="M25 110 L22 215 Q100 226 178 215 L175 110 Z"
        fill="#D95D39"
        stroke="#B84927"
        strokeWidth="2.5"
      />

      {/* Inner Wall Ochre Base Band */}
      <path
        d="M23 185 L22 215 Q100 226 178 215 L177 185 Q100 196 23 185 Z"
        fill="#C44E2C"
      />

      {/* Hand-painted Bogolan Geometric Wall Motifs */}
      <g stroke={patternColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Diamond chain motif */}
        <path d="M40 135 L50 125 L60 135 L50 145 Z" />
        <path d="M70 135 L80 125 L90 135 L80 145 Z" />
        <path d="M110 135 L120 125 L130 135 L120 145 Z" />
        <path d="M140 135 L150 125 L160 135 L150 145 Z" />

        {/* Chevron Base Line */}
        <path d="M35 170 L45 160 L55 170 L65 160 L75 170 L85 160 L95 170 L105 160 L115 170 L125 160 L135 170 L145 160 L155 170 L165 160" />
      </g>

      {/* Wooden Arch Doorway */}
      <path
        d="M80 218 L80 148 Q100 132 120 148 L120 218 Z"
        fill="#3D2619"
      />
      {/* Doorway Warm Interior Light */}
      <path
        d="M84 218 L84 152 Q100 138 116 152 L116 218 Z"
        fill="#5A3520"
      />
      <path d="M100 144 L100 218" stroke="#E9C46A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

      {/* Conical Woven Thatched Roof (Toit en paille tressée) */}
      <path
        d="M5 118 Q100 8 100 8 Q100 8 195 118 Q100 130 5 118 Z"
        fill={roofColor}
        stroke="#E8D5B5"
        strokeWidth="2"
      />
      {/* Thatch Layer Texture Bands */}
      <path
        d="M20 98 Q100 108 180 98"
        stroke="#D4BA93"
        strokeWidth="3.5"
        fill="none"
      />
      <path
        d="M38 72 Q100 80 162 72"
        stroke="#D4BA93"
        strokeWidth="3.5"
        fill="none"
      />
      <path
        d="M60 45 Q100 52 140 45"
        stroke="#D4BA93"
        strokeWidth="3"
        fill="none"
      />
      {/* Roof Top Finial / Spike */}
      <path d="M100 8 L100 0" stroke="#3D2619" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="0" r="3.5" fill="#D95D39" />
    </svg>
  );
};

// 2. Majestic Savanna Baobab Tree (Arbre Millénaire de la Savane)
export const BaobabTree: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 320 }) => {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 320 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-xl overflow-visible ${className}`}
    >
      {/* Ground Shadow */}
      <ellipse cx="160" cy="340" rx="140" ry="10" fill="#3D2619" fillOpacity="0.22" />

      {/* Massive Rounded Trunk & Roots */}
      <path
        d="M95 338 Q80 260 115 190 Q125 150 110 120 L130 118 Q140 155 145 180 Q155 150 170 120 L188 122 Q180 155 185 180 Q200 145 220 125 L235 130 Q215 165 205 190 Q240 260 225 338 Q160 348 95 338 Z"
        fill="#5E3821"
        stroke="#482D1D"
        strokeWidth="3"
      />
      {/* Bark Contour Lines */}
      <path d="M130 338 Q120 250 140 210" stroke="#482D1D" strokeWidth="2.5" fill="none" />
      <path d="M165 340 Q160 260 168 215" stroke="#482D1D" strokeWidth="2.5" fill="none" />
      <path d="M195 338 Q200 250 185 210" stroke="#482D1D" strokeWidth="2.5" fill="none" />

      {/* Stylized Rounded Foliage Puffs (Nuages de feuilles savane) */}
      {/* Deep Back Foliage */}
      <circle cx="105" cy="115" r="42" fill="#2D6A4F" />
      <circle cx="215" cy="115" r="46" fill="#2D6A4F" />
      <circle cx="160" cy="90" r="52" fill="#2D6A4F" />

      {/* Mid Foliage */}
      <circle cx="85" cy="95" r="38" fill="#40916C" />
      <circle cx="235" cy="95" r="40" fill="#40916C" />
      <circle cx="140" cy="70" r="46" fill="#40916C" />
      <circle cx="185" cy="70" r="46" fill="#40916C" />

      {/* Top Bright Foliage */}
      <circle cx="160" cy="55" r="42" fill="#52B788" />
      <circle cx="115" cy="75" r="32" fill="#52B788" />
      <circle cx="205" cy="75" r="34" fill="#52B788" />

      {/* Stylized Golden Hanging Fruits of Wisdom (Pains de Singe dorés) */}
      <g fill="#E9C46A" stroke="#482D1D" strokeWidth="1.5">
        <path d="M100 140 L100 152" stroke="#482D1D" strokeWidth="1.5" />
        <ellipse cx="100" cy="158" rx="6" ry="9" />

        <path d="M135 130 L135 144" stroke="#482D1D" strokeWidth="1.5" />
        <ellipse cx="135" cy="150" rx="7" ry="10" />

        <path d="M190 132 L190 146" stroke="#482D1D" strokeWidth="1.5" />
        <ellipse cx="190" cy="152" rx="7" ry="10" />

        <path d="M225 142 L225 154" stroke="#482D1D" strokeWidth="1.5" />
        <ellipse cx="225" cy="160" rx="6" ry="9" />
      </g>
    </svg>
  );
};

// 3. Umbrella Acacia Tree (Acacia Parasol de la Savane)
export const AcaciaTree: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 260 }) => {
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 260 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md overflow-visible ${className}`}
    >
      {/* Ground Shadow */}
      <ellipse cx="130" cy="225" rx="100" ry="6" fill="#3D2619" fillOpacity="0.2" />

      {/* Curved Slender Trunk */}
      <path
        d="M125 225 Q135 160 118 110 Q110 85 105 70 L115 68 Q125 90 132 115 Q145 160 135 225 Z"
        fill="#593D28"
      />
      {/* Side Branch */}
      <path
        d="M128 135 Q155 105 185 85 L180 80 Q150 100 124 125 Z"
        fill="#593D28"
      />

      {/* Main Flat Umbrella Foliage Canopy */}
      {/* Bottom layer */}
      <ellipse cx="110" cy="62" rx="75" ry="15" fill="#2D6A4F" />
      <ellipse cx="190" cy="76" rx="55" ry="12" fill="#2D6A4F" />

      {/* Top tier canopy */}
      <ellipse cx="110" cy="52" rx="65" ry="14" fill="#40916C" />
      <ellipse cx="188" cy="68" rx="46" ry="11" fill="#52B788" />
      <ellipse cx="118" cy="44" rx="48" ry="11" fill="#74C69D" />
    </svg>
  );
};

// 4. Terracotta Clay Pot with Ochre Painted Patterns
export const AfricanClayPot: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 50 }) => {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 50 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md overflow-visible ${className}`}
    >
      <ellipse cx="25" cy="60" rx="20" ry="3" fill="#3D2619" fillOpacity="0.3" />
      {/* Clay Body */}
      <path
        d="M14 12 Q4 32 12 50 Q25 58 38 50 Q46 32 36 12 Z"
        fill="#D95D39"
        stroke="#B84927"
        strokeWidth="1.5"
      />
      {/* Pot Rim */}
      <ellipse cx="25" cy="12" rx="13" ry="4" fill="#E07A5F" stroke="#B84927" strokeWidth="1.5" />
      <ellipse cx="25" cy="12" rx="9" ry="2.5" fill="#8C3A27" />

      {/* Ochre Painted Pattern */}
      <path d="M10 32 Q25 36 40 32" stroke="#E9C46A" strokeWidth="2.5" fill="none" />
      <path d="M12 38 Q25 42 38 38" stroke="#FAF0CA" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
    </svg>
  );
};

// 5. Carved Wooden Storytelling Totem (Totem Sculpté)
export const WoodenTotem: React.FC<{
  className?: string;
  height?: number;
}> = ({ className = '', height = 150 }) => {
  return (
    <svg
      width={height * 0.3}
      height={height}
      viewBox="0 0 45 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md overflow-visible ${className}`}
    >
      <ellipse cx="22.5" cy="148" rx="18" ry="3" fill="#3D2619" fillOpacity="0.25" />
      {/* Wooden Post */}
      <rect x="12" y="25" width="21" height="122" rx="2" fill="#4A2E1B" stroke="#3D2619" strokeWidth="1.5" />

      {/* Carved Diamond / Chevron Reliefs */}
      <path d="M14 45 L22.5 35 L31 45 L22.5 55 Z" fill="#E07A5F" />
      <circle cx="22.5" cy="45" r="2.5" fill="#E9C46A" />

      <path d="M14 75 L22.5 65 L31 75 L22.5 85 Z" fill="#E9C46A" />
      <circle cx="22.5" cy="75" r="2.5" fill="#2A9D8F" />

      <path d="M14 105 L22.5 95 L31 105 L22.5 115 Z" fill="#2A9D8F" />
      <circle cx="22.5" cy="105" r="2.5" fill="#FAF0CA" />

      {/* Sculpted Crown Top */}
      <path d="M7 25 L22.5 5 L38 25 Z" fill="#D95D39" stroke="#B84927" strokeWidth="1.5" />
      <circle cx="22.5" cy="5" r="3" fill="#E9C46A" />
    </svg>
  );
};

// 6. African Calao Bird Soaring Silhouette (Oiseau Calao dans le ciel)
export const FlyingBird: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 38 }) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 50 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-60 animate-floatGentle ${className}`}
    >
      <path
        d="M2 15 Q14 2 25 15 Q36 2 48 15 Q36 22 25 17 Q14 22 2 15 Z"
        fill="#3D2619"
      />
      {/* Calao Bill Silhouette */}
      <path d="M25 15 L28 17 L25 18 Z" fill="#E9C46A" />
    </svg>
  );
};

// 7. Savanna Grasses & Frangipani Flowers
export const SavannaGrasses: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <svg
      width="140"
      height="45"
      viewBox="0 0 140 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className}`}
    >
      {/* Tall curved grass blades */}
      <path d="M10 45 Q15 20 5 2" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 45 Q22 15 32 0" stroke="#40916C" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 45 Q22 25 15 10" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" />

      <path d="M70 45 Q65 18 55 5" stroke="#40916C" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 45 Q88 12 102 2" stroke="#2D6A4F" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M88 45 Q85 24 78 12" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" />

      {/* Red savanna hibiscus / tropical flower */}
      <circle cx="50" cy="24" r="5" fill="#D95D39" />
      <circle cx="45" cy="22" r="4" fill="#E76F51" />
      <circle cx="55" cy="22" r="4" fill="#E76F51" />
      <circle cx="50" cy="18" r="4" fill="#E76F51" />
      <circle cx="50" cy="24" r="2" fill="#E9C46A" />
    </svg>
  );
};

// 8. Traditional African Djembe Drum (Interactive)
export const AfricanDjembe: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
}> = ({ className = '', size = 55, onClick }) => {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 60 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`drop-shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform overflow-visible ${className}`}
    >
      <ellipse cx="30" cy="74" rx="22" ry="4" fill="#3D2619" fillOpacity="0.3" />
      {/* Wooden Body Goblet */}
      <path
        d="M12 18 Q10 42 22 52 L20 72 Q30 76 40 72 L38 52 Q50 42 48 18 Z"
        fill="#5E3821"
        stroke="#3D2619"
        strokeWidth="1.5"
      />
      {/* Animal Skin Head */}
      <ellipse cx="30" cy="18" rx="20" ry="7" fill="#FAF0CA" stroke="#D4BA93" strokeWidth="1.5" />
      <ellipse cx="30" cy="18" rx="13" ry="4.5" fill="#E8D5B5" />

      {/* Tension Ropes (Lacing) */}
      <path
        d="M14 20 L24 50 M20 22 L27 51 M30 23 L30 52 M40 22 L33 51 M46 20 L36 50"
        stroke="#E9C46A"
        strokeWidth="1.2"
      />
      {/* Decorative Red Band */}
      <path d="M22 52 Q30 55 38 52" stroke="#D95D39" strokeWidth="3" />
    </svg>
  );
};

// 9. Sacred Golden Cowrie Shell (Cauri d'Or Mystique - Collectible)
export const SacredCowrie: React.FC<{
  className?: string;
  size?: number;
  isCollected: boolean;
  onClick?: () => void;
}> = ({ className = '', size = 32, isCollected, onClick }) => {
  if (isCollected) return null;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-transform hover:scale-125 active:scale-95 group relative flex items-center justify-center ${className}`}
      title="Cauri d'or mystique — Cliquez pour collecter !"
    >
      {/* Ambient Pulsing Aura */}
      <div className="absolute w-8 h-8 rounded-full bg-[#E9C46A]/40 animate-ping pointer-events-none" />

      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 32 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(233,196,106,0.8)] animate-bounce"
      >
        {/* Cowrie Rounded Shell */}
        <ellipse cx="16" cy="21" rx="14" ry="19" fill="#FAF0CA" stroke="#D4AF37" strokeWidth="2" />
        <ellipse cx="16" cy="21" rx="11" ry="16" fill="#F4D35E" />

        {/* Central Serrated Slit / Mouth */}
        <path
          d="M16 8 Q13 21 16 34"
          stroke="#482D1D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Teeth serrations along the slit */}
        <line x1="12" y1="13" x2="16" y2="13" stroke="#5E3821" strokeWidth="1.5" />
        <line x1="16" y1="17" x2="20" y2="17" stroke="#5E3821" strokeWidth="1.5" />
        <line x1="12" y1="21" x2="16" y2="21" stroke="#5E3821" strokeWidth="1.5" />
        <line x1="16" y1="25" x2="20" y2="25" stroke="#5E3821" strokeWidth="1.5" />
        <line x1="12" y1="29" x2="16" y2="29" stroke="#5E3821" strokeWidth="1.5" />

        {/* Golden Sparkle Glint */}
        <circle cx="10" cy="14" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

// 10. African Campfire with Animated Embers (Feu de Camp de la Veillée)
export const Campfire: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 70 }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Warm Ambient Glow on Ground */}
      <div className="absolute -bottom-2 w-32 h-10 rounded-full bg-[#E76F51]/30 blur-md animate-pulse" />

      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-lg"
      >
        {/* Ring of River Stones */}
        <ellipse cx="20" cy="68" rx="8" ry="4" fill="#6C757D" stroke="#495057" strokeWidth="1" />
        <ellipse cx="33" cy="72" rx="9" ry="4.5" fill="#5A6268" stroke="#343A40" strokeWidth="1" />
        <ellipse cx="48" cy="72" rx="9" ry="4.5" fill="#6C757D" stroke="#495057" strokeWidth="1" />
        <ellipse cx="61" cy="68" rx="8" ry="4" fill="#5A6268" stroke="#343A40" strokeWidth="1" />
        <ellipse cx="40" cy="65" rx="22" ry="5" fill="#3D2619" fillOpacity="0.4" />

        {/* Crossed Wooden Firewood Logs */}
        <path
          d="M22 68 L58 56"
          stroke="#4A2E1B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M58 68 L22 56"
          stroke="#5E3821"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="40" cy="62" r="3" fill="#D95D39" />

        {/* Large Outer Flame */}
        <path
          d="M28 62 Q25 40 40 18 Q55 40 52 62 Q40 68 28 62 Z"
          fill="#D95D39"
          className="animate-[pulse_1.2s_ease-in-out_infinite]"
        />

        {/* Middle Golden Flame */}
        <path
          d="M32 62 Q30 45 40 28 Q50 45 48 62 Q40 66 32 62 Z"
          fill="#E76F51"
        />

        {/* Hot Core Yellow Flame */}
        <path
          d="M36 62 Q35 50 40 38 Q45 50 44 62 Z"
          fill="#E9C46A"
        />

        {/* Rising Glowing Ember Sparks */}
        <circle cx="34" cy="22" r="1.5" fill="#FAF0CA" className="animate-ping" />
        <circle cx="46" cy="16" r="1.8" fill="#E9C46A" className="animate-pulse" />
        <circle cx="38" cy="10" r="1.2" fill="#E76F51" />
      </svg>
    </div>
  );
};

// 11. Savanna Fireflies Swarm for Night Mode (Lucioles de la Nuit)
export const FirefliesSwarm: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {[
        { x: '15%', y: '40%', d: '0s', s: 3 },
        { x: '25%', y: '65%', d: '1.2s', s: 4 },
        { x: '52%', y: '35%', d: '0.6s', s: 3.5 },
        { x: '58%', y: '55%', d: '1.8s', s: 3 },
        { x: '63%', y: '42%', d: '2.4s', s: 4.5 },
        { x: '75%', y: '50%', d: '0.9s', s: 3 },
        { x: '88%', y: '60%', d: '1.5s', s: 4 },
      ].map((fly, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#FAF0CA] animate-pulse"
          style={{
            left: fly.x,
            top: fly.y,
            width: `${fly.s}px`,
            height: `${fly.s}px`,
            boxShadow: '0 0 10px #FAF0CA, 0 0 18px #E9C46A',
            animationDuration: '2.5s',
            animationDelay: fly.d,
          }}
        />
      ))}
    </div>
  );
};

// 12. Interactive Perched Calao Bird
export const PerchedCalao: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 32 }) => {
  const [hasFlown, setHasFlown] = useState(false);
  const playInteract = useAudioStore((s) => s.playInteract);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInteract();
    setHasFlown(true);
    setTimeout(() => setHasFlown(false), 8000);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-1000 ${
        hasFlown ? '-translate-y-48 translate-x-48 opacity-0 scale-75' : 'hover:scale-110'
      } ${className}`}
      title="Calao curieux — Cliquez pour le voir s'envoler !"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bird Body */}
        <ellipse cx="20" cy="22" rx="10" ry="12" fill="#2B201A" />
        {/* White Breast */}
        <ellipse cx="23" cy="23" rx="5" ry="8" fill="#FAF0CA" />
        {/* Curved Golden Horn Bill */}
        <path d="M26 16 Q36 12 34 22 L26 19 Z" fill="#E9C46A" />
        <circle cx="24" cy="16" r="1.5" fill="#FAF0CA" />
        {/* Tail feathers */}
        <path d="M12 28 L6 36 L14 30 Z" fill="#2B201A" />
      </svg>
    </div>
  );
};


