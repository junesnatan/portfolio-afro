import React from 'react';

interface KirikouCharacterProps {
  isWalking: boolean;
  direction: 'left' | 'right';
  className?: string;
}

export const KirikouCharacter: React.FC<KirikouCharacterProps> = ({
  isWalking,
  direction,
  className = '',
}) => {
  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-300 ${
        direction === 'left' ? '-scale-x-100' : 'scale-x-100'
      } ${className}`}
      style={{ width: '130px', height: '210px' }}
    >
      <svg
        viewBox="0 0 130 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Authentic Woven Pagne Pattern (Motif Bogolan & Kente Traditionnel) */}
          <pattern id="bogolanPagnePattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#FAF0CA" />
            <path d="M0 8 L8 0 L16 8 L8 16 Z" fill="#D95D39" opacity="0.85" />
            <path d="M4 8 L8 4 L12 8 L8 12 Z" fill="#264653" opacity="0.9" />
            <circle cx="8" cy="8" r="1.5" fill="#E9C46A" />
            <path d="M0 0 L16 16 M16 0 L0 16" stroke="#C44E2C" strokeWidth="0.8" opacity="0.6" />
          </pattern>

          {/* Golden Warm Skin Gradient (Reflet du Soleil de la Savane) */}
          <linearGradient id="africanSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5E3821" />
            <stop offset="65%" stopColor="#4A2E1D" />
            <stop offset="100%" stopColor="#381F13" />
          </linearGradient>

          {/* Highlight for Forehead and Cheeks */}
          <linearGradient id="skinGlow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#7A482B" />
            <stop offset="100%" stopColor="#4A2E1D" />
          </linearGradient>

          {/* Terracotta Tunic Fabric Gradient */}
          <linearGradient id="tunicGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E06440" />
            <stop offset="100%" stopColor="#B84522" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Ground Shadow on Savanna Soil */}
        <ellipse
          cx="65"
          cy="204"
          rx={isWalking ? '35' : '40'}
          ry="7"
          fill="#3D2619"
          fillOpacity="0.32"
          className="transition-all duration-300"
        />

        {/* ======================================================== */}
        {/* 2. BACK LEG & TRADITIONAL SAHELIAN LEATHER SANDAL        */}
        {/* ======================================================== */}
        <g
          className={
            isWalking
              ? 'animate-[kirikouLegBack_0.55s_ease-in-out_infinite_alternate]'
              : ''
          }
          style={{ transformOrigin: '55px 145px' }}
        >
          {/* Back Thigh wrapped in patterned woven pagne */}
          <path
            d="M48 142 L58 142 L56 166 L47 166 Z"
            fill="url(#bogolanPagnePattern)"
            stroke="#A3401E"
            strokeWidth="1.2"
          />
          {/* Woven border band on thigh hem */}
          <path d="M47 164 L56 164" stroke="#E9C46A" strokeWidth="2" />

          {/* Back Calf (Natural Rich Bronze Skin) */}
          <path
            d="M48 166 L55 166 Q57 180 54 195 L46 195 Q45 180 48 166 Z"
            fill="#3F2416"
          />

          {/* Traditional Ankle Bead Ring */}
          <ellipse cx="50" cy="193" rx="4.5" ry="1.5" fill="#E9C46A" />

          {/* Traditional Sahelian Sandal (Samarra) with Leather Straps */}
          {/* Leather sole */}
          <path
            d="M43 197 Q52 195 58 197 L60 201 Q51 203 41 202 Z"
            fill="#6E3719"
            stroke="#4A2511"
            strokeWidth="1"
          />
          {/* Criss-cross braided leather thongs */}
          <path d="M44 195 L56 199" stroke="#A3542B" strokeWidth="1.5" />
          <path d="M54 195 L45 200" stroke="#A3542B" strokeWidth="1.5" />
          {/* Toe post loop */}
          <circle cx="56" cy="198" r="1.2" fill="#FAF0CA" />
        </g>

        {/* ======================================================== */}
        {/* 3. FRONT LEG & TRADITIONAL SAHELIAN LEATHER SANDAL       */}
        {/* ======================================================== */}
        <g
          className={
            isWalking
              ? 'animate-[kirikouLegFront_0.55s_ease-in-out_infinite_alternate]'
              : ''
          }
          style={{ transformOrigin: '72px 145px' }}
        >
          {/* Front Thigh wrapped in patterned woven pagne */}
          <path
            d="M68 142 L78 142 L80 166 L69 166 Z"
            fill="url(#bogolanPagnePattern)"
            stroke="#A3401E"
            strokeWidth="1.2"
          />
          {/* Woven border band on thigh hem */}
          <path d="M69 164 L80 164" stroke="#E9C46A" strokeWidth="2" />

          {/* Front Calf (Natural Rich Bronze Skin) */}
          <path
            d="M70 166 L78 166 Q81 180 77 195 L69 195 Q68 180 70 166 Z"
            fill="url(#africanSkin)"
          />

          {/* Traditional Ankle Bead Ring with Cowrie Bead */}
          <ellipse cx="73" cy="193" rx="5" ry="1.8" fill="#E9C46A" />
          <circle cx="76" cy="193" r="1.5" fill="#FAF0CA" stroke="#3D2619" strokeWidth="0.6" />

          {/* Traditional Sahelian Sandal (Samarra) with Leather Straps */}
          {/* Leather sole */}
          <path
            d="M69 197 Q78 195 86 197 L88 201 Q78 204 67 202 Z"
            fill="#6E3719"
            stroke="#4A2511"
            strokeWidth="1"
          />
          {/* Criss-cross braided leather thongs */}
          <path d="M70 195 L84 199" stroke="#C44E2C" strokeWidth="1.5" />
          <path d="M82 195 L71 200" stroke="#C44E2C" strokeWidth="1.5" />
          {/* Golden/Brass Toe ring & Cowrie detail */}
          <circle cx="83" cy="198" r="1.4" fill="#FAF0CA" stroke="#3D2619" strokeWidth="0.6" />
        </g>

        {/* ======================================================== */}
        {/* 4. TORSO, AUTHENTIC BOGOLAN TUNIC & SACRED ACCESSORIES   */}
        {/* ======================================================== */}
        <g
          className={
            isWalking
              ? 'animate-[kirikouBodyBounce_0.275s_ease-in-out_infinite_alternate]'
              : 'animate-[kirikouBreathe_3s_ease-in-out_infinite_alternate]'
          }
          style={{ transformOrigin: '65px 140px' }}
        >
          {/* Back Arm (Swinging behind with Copper & Wood Wristlet) */}
          <g
            className={
              isWalking
                ? 'animate-[kirikouArmBack_0.55s_ease-in-out_infinite_alternate]'
                : ''
            }
            style={{ transformOrigin: '46px 90px' }}
          >
            <path
              d="M45 90 Q34 108 38 124"
              stroke="#3F2416"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Traditional African Copper & Carved Wood Wrist Cuff */}
            <rect x="34" y="114" width="7" height="4" rx="1.5" fill="#C86D3B" />
            <circle cx="37" cy="120" r="2.2" fill="#E9C46A" />
            {/* Hand */}
            <circle cx="38" cy="126" r="4.8" fill="#3F2416" />
          </g>

          {/* Traditional African Tunic Body (Terracotta Linen Boubou Court) */}
          <path
            d="M43 85 Q65 80 87 85 L91 144 Q65 149 39 144 Z"
            fill="url(#tunicGradient)"
            stroke="#9E3516"
            strokeWidth="1.6"
          />

          {/* Authentic Bogolan Center Embroidery (Sacred Chevron & Sun Glyph) */}
          <g stroke="#E9C46A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Center chevron ladder */}
            <path d="M65 84 L65 138" strokeWidth="2.5" />
            <path d="M60 96 L65 92 L70 96" />
            <path d="M59 107 L65 103 L71 107" />
            <path d="M58 118 L65 114 L72 118" />
            <path d="M59 129 L65 125 L71 129" />
          </g>

          {/* Traditional Mandingue Indigo/Teal Accent Side Bands */}
          <path d="M47 90 L45 142" stroke="#264653" strokeWidth="2.5" opacity="0.8" />
          <path d="M83 90 L85 142" stroke="#264653" strokeWidth="2.5" opacity="0.8" />

          {/* Lower Tunic Embroidered Hem Band */}
          <path
            d="M40 140 Q65 145 90 140"
            stroke="#E9C46A"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M42 142 Q65 147 88 142"
            stroke="#FAF0CA"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            fill="none"
          />

          {/* Traditional Woven Waist Sash / Pagne Knot (Ceinture Tissée Nouée) */}
          <path
            d="M38 136 Q65 140 92 136 L91 143 Q65 147 39 143 Z"
            fill="#C44E2C"
            stroke="#9E3516"
            strokeWidth="1.2"
          />
          {/* Sash Knot on Hip */}
          <circle cx="43" cy="140" r="4.5" fill="#E9C46A" stroke="#9E3516" strokeWidth="1" />
          <circle cx="43" cy="140" r="2.2" fill="#C44E2C" />

          {/* Swaying Sash Ribbon Ends (Fluttering in the Sahel breeze) */}
          <g className="animate-sashSway" style={{ transformOrigin: '43px 140px' }}>
            <path
              d="M41 142 Q36 156 40 172 L45 170 Q43 154 44 142 Z"
              fill="#E9C46A"
              stroke="#B84927"
              strokeWidth="0.8"
            />
            {/* Woven fringe stripes on sash end */}
            <path d="M37 167 L44 165" stroke="#264653" strokeWidth="1.5" />
            <path d="M38 171 L45 169" stroke="#D95D39" strokeWidth="1.5" />
            {/* Small decorative cowrie at the tip of the sash */}
            <circle cx="42.5" cy="173" r="1.6" fill="#FAF0CA" stroke="#3D2619" strokeWidth="0.5" />
          </g>

          {/* Handcrafted Griot Leather Satchel (Gibecière Sahélienne en cuir gravé) */}
          {/* Braided leather cross-body strap */}
          <path
            d="M48 84 L82 133"
            stroke="#4A2E1B"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M48 84 L82 133"
            stroke="#E9C46A"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Leather satchel bag on hip */}
          <g>
            <rect
              x="33"
              y="118"
              width="22"
              height="20"
              rx="4"
              fill="#7A3E1D"
              stroke="#3D2010"
              strokeWidth="1.5"
            />
            {/* Satchel Triangular Flap */}
            <path
              d="M33 118 L44 129 L55 118 Z"
              fill="#8C4A28"
              stroke="#3D2010"
              strokeWidth="1.2"
            />
            {/* Sacred Cowrie Clasp (Cauri Protecteur) */}
            <ellipse cx="44" cy="128" rx="2.5" ry="3.8" fill="#FFFDF0" stroke="#3D2619" strokeWidth="0.7" />
            <line x1="44" y1="125.5" x2="44" y2="130.5" stroke="#3D2619" strokeWidth="0.8" />
            {/* Leather Fringe Tassels */}
            <line x1="38" y1="138" x2="37" y2="144" stroke="#7A3E1D" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="44" y1="138" x2="44" y2="145" stroke="#E9C46A" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="50" y1="138" x2="51" y2="144" stroke="#7A3E1D" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* ======================================================== */}
          {/* 5. NECK & SACRED COWRIE SHELL & AMBER NECKLACE           */}
          {/* ======================================================== */}
          {/* Neck */}
          <rect x="59.5" y="73" width="11" height="15" fill="url(#africanSkin)" rx="4" />

          {/* Collier Traditionnel de Cauris Sacrés & Perles d'Ambre */}
          <g className="animate-amuletBob" style={{ transformOrigin: '65px 82px' }}>
            {/* Necklace cord */}
            <path
              d="M52 83 Q65 92 78 83"
              stroke="#3D2010"
              strokeWidth="1.8"
              fill="none"
            />
            {/* Amber beads & Cowrie shells row */}
            {/* Left Amber bead */}
            <circle cx="55" cy="85" r="2.2" fill="#F4A261" stroke="#8C4A28" strokeWidth="0.5" />
            {/* Left Cowrie Shell */}
            <g transform="translate(59, 87) rotate(-12)">
              <ellipse cx="0" cy="0" rx="2.2" ry="3.4" fill="#FFFDF0" stroke="#3D2619" strokeWidth="0.6" />
              <line x1="0" y1="-2.2" x2="0" y2="2.2" stroke="#3D2619" strokeWidth="0.7" />
            </g>
            {/* Center Sacred Master Cowrie Pendant with Brass Ring */}
            <circle cx="65" cy="88" r="1.5" fill="#E9C46A" />
            <g transform="translate(65, 91)">
              <ellipse cx="0" cy="0" rx="2.8" ry="4.2" fill="#FFFDF0" stroke="#3D2619" strokeWidth="0.7" />
              <line x1="0" y1="-2.8" x2="0" y2="2.8" stroke="#3D2619" strokeWidth="0.9" />
              {/* Little gold dot in center */}
              <circle cx="0" cy="0" r="0.7" fill="#E9C46A" />
            </g>
            {/* Right Cowrie Shell */}
            <g transform="translate(71, 87) rotate(12)">
              <ellipse cx="0" cy="0" rx="2.2" ry="3.4" fill="#FFFDF0" stroke="#3D2619" strokeWidth="0.6" />
              <line x1="0" y1="-2.2" x2="0" y2="2.2" stroke="#3D2619" strokeWidth="0.7" />
            </g>
            {/* Right Amber bead */}
            <circle cx="75" cy="85" r="2.2" fill="#F4A261" stroke="#8C4A28" strokeWidth="0.5" />
          </g>

          {/* ======================================================== */}
          {/* 6. HEAD, BRAIDED LOCKS WITH GOLDEN RINGS & EXPRESSION    */}
          {/* ======================================================== */}
          <g>
            {/* Ears with Traditional Golden Ring */}
            <circle cx="47" cy="56" r="6.5" fill="#3F2416" />
            <circle cx="47" cy="56" r="3.8" fill="#2E180D" />

            <circle cx="83" cy="56" r="6.5" fill="url(#africanSkin)" />
            <circle cx="83" cy="56" r="3.8" fill="#3F2416" />
            {/* Golden brass earring hoop on right ear */}
            <path
              d="M87 56 Q90 60 87 63"
              stroke="#E9C46A"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Stylized African Oval Face (Warm Glowing Bronze Tone) */}
            <ellipse cx="65" cy="56" rx="19.5" ry="22.5" fill="url(#africanSkin)" />
            {/* Soft Savanna Sunlight Highlight on Forehead and Temples */}
            <ellipse cx="65" cy="46" rx="12" ry="8" fill="url(#skinGlow)" opacity="0.6" />

            {/* Authentic Braided Locks & Crown (Tresses Sculptées Traditionnelles) */}
            <g className="animate-braidBob" style={{ transformOrigin: '65px 35px' }}>
              {/* Deep Natural Hair Base Silhouette */}
              <path
                d="M44 52 Q42 25 65 23 Q88 25 86 52 Q76 33 65 33 Q54 33 44 52 Z"
                fill="#1A1009"
              />

              {/* Sculpted Braided Locs Crown Bumps */}
              <circle cx="49" cy="29" r="6" fill="#1A1009" />
              <circle cx="58" cy="24" r="6.5" fill="#1A1009" />
              <circle cx="68" cy="24" r="6.5" fill="#1A1009" />
              <circle cx="78" cy="28" r="6" fill="#1A1009" />
              <circle cx="84" cy="36" r="5" fill="#1A1009" />
              <circle cx="45" cy="36" r="5" fill="#1A1009" />

              {/* Braid texture contour grooves */}
              <path d="M50 34 Q57 42 62 44" stroke="#2D1A0F" strokeWidth="1.5" fill="none" />
              <path d="M65 30 Q65 40 65 44" stroke="#2D1A0F" strokeWidth="1.5" fill="none" />
              <path d="M80 34 Q73 42 68 44" stroke="#2D1A0F" strokeWidth="1.5" fill="none" />

              {/* Golden Brass Rings Woven into Braids (Bijoux de Tresses) */}
              <rect x="52" y="27" width="3" height="4.5" rx="1" fill="#E9C46A" />
              <rect x="64" y="22" width="3.2" height="4.5" rx="1" fill="#E9C46A" />
              <rect x="74" y="26" width="3" height="4.5" rx="1" fill="#E9C46A" />

              {/* White Cowrie Bead in Center Braid */}
              <ellipse cx="65.5" cy="29" rx="2" ry="2.8" fill="#FFFDF0" stroke="#3D2619" strokeWidth="0.5" />
              <line x1="65.5" y1="27" x2="65.5" y2="31" stroke="#3D2619" strokeWidth="0.6" />
            </g>

            {/* Expressive Warm African Almond Eyes (Kirikou Charm & Wit) */}
            {/* Left Eye */}
            <ellipse cx="56.5" cy="54" rx="4.8" ry="6.2" fill="#FFFFFF" />
            <ellipse cx="57.5" cy="54" rx="3" ry="4" fill="#24130A" />
            <ellipse cx="57.8" cy="54" rx="2.2" ry="3" fill="#4A2810" />
            <circle cx="58.8" cy="52" r="1.3" fill="#FFFFFF" />
            <circle cx="56.5" cy="55.5" r="0.6" fill="#FFFFFF" opacity="0.8" />

            {/* Right Eye */}
            <ellipse cx="73.5" cy="54" rx="4.8" ry="6.2" fill="#FFFFFF" />
            <ellipse cx="74.5" cy="54" rx="3" ry="4" fill="#24130A" />
            <ellipse cx="74.8" cy="54" rx="2.2" ry="3" fill="#4A2810" />
            <circle cx="75.8" cy="52" r="1.3" fill="#FFFFFF" />
            <circle cx="73.5" cy="55.5" r="0.6" fill="#FFFFFF" opacity="0.8" />

            {/* Proud, Curved Eyebrows */}
            <path
              d="M52 44 Q57 41.5 62 44"
              stroke="#1A1009"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M68 44 Q73 41.5 78 44"
              stroke="#1A1009"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Well-defined African Nose */}
            <path
              d="M63 59 Q65 62 67 59"
              stroke="#381F13"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="61.5" cy="59.5" rx="1.2" ry="0.8" fill="#2E180D" />
            <ellipse cx="68.5" cy="59.5" rx="1.2" ry="0.8" fill="#2E180D" />

            {/* Broad, Cheerful, Infectious Smile */}
            <path
              d="M57 66 Q65 75 73 66"
              stroke="#2E180D"
              strokeWidth="2"
              fill="#D95D39"
              strokeLinecap="round"
            />
            {/* Bright, Gleaming Teeth */}
            <path
              d="M59 66.5 Q65 71 71 66.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="#FFFFFF"
            />

            {/* Soft Warm Blush with Golden Savanna Glow */}
            <ellipse cx="50" cy="62" rx="4" ry="2.2" fill="#D95D39" opacity="0.32" />
            <ellipse cx="80" cy="62" rx="4" ry="2.2" fill="#D95D39" opacity="0.32" />

            {/* Subtle Traditional Beauty Mark / Sun Dot on Temples */}
            <circle cx="48" cy="50" r="1" fill="#E9C46A" opacity="0.85" />
            <circle cx="82" cy="50" r="1" fill="#E9C46A" opacity="0.85" />
          </g>

          {/* ======================================================== */}
          {/* 7. FRONT ARM, BRACELETS & ARTISAN WOODEN CALAME          */}
          {/* ======================================================== */}
          <g
            className={
              isWalking
                ? 'animate-[kirikouArmFront_0.55s_ease-in-out_infinite_alternate]'
                : ''
            }
            style={{ transformOrigin: '84px 90px' }}
          >
            {/* Front Arm */}
            <path
              d="M84 90 Q93 108 86 124"
              stroke="url(#africanSkin)"
              strokeWidth="9.5"
              strokeLinecap="round"
            />

            {/* Stacked Traditional African Bracelets (Copper, Gold & Ebony Beads) */}
            <rect x="83" y="112" width="6" height="3" rx="1" fill="#C86D3B" />
            <rect x="82.5" y="116" width="7" height="3" rx="1" fill="#E9C46A" />
            <circle cx="87" cy="121" r="2.2" fill="#264653" />

            {/* Front Hand holding the Artisan Calame */}
            <circle cx="86" cy="126" r="5.2" fill="url(#africanSkin)" />

            {/* Hand-carved Wooden Griot Calame (Stylus d'Ébène et d'Or) */}
            {/* Wooden shaft */}
            <path
              d="M84 126 L98 108"
              stroke="#3D2010"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Golden Carved Ring Bands on Calame */}
            <line x1="88" y1="121" x2="89.5" y2="119" stroke="#E9C46A" strokeWidth="3.2" />
            {/* Gleaming Golden Scribe Tip (Pointe en Laiton Doré) */}
            <path
              d="M97 109 L101 104"
              stroke="#E9C46A"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="101" cy="104" r="1.5" fill="#FAF0CA" />
          </g>
        </g>
      </svg>
    </div>
  );
};
