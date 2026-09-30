import React, { useState } from 'react';
import {
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Activity,
  Layers,
  Sparkles,
  Truck,
  Copy,
  Check,
  Cpu,
} from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';

// =========================================================================
// 1. MINI-DÉMO JOUABLE : AGRI-PULSE (Simulateur IoT & Irrigation Intelligente)
// =========================================================================
export const AgriPulseDemo: React.FC = () => {
  const [weather, setWeather] = useState<'sun' | 'rain' | 'harmattan'>('sun');
  const [pumpActive, setPumpActive] = useState<boolean>(false);
  const playInteract = useAudioStore((s) => s.playInteract);
  const playSuccess = useAudioStore((s) => s.playSuccess);

  // Computed live telemetry based on weather & pump
  const soilMoisture =
    weather === 'rain' ? 88 : pumpActive ? 74 : weather === 'harmattan' ? 18 : 42;
  const temperature = weather === 'harmattan' ? 39 : weather === 'sun' ? 33 : 24;
  const solarPower = weather === 'sun' ? 98 : weather === 'harmattan' ? 70 : 25;
  const cropHealth = soilMoisture > 30 && soilMoisture < 85 ? 'Optimale' : 'Stress hydrique';

  const togglePump = () => {
    playInteract();
    setPumpActive(!pumpActive);
    if (!pumpActive) playSuccess();
  };

  return (
    <div className="p-4 bg-[#FAF7F2] border-2 border-[#D95D39]/20 rounded-2xl text-[#2B201A]">
      <div className="flex items-center justify-between mb-3 border-b border-[#D95D39]/15 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase text-[#D95D39]">
            DÉMO LIVE • Télémétrie Capteurs LoRaWAN
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#2A9D8F]/15 text-[#2A9D8F] rounded-full">
          Temps Réel
        </span>
      </div>

      {/* Weather Condition Controls */}
      <div className="mb-3">
        <div className="text-[10px] font-mono text-[#7A583A] mb-1.5 font-bold">
          CONDITIONS MÉTÉOROLOGIQUES EN DIRECT :
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              playInteract();
              setWeather('sun');
            }}
            className={`p-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              weather === 'sun'
                ? 'bg-[#E9C46A] text-[#3D2619] shadow-sm'
                : 'bg-white border border-[#D95D39]/15 hover:bg-[#F3EDE2]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span>Soleil</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playInteract();
              setWeather('rain');
            }}
            className={`p-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              weather === 'rain'
                ? 'bg-[#2A9D8F] text-white shadow-sm'
                : 'bg-white border border-[#D95D39]/15 hover:bg-[#F3EDE2]'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Pluie</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playInteract();
              setWeather('harmattan');
            }}
            className={`p-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
              weather === 'harmattan'
                ? 'bg-[#D95D39] text-white shadow-sm'
                : 'bg-white border border-[#D95D39]/15 hover:bg-[#F3EDE2]'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Harmattan</span>
          </button>
        </div>
      </div>

      {/* Live Gauges Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {/* Soil Moisture */}
        <div className="p-2.5 bg-white rounded-xl border border-[#D95D39]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
            <span>HUMIDITÉ DU SOL</span>
            <Droplets className="w-3 h-3 text-[#2A9D8F]" />
          </div>
          <div className="text-xl font-extrabold font-mono text-[#2A9D8F] my-1">
            {soilMoisture}%
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2A9D8F] transition-all duration-500 rounded-full"
              style={{ width: `${soilMoisture}%` }}
            />
          </div>
        </div>

        {/* Temperature */}
        <div className="p-2.5 bg-white rounded-xl border border-[#D95D39]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
            <span>TEMPÉRATURE</span>
            <Sun className="w-3 h-3 text-[#D95D39]" />
          </div>
          <div className="text-xl font-extrabold font-mono text-[#D95D39] my-1">
            {temperature}°C
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D95D39] transition-all duration-500 rounded-full"
              style={{ width: `${(temperature / 50) * 100}%` }}
            />
          </div>
        </div>

        {/* Solar Battery */}
        <div className="p-2.5 bg-white rounded-xl border border-[#D95D39]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
            <span>ÉNERGIE SOLAIRE</span>
            <Cpu className="w-3 h-3 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold font-mono text-amber-600 my-1">
            {solarPower}%
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-500 rounded-full"
              style={{ width: `${solarPower}%` }}
            />
          </div>
        </div>

        {/* Crop State */}
        <div className="p-2.5 bg-white rounded-xl border border-[#D95D39]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
            <span>ÉTAT CULTURE</span>
            <Activity className="w-3 h-3 text-indigo-500" />
          </div>
          <div className="text-xs font-extrabold font-mono text-indigo-700 my-1 truncate">
            {cropHealth}
          </div>
          <span className="text-[9px] font-mono text-gray-500">Parcelle #4 - Mil</span>
        </div>
      </div>

      {/* Smart Actuator Controller */}
      <div className="flex items-center justify-between p-3 bg-white border border-[#D95D39]/15 rounded-xl">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              pumpActive ? 'bg-emerald-500 animate-ping' : 'bg-gray-300'
            }`}
          />
          <div>
            <div className="text-xs font-mono font-bold text-[#2B201A]">
              Pompe d'irrigation goutte-à-goutte
            </div>
            <div className="text-[10px] font-mono text-gray-500">
              {pumpActive ? 'En cours d’arrosage (+18L/min)' : 'En veille automatique'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePump}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
            pumpActive
              ? 'bg-rose-600 text-white hover:bg-rose-700'
              : 'bg-[#2A9D8F] text-white hover:bg-[#238276]'
          }`}
        >
          {pumpActive ? 'Arrêter la pompe' : 'Activer l’irrigation'}
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// 2. MINI-DÉMO JOUABLE : LUMINA LUXURY (Studio Créatif Haute Horlogerie)
// =========================================================================
export const LuminaLuxuryDemo: React.FC = () => {
  const [material, setMaterial] = useState<'gold' | 'ebony' | 'titanium'>('gold');
  const [dial, setDial] = useState<'malachite' | 'agadez' | 'terracotta'>('malachite');
  const playInteract = useAudioStore((s) => s.playInteract);

  const materialsConfig = {
    gold: { name: 'Or Rouge du Mali 18k', color: '#D4AF37', ring: '#B8860B' },
    ebony: { name: 'Bois d’Ébène poli', color: '#2C221E', ring: '#1A1412' },
    titanium: { name: 'Titane Brossé Sahara', color: '#8E8D8A', ring: '#6B6A68' },
  };

  const dialConfig = {
    malachite: { name: 'Malachite du Congo (Bandes Vertes)', bg: '#1E4620', accent: '#52B788' },
    agadez: { name: 'Nuit d’Agadez (Bleu Étoilé)', bg: '#0D1B2A', accent: '#FAF0CA' },
    terracotta: { name: 'Terre Cuite d’Abomey (Ocre)', bg: '#8C3A27', accent: '#E9C46A' },
  };

  return (
    <div className="p-4 bg-[#FAF7F2] border-2 border-[#D95D39]/20 rounded-2xl text-[#2B201A]">
      <div className="flex items-center justify-between mb-3 border-b border-[#D95D39]/15 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D95D39]" />
          <span className="text-[11px] font-mono font-bold uppercase text-[#D95D39]">
            DÉMO LIVE • Atelier de Configuration Haute Horlogerie
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#7A583A]">Rendu Vectoriel HD</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Left: Interactive Vector Timepiece Visualizer */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#1E1C2E] rounded-2xl shadow-inner relative overflow-hidden">
          <div className="absolute top-2 left-2 text-[9px] font-mono text-white/50">
            CADRAN LUXE JA-01
          </div>

          <svg width="170" height="170" viewBox="0 0 170 170" className="drop-shadow-2xl">
            {/* Outer Case Bezel */}
            <circle
              cx="85"
              cy="85"
              r="76"
              fill={materialsConfig[material].color}
              stroke={materialsConfig[material].ring}
              strokeWidth="5"
            />
            {/* Dial Background */}
            <circle cx="85" cy="85" r="62" fill={dialConfig[dial].bg} />

            {/* Dial Decorative Pattern */}
            {dial === 'malachite' && (
              <g stroke="#2D6A4F" strokeWidth="2.5" opacity="0.6">
                <path d="M40 70 Q85 90 130 70" />
                <path d="M35 85 Q85 105 135 85" />
                <path d="M40 100 Q85 120 130 100" />
              </g>
            )}
            {dial === 'agadez' && (
              <g fill="#FAF0CA" opacity="0.8">
                <circle cx="65" cy="55" r="1.5" />
                <circle cx="110" cy="60" r="1" />
                <circle cx="75" cy="115" r="1.5" />
                <circle cx="115" cy="105" r="1.2" />
                <circle cx="95" cy="45" r="2" />
              </g>
            )}
            {dial === 'terracotta' && (
              <g stroke="#FAF0CA" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5">
                <circle cx="85" cy="85" r="45" fill="none" />
                <circle cx="85" cy="85" r="28" fill="none" />
              </g>
            )}

            {/* Hour Markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="85"
                y1="28"
                x2="85"
                y2="34"
                stroke={dialConfig[dial].accent}
                strokeWidth={deg % 90 === 0 ? '3' : '1.5'}
                transform={`rotate(${deg} 85 85)`}
              />
            ))}

            {/* Watch Hands */}
            {/* Hour Hand */}
            <line
              x1="85"
              y1="85"
              x2="85"
              y2="52"
              stroke="#FAF0CA"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform="rotate(65 85 85)"
            />
            {/* Minute Hand */}
            <line
              x1="85"
              y1="85"
              x2="85"
              y2="38"
              stroke="#FAF0CA"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="rotate(220 85 85)"
            />
            {/* Center Pin */}
            <circle cx="85" cy="85" r="4" fill="#D95D39" stroke="#FAF0CA" strokeWidth="1.5" />
          </svg>

          <div className="mt-2 text-[10px] font-mono text-center text-amber-200">
            {materialsConfig[material].name}
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="space-y-3">
          {/* Material Selector */}
          <div>
            <div className="text-[10px] font-mono text-[#7A583A] mb-1 font-bold">
              MATÉRIAU DU BOÎTIER :
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['gold', 'ebony', 'titanium'] as const).map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => {
                    playInteract();
                    setMaterial(mat);
                  }}
                  className={`p-2 rounded-xl text-xs font-mono font-bold capitalize transition-all border ${
                    material === mat
                      ? 'bg-[#D95D39] text-white border-[#D95D39] shadow-sm'
                      : 'bg-white text-[#2B201A] border-[#D95D39]/15 hover:bg-[#F3EDE2]'
                  }`}
                >
                  {mat === 'gold' ? 'Or 18k' : mat === 'ebony' ? 'Ébène' : 'Titane'}
                </button>
              ))}
            </div>
          </div>

          {/* Dial Selector */}
          <div>
            <div className="text-[10px] font-mono text-[#7A583A] mb-1 font-bold">
              MATIÈRE DU CADRAN :
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['malachite', 'agadez', 'terracotta'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    playInteract();
                    setDial(d);
                  }}
                  className={`p-2 rounded-xl text-[11px] font-mono font-bold capitalize transition-all border ${
                    dial === d
                      ? 'bg-[#2A9D8F] text-white border-[#2A9D8F] shadow-sm'
                      : 'bg-white text-[#2B201A] border-[#D95D39]/15 hover:bg-[#F3EDE2]'
                  }`}
                >
                  {d === 'malachite' ? 'Malachite' : d === 'agadez' ? 'Agadez' : 'Terre'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-2 bg-white rounded-xl border border-[#D95D39]/15 text-[11px] font-mono text-[#7A583A]">
            <span className="font-bold text-[#D95D39]">Finition :</span> Verre saphir inrayable, mécanisme suisse manufacture 28 800 alt/h.
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. MINI-DÉMO JOUABLE : KROMA (Générateur de Motifs Géométriques Africains)
// =========================================================================
export const KromaPatternDemo: React.FC = () => {
  const [patternType, setPatternType] = useState<'bogolan' | 'wax' | 'kente'>('bogolan');
  const [density, setDensity] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);
  const playInteract = useAudioStore((s) => s.playInteract);
  const playSuccess = useAudioStore((s) => s.playSuccess);

  const handleCopy = () => {
    playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-[#FAF7F2] border-2 border-[#D95D39]/20 rounded-2xl text-[#2B201A]">
      <div className="flex items-center justify-between mb-3 border-b border-[#D95D39]/15 pb-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#D95D39]" />
          <span className="text-[11px] font-mono font-bold uppercase text-[#D95D39]">
            DÉMO LIVE • Générateur de Motifs Vectoriels Africains
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-[#D95D39]/20 rounded-xl text-[10px] font-mono font-bold hover:bg-[#F3EDE2] text-[#D95D39]"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copié !' : 'Copier SVG'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Pattern Canvas Visualizer */}
        <div className="h-40 rounded-2xl bg-[#3D2619] p-3 flex items-center justify-center overflow-hidden border border-[#D95D39]/20 shadow-inner">
          <svg width="100%" height="100%" viewBox="0 0 280 140" className="w-full h-full">
            {patternType === 'bogolan' && (
              <g stroke="#E9C46A" strokeWidth="2.5" fill="none" strokeLinecap="round">
                {Array.from({ length: density }).map((_, i) => (
                  <g key={i} transform={`translate(${i * (280 / density)}, 0)`}>
                    <path d="M10 20 L30 40 L10 60 L30 80 L10 100 L30 120" />
                    <circle cx="50" cy="40" r="6" fill="#D95D39" stroke="none" />
                    <circle cx="50" cy="100" r="6" fill="#D95D39" stroke="none" />
                    <line x1="50" y1="10" x2="50" y2="130" stroke="#FAF0CA" strokeWidth="1.5" strokeDasharray="4 4" />
                  </g>
                ))}
              </g>
            )}

            {patternType === 'wax' && (
              <g stroke="#FAF0CA" strokeWidth="2" fill="none">
                {Array.from({ length: density }).map((_, i) => (
                  <g key={i} transform={`translate(${i * (280 / density)}, 0)`}>
                    <polygon points="35,15 65,45 35,75 5,45" fill="#D95D39" />
                    <polygon points="35,75 65,105 35,135 5,105" fill="#2A9D8F" />
                    <circle cx="35" cy="45" r="8" fill="#E9C46A" stroke="#3D2619" strokeWidth="2" />
                    <circle cx="35" cy="105" r="8" fill="#E9C46A" stroke="#3D2619" strokeWidth="2" />
                  </g>
                ))}
              </g>
            )}

            {patternType === 'kente' && (
              <g>
                {Array.from({ length: density * 2 }).map((_, i) => (
                  <rect
                    key={i}
                    x={i * 25}
                    y="10"
                    width="20"
                    height="120"
                    fill={i % 3 === 0 ? '#E9C46A' : i % 3 === 1 ? '#2A9D8F' : '#D95D39'}
                    rx="3"
                  />
                ))}
                {Array.from({ length: 5 }).map((_, j) => (
                  <line
                    key={j}
                    x1="0"
                    y1={25 + j * 22}
                    x2="280"
                    y2={25 + j * 22}
                    stroke="#FAF0CA"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                ))}
              </g>
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <div className="text-[10px] font-mono text-[#7A583A] mb-1 font-bold">
              STYLE DU MOTIF GÉOMÉTRIQUE :
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['bogolan', 'wax', 'kente'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    playInteract();
                    setPatternType(style);
                  }}
                  className={`p-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                    patternType === style
                      ? 'bg-[#D95D39] text-white border-[#D95D39] shadow-sm'
                      : 'bg-white text-[#2B201A] border-[#D95D39]/15 hover:bg-[#F3EDE2]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-mono text-[#7A583A] mb-1 font-bold">
              <span>DENSITÉ GÉOMÉTRIQUE :</span>
              <span className="text-[#D95D39] font-extrabold">{density} répétitions</span>
            </div>
            <input
              type="range"
              min="2"
              max="7"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full accent-[#D95D39] cursor-pointer"
            />
          </div>

          <div className="p-2 bg-white rounded-xl border border-[#D95D39]/15 text-[11px] font-mono text-[#7A583A]">
            Calculé en temps réel via des coordonnées paramétriques SVG Math.
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. MINI-DÉMO JOUABLE : VELOCITY FLEET (Radar Télémétrique Flotte Urbaine)
// =========================================================================
export const VelocityFleetDemo: React.FC = () => {
  const [selectedVan, setSelectedVan] = useState<number>(1);
  const playInteract = useAudioStore((s) => s.playInteract);

  const vans = [
    { id: 1, name: 'Van #01 - Express Plateau', driver: 'Moussa D.', speed: 48, fuel: 82, battery: 94, temp: '4.2°C (Froid OK)' },
    { id: 2, name: 'Van #02 - Zone Portuaire', driver: 'Aminata S.', speed: 62, fuel: 65, battery: 78, temp: '3.8°C (Froid OK)' },
    { id: 3, name: 'Van #03 - Rocade Ouest', driver: 'Koffi A.', speed: 0, fuel: 90, battery: 100, temp: 'Livraison en cours' },
  ];

  const activeVan = vans.find((v) => v.id === selectedVan) || vans[0];

  return (
    <div className="p-4 bg-[#FAF7F2] border-2 border-[#D95D39]/20 rounded-2xl text-[#2B201A]">
      <div className="flex items-center justify-between mb-3 border-b border-[#D95D39]/15 pb-2">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#D95D39]" />
          <span className="text-[11px] font-mono font-bold uppercase text-[#D95D39]">
            DÉMO LIVE • Radar GPS & Télémétrie Flotte Véhicules
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
          3 Actifs
        </span>
      </div>

      {/* Fleet Van Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {vans.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => {
              playInteract();
              setSelectedVan(v.id);
            }}
            className={`p-2 rounded-xl text-left font-mono transition-all border ${
              selectedVan === v.id
                ? 'bg-[#2A9D8F] text-white border-[#2A9D8F] shadow-sm'
                : 'bg-white text-[#2B201A] border-[#D95D39]/15 hover:bg-[#F3EDE2]'
            }`}
          >
            <div className="text-[10px] font-bold truncate">Van #{v.id}</div>
            <div className="text-[9px] opacity-80">{v.speed} km/h</div>
          </button>
        ))}
      </div>

      {/* Live Van Telemetry Card */}
      <div className="p-3 bg-white border border-[#D95D39]/15 rounded-xl space-y-2">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div>
            <div className="text-xs font-mono font-extrabold text-[#2B201A]">
              {activeVan.name}
            </div>
            <div className="text-[10px] font-mono text-[#7A583A]">
              Chauffeur : {activeVan.driver}
            </div>
          </div>
          <span className="text-xs font-mono font-extrabold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
            {activeVan.speed} KM/H
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
          <div className="p-2 bg-[#FAF7F2] rounded-lg">
            <div className="text-[9px] text-[#7A583A]">CARBURANT</div>
            <div className="text-sm font-extrabold text-[#D95D39]">{activeVan.fuel}%</div>
          </div>
          <div className="p-2 bg-[#FAF7F2] rounded-lg">
            <div className="text-[9px] text-[#7A583A]">BATTERIE IOT</div>
            <div className="text-sm font-extrabold text-[#2A9D8F]">{activeVan.battery}%</div>
          </div>
          <div className="p-2 bg-[#FAF7F2] rounded-lg">
            <div className="text-[9px] text-[#7A583A]">CHAÎNE DU FROID</div>
            <div className="text-[10px] font-extrabold text-emerald-700 truncate">{activeVan.temp}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
