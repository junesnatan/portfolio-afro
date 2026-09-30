import React, { useState } from 'react';
import { KirikouWorld } from '@/kirikou/KirikouWorld';
import { LoadingScreen } from './LoadingScreen';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF7F2]">
      {/* 1. INITIAL WARM STORYBOOK OPENING SCREEN */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. 2D AFRICAN ANIMATED FILM EXPERIENCE (KIRIKOU STYLE) */}
      <KirikouWorld />
    </div>
  );
};
