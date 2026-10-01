import React, { useState, useRef, useEffect } from 'react';
import { KirikouCharacter } from './KirikouCharacter';
import {
  AfricanHut,
  BaobabTree,
  AcaciaTree,
  AfricanClayPot,
  WoodenTotem,
  FlyingBird,
  SavannaGrasses,
  AfricanDjembe,
  SacredCowrie,
  Campfire,
  FirefliesSwarm,
  PerchedCalao,
  BogolanFrieze,
} from './KirikouScenery';
import { KirikouProjectModal } from './KirikouProjectModal';
import { KirikouDossierModal } from './KirikouDossierModal';
import { CalaoTourGuide } from './CalaoTourGuide';
import { TravelerPassportModal } from './TravelerPassportModal';
import { AdminDashboardModal } from '@/admin/AdminDashboardModal';
import { IDENTITY_DATA, SOCIAL_LINKS } from '@/database/data';
import { ProjectData } from '@/types';
import { useAudioStore } from '@/stores/useAudioStore';
import { useUIStore } from '@/stores/useUIStore';
import { useDataStore } from '@/stores/useDataStore';
import {
  Volume2,
  VolumeX,
  FileText,
  Mail,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Send,
  CheckCircle2,
  ExternalLink,
  Code,
  Palette,
  Server,
  Cloud,
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Award,
  Home,
  FolderKanban,
  BookOpen,
  MessageSquare,
  Feather,
  Gem,
  Zap,
} from 'lucide-react';

type AtmosphereMode = 'day' | 'sunset' | 'night';

export const KirikouWorld: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [characterX, setCharacterX] = useState<number>(180);
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('day');

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isCalaoTourOpen, setIsCalaoTourOpen] = useState<boolean>(false);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('frontend');
  const [baobabWisdom, setBaobabWisdom] = useState<string | null>(null);

  // Sacred Cowries Quest State (4 hidden golden cowries to discover)
  const [collectedCowries, setCollectedCowries] = useState<number[]>([]);
  const [showCowrieSuccess, setShowCowrieSuccess] = useState<boolean>(false);

  // Click-to-walk ripple coordinates
  const [walkRipple, setWalkRipple] = useState<{ x: number; y: number } | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Audio store
  const audioSettings = useAudioStore((s) => s.settings);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const playInteract = useAudioStore((s) => s.playInteract);
  const playFootstep = useAudioStore((s) => s.playFootstep);
  const playSuccess = useAudioStore((s) => s.playSuccess);
  const playDjembe = useAudioStore((s) => s.playDjembe);
  const initAmbient = useAudioStore((s) => s.initAmbient);

  // Admin CMS store
  const isAdminOpen = useUIStore((s) => s.isAdminOpen);
  const openAdminModal = useUIStore((s) => s.openAdminModal);
  const addAdminMessage = useUIStore((s) => s.addAdminMessage);

  // Dynamic Portfolio Data (Projects & Skills from CRUD Store)
  const projects = useDataStore((s) => s.projects);
  const skills = useDataStore((s) => s.skills);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const characterXRef = useRef<number>(180);
  const isWalkingRef = useRef<boolean>(false);
  const walkAnimRef = useRef<number | null>(null);
  const lastFootstepTimeRef = useRef<number>(0);
  const scrollStopTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; scrollLeft: number } | null>(null);

  // Chapter target positions (in pixels)
  const chapterPositions = [180, 1150, 2150, 3050, 3850];
  const totalWorldWidth = 4400;

  // Atmosphere cycling helper for mobile quick toggle
  const cycleAtmosphere = () => {
    playInteract();
    setAtmosphere((prev) => (prev === 'day' ? 'sunset' : prev === 'sunset' ? 'night' : 'day'));
  };

  // Move character visibly with real-time walking animation, footstep sounds, and smooth camera tracking
  const walkToPosition = (targetX: number) => {
    playInteract();
    initAmbient();

    const clampedTarget = Math.max(80, Math.min(totalWorldWidth - 250, targetX));
    const startX = characterXRef.current;
    const distance = Math.abs(clampedTarget - startX);

    if (distance < 5) return;

    // Set walking direction
    const newDir = clampedTarget >= startX ? 'right' : 'left';
    setDirection(newDir);
    setIsWalking(true);
    isWalkingRef.current = true;

    // Play first footstep immediately
    playFootstep();
    lastFootstepTimeRef.current = performance.now();

    // Cancel any previous walk animation loop
    if (walkAnimRef.current) {
      cancelAnimationFrame(walkAnimRef.current);
      walkAnimRef.current = null;
    }

    // Walking speed: between 300px/s (close by) and 560px/s (long journey across chapters)
    // Ensures Kirikou visibly takes actual steps across the terrain without being too slow
    const speed = Math.min(560, Math.max(300, distance / 2.2)); // px per second
    let lastTime = performance.now();
    let currentX = startX;

    const stepFrame = (timestamp: number) => {
      const dt = Math.min(0.05, (timestamp - lastTime) / 1000); // delta in seconds
      lastTime = timestamp;

      // Play rhythmic footsteps while walking (~every 220ms)
      if (timestamp - lastFootstepTimeRef.current >= 220) {
        playFootstep();
        lastFootstepTimeRef.current = timestamp;
      }

      const moveStep = speed * dt;
      const remainingDist = Math.abs(clampedTarget - currentX);

      if (remainingDist <= moveStep) {
        // Arrived at destination!
        currentX = clampedTarget;
        characterXRef.current = currentX;
        setCharacterX(currentX);
        setIsWalking(false);
        isWalkingRef.current = false;

        // Keep camera centered on arrival
        if (scrollContainerRef.current) {
          const screenWidth = window.innerWidth;
          const targetScroll = Math.max(0, Math.min(totalWorldWidth - screenWidth, currentX - screenWidth / 2 + 65));
          scrollContainerRef.current.scrollLeft = targetScroll;
        }

        walkAnimRef.current = null;
        return;
      }

      // Step towards target
      currentX += moveStep * (clampedTarget > startX ? 1 : -1);
      characterXRef.current = currentX;
      setCharacterX(currentX);

      // Smooth camera follow tracking Kirikou across the landscape
      if (scrollContainerRef.current) {
        const screenWidth = window.innerWidth;
        const targetScroll = Math.max(0, Math.min(totalWorldWidth - screenWidth, currentX - screenWidth / 2 + 65));
        scrollContainerRef.current.scrollLeft = targetScroll;
      }

      walkAnimRef.current = requestAnimationFrame(stepFrame);
    };

    walkAnimRef.current = requestAnimationFrame(stepFrame);
  };

  // Navigate to chapter with walking animation
  const goToChapter = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= 5) return;
    setCurrentChapter(targetIndex);
    walkToPosition(chapterPositions[targetIndex]);
  };

  // Bidirectional Chapter Sync: when user scrolls horizontally, update active chapter indicator
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const clientWidth = scrollContainerRef.current.clientWidth;
    const center = scrollLeft + clientWidth / 2;

    let activeChapter = 0;
    if (center < 850) {
      activeChapter = 0;
    } else if (center < 1850) {
      activeChapter = 1;
    } else if (center < 2750) {
      activeChapter = 2;
    } else if (center < 3600) {
      activeChapter = 3;
    } else {
      activeChapter = 4;
    }

    if (currentChapter !== activeChapter) {
      setCurrentChapter(activeChapter);
    }
  };

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (walkAnimRef.current) {
        cancelAnimationFrame(walkAnimRef.current);
      }
    };
  }, []);

  // Jump animation trigger
  const triggerJump = () => {
    if (isJumping) return;
    playSuccess();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 550);
  };

  // Collect sacred cowrie
  const handleCollectCowrie = (id: number) => {
    if (collectedCowries.includes(id)) return;
    playSuccess();
    const next = [...collectedCowries, id];
    setCollectedCowries(next);
    if (next.length === 4) {
      setShowCowrieSuccess(true);
    }
  };

  // Support accessing admin via /admin or /#admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        openAdminModal();
      }
    };

    checkAdminRoute();

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [openAdminModal]);

  // Clean URL when admin modal is closed
  useEffect(() => {
    if (!isAdminOpen) {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        window.history.replaceState({}, '', '/');
      }
    }
  }, [isAdminOpen]);

  // Natural scroll reflex & touch gesture: convert vertical scroll (mouse wheel / trackpad down / mobile swipe up) into horizontal progression
  // Immediately starts showing the world and advancing through the chapters, while Kirikou actively walks!
  useEffect(() => {
    // Helper to handle incremental scroll progression (from wheel, trackpad, or touch swipe)
    const handleScrollDelta = (delta: number) => {
      if (!scrollContainerRef.current) return;
      initAmbient(); // Unlocks ambient sound on first interaction

      // 1. Update horizontal scroll
      const container = scrollContainerRef.current;
      container.scrollLeft += delta;

      // 2. Set Kirikou walking direction & animation state
      const dir = delta >= 0 ? 'right' : 'left';
      setDirection(dir);
      setIsWalking(true);
      isWalkingRef.current = true;

      // 3. Move Kirikou visibly across the landscape along with the camera
      const screenWidth = window.innerWidth;
      const anchorRatio = screenWidth < 640 ? 0.28 : 0.35;
      const newKirikouX = Math.max(
        80,
        Math.min(totalWorldWidth - 250, container.scrollLeft + screenWidth * anchorRatio)
      );
      characterXRef.current = newKirikouX;
      setCharacterX(newKirikouX);

      // 4. Play rhythmic footsteps while walking
      const now = performance.now();
      if (now - lastFootstepTimeRef.current >= 220) {
        playFootstep();
        lastFootstepTimeRef.current = now;
      }

      // 5. Debounced reset to idle when user stops scrolling
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
      scrollStopTimerRef.current = window.setTimeout(() => {
        setIsWalking(false);
        isWalkingRef.current = false;
      }, 180);
    };

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if any modal is currently open
      if (selectedProject || isDossierOpen || isAdminOpen || isCalaoTourOpen || isPassportOpen) {
        return;
      }

      // Check if mouse is hovering an element that has vertical overflow (e.g. scrollable card description)
      const target = e.target as HTMLElement | null;
      const scrollableParent = target?.closest('.overflow-y-auto, textarea') as HTMLElement | null;
      if (scrollableParent && scrollableParent.scrollHeight > scrollableParent.clientHeight) {
        const isAtTop = scrollableParent.scrollTop <= 0 && e.deltaY < 0;
        const isAtBottom =
          scrollableParent.scrollTop + scrollableParent.clientHeight >= scrollableParent.scrollHeight - 2 &&
          e.deltaY > 0;
        if (!isAtTop && !isAtBottom) {
          return; // Let internal card vertical scroll proceed
        }
      }

      if (e.deltaY !== 0) {
        e.preventDefault();
        const multiplier = e.deltaMode === 1 ? 35 : 1;
        handleScrollDelta(e.deltaY * multiplier);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (selectedProject || isDossierOpen || isAdminOpen || isCalaoTourOpen || isPassportOpen) {
        return;
      }
      if (e.touches.length === 1 && scrollContainerRef.current) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          scrollLeft: scrollContainerRef.current.scrollLeft,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || !scrollContainerRef.current) return;
      if (selectedProject || isDossierOpen || isAdminOpen || isCalaoTourOpen || isPassportOpen) {
        return;
      }

      const touch = e.touches[0];
      const diffX = touchStartRef.current.x - touch.clientX;
      const diffY = touchStartRef.current.y - touch.clientY;

      // Check if touch is inside an open scrollable card with vertical space remaining
      const target = e.target as HTMLElement | null;
      const scrollableParent = target?.closest('.overflow-y-auto, textarea') as HTMLElement | null;
      if (scrollableParent && scrollableParent.scrollHeight > scrollableParent.clientHeight) {
        const isAtTop = scrollableParent.scrollTop <= 0 && diffY < 0;
        const isAtBottom =
          scrollableParent.scrollTop + scrollableParent.clientHeight >= scrollableParent.scrollHeight - 2 &&
          diffY > 0;
        if (!isAtTop && !isAtBottom) {
          return; // Let card internal scroll proceed
        }
      }

      // Vertical swipe (swiping up = scrolling down = move forward)
      // Horizontal swipe (swiping left = scrolling right = move forward)
      const isVertical = Math.abs(diffY) > Math.abs(diffX);
      const delta = isVertical ? diffY * 1.5 : diffX * 1.3;

      if (Math.abs(delta) > 2) {
        if (e.cancelable) {
          e.preventDefault();
        }
        touchStartRef.current.x = touch.clientX;
        touchStartRef.current.y = touch.clientY;
        handleScrollDelta(delta);
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, [
    selectedProject,
    isDossierOpen,
    isAdminOpen,
    isCalaoTourOpen,
    isPassportOpen,
    initAmbient,
    playFootstep,
    totalWorldWidth,
  ]);

  // Keyboard navigation (Left / Right / Down / Up arrows, Space to Jump, Ctrl+Shift+A for Admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global secret shortcut for Admin Console (Ctrl+Shift+A or Cmd+Shift+A)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdminModal();
        return;
      }

      if (selectedProject || isDossierOpen || isAdminOpen) return;
      if (
        e.key === 'ArrowRight' ||
        e.key === 'd' ||
        e.key === 'D' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageDown'
      ) {
        goToChapter(Math.min(4, currentChapter + 1));
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'q' ||
        e.key === 'a' ||
        e.key === 'Q' ||
        e.key === 'A' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageUp'
      ) {
        goToChapter(Math.max(0, currentChapter - 1));
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter, selectedProject, isDossierOpen, isAdminOpen, characterX, isJumping, openAdminModal]);

  // Unlock authentic African AudioEngine on user's first gesture
  useEffect(() => {
    const handleFirstGesture = () => {
      initAmbient();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [initAmbient]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    playSuccess();
    addAdminMessage({
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      subject: 'Message reçu via L’Arbre à Palabre (Portfolio)',
    });
    setContactSent(true);
  };

  const handleDjembeClick = () => {
    const pitches: ('bass' | 'tone' | 'slap')[] = ['bass', 'tone', 'slap'];
    const randomPitch = pitches[Math.floor(Math.random() * pitches.length)];
    playDjembe(randomPitch);
  };

  const handleBaobabFruitClick = () => {
    playSuccess();
    const quotes = [
      '« Le secret d’un code durable, c’est comme les racines du baobab : profondément ancré et invisible à la surface. »',
      '« Un bon design ne crie pas, il raconte une histoire avec la simplicité du geste artisanal. »',
      '« 100% de rigueur TypeScript, 0% de compromis sur la créativité visuelle. »',
    ];
    setBaobabWisdom(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const chapters = [
    { num: '1', title: 'Le Village', shortTitle: 'Village', icon: Home },
    { num: '2', title: 'Les Projets', shortTitle: 'Projets', icon: FolderKanban },
    { num: '3', title: 'Le Baobab', shortTitle: 'Baobab', icon: BookOpen },
    { num: '4', title: 'L’Arbre à Palabre', shortTitle: 'Palabre', icon: MessageSquare },
    { num: '5', title: 'L’Épilogue', shortTitle: 'Épilogue', icon: Award },
  ];

  // Atmosphere sky gradients
  const skyBackgrounds = {
    day: 'bg-gradient-to-b from-[#FCEBD9] via-[#FAF3EA] to-[#F4EBE0]',
    sunset: 'bg-gradient-to-b from-[#B84927] via-[#D95D39] via-[#E76F51] to-[#FCEBD9]',
    night: 'bg-gradient-to-b from-[#14172B] via-[#23203C] to-[#3D2619]',
  };

  return (
    <div className={`flex flex-col w-full h-full overflow-hidden font-sans select-none ${
      atmosphere === 'night' ? 'bg-[#14172B] text-[#FAF0CA]' : 'bg-[#FAF7F2] text-[#2B201A]'
    }`}>
      {/* ======================================================== */}
      {/* 1. SIMPLE, CRISP HEADER (RESPONSIVE MOBILE & DESKTOP)     */}
      {/* ======================================================== */}
      <header className={`h-14 sm:h-16 shrink-0 z-30 px-3 sm:px-6 md:px-8 flex items-center justify-between border-b transition-colors duration-500 shadow-sm ${
        atmosphere === 'night'
          ? 'bg-[#181B2E] border-white/10 text-white'
          : 'bg-[#FAF7F2] border-[#D95D39]/15 text-[#2B201A]'
      }`}>
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D95D39] to-[#E76F51] text-white font-mono font-extrabold flex items-center justify-center text-xs sm:text-sm shadow-sm border border-[#E9C46A]/50 shrink-0">
            JA
          </div>
          <div className="min-w-0">
            <div className="font-title font-bold text-sm sm:text-xl md:text-2xl tracking-tight leading-tight text-[#1C120C] truncate max-w-[135px] xs:max-w-[180px] sm:max-w-none">
              JUNES AGASSOUNON
            </div>
            <p className={`text-[10px] sm:text-xs font-body font-semibold truncate max-w-[135px] xs:max-w-[180px] sm:max-w-none ${
              atmosphere === 'night' ? 'text-[#E9C46A]' : 'text-[#7A583A]'
            }`}>
              Développeur Web &amp; Graphiste
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {/* Mobile Atmosphere Single Toggle (Day -> Sunset -> Night) */}
          <button
            onClick={cycleAtmosphere}
            className={`sm:hidden p-2 rounded-xl border transition-all shrink-0 active:scale-95 ${
              atmosphere === 'day'
                ? 'bg-[#FAF7F2] border-[#D95D39]/30 text-[#D95D39] shadow-sm'
                : atmosphere === 'sunset'
                ? 'bg-[#D95D39] border-[#D95D39] text-white shadow-sm'
                : 'bg-[#2A2B4A] border-white/20 text-[#E9C46A] shadow-sm'
            }`}
            title="Changer d'atmosphère (Jour / Crépuscule / Nuit)"
          >
            {atmosphere === 'day' && <Sun className="w-4 h-4" />}
            {atmosphere === 'sunset' && <Sunset className="w-4 h-4" />}
            {atmosphere === 'night' && <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop Poetic Day / Sunset / Night Atmosphere Segmented Switcher */}
          <div className="hidden sm:flex items-center p-1 rounded-2xl border border-[#D95D39]/20 bg-black/5 gap-1">
            <button
              onClick={() => setAtmosphere('day')}
              className={`p-1.5 rounded-xl transition-all ${
                atmosphere === 'day' ? 'bg-[#FAF7F2] shadow-sm text-[#D95D39]' : 'text-gray-400 hover:text-[#D95D39]'
              }`}
              title="Jour Doré"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAtmosphere('sunset')}
              className={`p-1.5 rounded-xl transition-all ${
                atmosphere === 'sunset' ? 'bg-[#D95D39] text-white shadow-sm' : 'text-gray-400 hover:text-[#D95D39]'
              }`}
              title="Crépuscule Flamboyant"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAtmosphere('night')}
              className={`p-1.5 rounded-xl transition-all ${
                atmosphere === 'night' ? 'bg-[#2A2B4A] text-[#E9C46A] shadow-sm' : 'text-gray-400 hover:text-[#E9C46A]'
              }`}
              title="Nuit Étoilée"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audio toggle button with authentic African Kora & Tambour status */}
          <button
            onClick={() => {
              initAmbient();
              toggleMute();
            }}
            className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 border rounded-xl sm:rounded-2xl shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0 ${
              audioSettings.muted
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 hover:bg-rose-500/20'
                : atmosphere === 'night'
                ? 'bg-[#2A2645] border-[#E9C46A]/40 text-[#E9C46A] shadow-[0_0_12px_rgba(233,196,106,0.15)]'
                : 'bg-[#FAF0CA] border-[#D95D39]/30 text-[#8C4A28] shadow-[0_0_12px_rgba(217,93,57,0.1)]'
            }`}
            title={audioSettings.muted ? 'Activer la Kora mandingue & les tambours de la savane' : 'Couper le son'}
          >
            {audioSettings.muted ? (
              <>
                <VolumeX className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-rose-500" />
                <span className="text-[11px] font-mono font-bold text-rose-500 hidden sm:inline">Son Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#D95D39] animate-pulse" />
                <span className="text-[11px] font-mono font-bold hidden sm:inline">Kora &amp; Tambour</span>
              </>
            )}
          </button>

          {/* Cowrie Discovery Counter Badge (Hidden on small mobile) */}
          <button
            type="button"
            onClick={() => {
              playInteract();
              if (collectedCowries.length === 4) setShowCowrieSuccess(true);
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 ${
              collectedCowries.length === 4
                ? 'bg-amber-400/20 border-amber-500 text-amber-800 animate-pulse'
                : atmosphere === 'night'
                ? 'bg-[#23203C] border-white/15 text-[#E9C46A]'
                : 'bg-[#FAF7F2] border-[#D95D39]/20 text-[#2B201A]'
            }`}
            title="Quête secrète : Cauris d'or sacrés découverts dans la savane"
          >
            <Gem className="w-3.5 h-3.5 text-[#E9C46A]" />
            <span>{collectedCowries.length}/4</span>
            <span className="text-[10px] opacity-75 hidden md:inline">Cauris</span>
          </button>

          {/* Calao Guide 60s Tour Button (Visible on md+) */}
          <button
            onClick={() => {
              playInteract();
              setIsCalaoTourOpen(true);
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-[#FAF0CA] hover:bg-[#F4D35E] text-[#6E3719] border border-[#E9C46A] font-mono font-bold text-xs rounded-2xl shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
            title="Visite guidée express en 60 secondes avec le Calao pour les recruteurs"
          >
            <Feather className="w-3.5 h-3.5 text-[#8C4A28]" />
            <span>VISITE 60S</span>
          </button>

          {/* Dossier CV Express Button */}
          <button
            onClick={() => {
              playInteract();
              setIsDossierOpen(true);
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 border font-mono font-bold text-xs rounded-xl sm:rounded-2xl shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0 ${
              atmosphere === 'night'
                ? 'bg-[#23203C] border-white/20 text-[#FAF0CA] hover:bg-[#2F2B4E]'
                : 'bg-[#FDFBF7] border-[#D95D39]/30 text-[#D95D39] hover:bg-[#F3EDE2]'
            }`}
            title="Dossier CV Express (Profil &amp; Compétences)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="sm:hidden text-[11px]">CV</span>
            <span className="hidden sm:inline">DOSSIER EXPRESS</span>
          </button>

          {/* Direct Contact Button */}
          <button
            onClick={() => goToChapter(3)}
            className="flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95 shrink-0"
            title="Contacter Junes AGASSOUNON (L'Arbre à Palabre)"
          >
            <Mail className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">CONTACTER</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. PANORAMIC 2D PARALLAX SCROLLING SAVANNA WORLD         */}
      {/* STARTS STRICTLY BELOW THE HEADER: CAN NEVER BE OBSCURED   */}
      {/* ======================================================== */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 w-full relative overflow-x-auto overflow-y-hidden no-scrollbar"
      >
        <div
          className="relative h-full overflow-hidden"
          style={{ width: `${totalWorldWidth}px`, minHeight: '100%' }}
        >
          {/* --- LAYER 1: SKY & SUN / MOON WITH ATMOSPHERE DYNAMICS --- */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${skyBackgrounds[atmosphere]}`} />

          {/* Golden Sun or Silver Moon (Strictly visible in the open upper sky) */}
          {atmosphere !== 'night' ? (
            <div className="absolute top-4 left-[450px] pointer-events-none flex items-center justify-center transition-all duration-700">
              <div className="w-56 h-56 rounded-full bg-[#E9C46A]/20 blur-2xl" />
              <div className={`absolute rounded-full shadow-[0_0_50px_#E9C46A] ${
                atmosphere === 'sunset'
                  ? 'w-28 h-28 bg-gradient-to-tr from-[#E76F51] to-[#E9C46A]'
                  : 'w-24 h-24 bg-gradient-to-tr from-[#E9C46A] to-[#FAF0CA]'
              }`} />
            </div>
          ) : (
            <div className="absolute top-4 left-[450px] pointer-events-none flex items-center justify-center animate-pulse">
              <div className="w-44 h-44 rounded-full bg-indigo-300/10 blur-2xl" />
              <div className="w-16 h-16 rounded-full bg-[#FAF0CA] shadow-[0_0_35px_#FAF0CA]" />
            </div>
          )}

          {/* Fireflies Swarm in Night Atmosphere */}
          {atmosphere === 'night' && <FirefliesSwarm />}

          {/* Drifting Golden Savanna Pollen Motes (Souffle de la Savane) */}
          {atmosphere !== 'night' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {[
                { left: 120, top: 40, delay: '0s', size: 4 },
                { left: 340, top: 80, delay: '2s', size: 3 },
                { left: 750, top: 60, delay: '1s', size: 5 },
                { left: 1200, top: 90, delay: '3s', size: 3.5 },
                { left: 1650, top: 50, delay: '1.5s', size: 4 },
                { left: 2100, top: 75, delay: '2.5s', size: 3 },
                { left: 2600, top: 45, delay: '0.5s', size: 4.5 },
                { left: 3100, top: 85, delay: '3.5s', size: 3 },
                { left: 3600, top: 55, delay: '2s', size: 4 },
                { left: 4050, top: 70, delay: '1s', size: 3.5 },
              ].map((mote, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-[#E9C46A] shadow-[0_0_8px_#E9C46A] animate-dustDrift pointer-events-none"
                  style={{
                    left: `${mote.left}px`,
                    top: `${mote.top}px`,
                    width: `${mote.size}px`,
                    height: `${mote.size}px`,
                    animationDelay: mote.delay,
                  }}
                />
              ))}
            </div>
          )}

          {/* Flying Calaos Birds */}
          <FlyingBird className="absolute top-8 left-[300px]" size={40} />
          <FlyingBird className="absolute top-16 left-[380px]" size={30} />
          <FlyingBird className="absolute top-6 left-[1400px]" size={38} />
          <FlyingBird className="absolute top-14 left-[1480px]" size={28} />
          <FlyingBird className="absolute top-10 left-[2700px]" size={34} />
          <FlyingBird className="absolute top-8 left-[3450px]" size={36} />
          <FlyingBird className="absolute top-16 left-[3950px]" size={30} />

          {/* Distant Mountain Ridges */}
          <div className="absolute bottom-[135px] left-0 right-0 h-36 pointer-events-none opacity-30">
            <svg viewBox="0 0 4400 160" preserveAspectRatio="none" className="w-full h-full fill-[#8C4A28]">
              <path d="M0 160 L0 110 Q350 40 700 110 Q1100 30 1500 120 Q1900 50 2300 115 Q2700 40 3100 120 Q3500 50 3900 115 Q4150 45 4400 110 L4400 160 Z" />
            </svg>
          </div>

          {/* --- LAYER 2: CLAY GROUND & RED SAVANNA PATH (CLICKABLE TO WALK) --- */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left + (scrollContainerRef.current?.scrollLeft || 0);
              setWalkRipple({ x: clickX, y: e.clientY - rect.top });
              setTimeout(() => setWalkRipple(null), 900);
              walkToPosition(Math.max(100, Math.min(totalWorldWidth - 450, clickX)));
            }}
            className="absolute bottom-0 left-0 right-0 h-[135px] cursor-pointer group pointer-events-auto"
            title="Cliquez n'importe où sur le chemin d'argile pour faire marcher Junes !"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#C4734D] via-[#A85834] to-[#78371C]" />
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#E29267] to-[#C4734D]" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FAF0CA]/50" />
            
            {/* Guide hint */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-sm text-[#FAF0CA] text-xs font-mono rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
              ✦ Cliquez sur le chemin pour marcher • Barre d'espace pour sauter
            </div>
          </div>

          {/* Golden Step Ripple Visual Indicator */}
          {walkRipple && (
            <div
              className="absolute pointer-events-none rounded-full border-2 border-[#FAF0CA] animate-ping z-20"
              style={{
                left: `${walkRipple.x - 20}px`,
                bottom: '65px',
                width: '40px',
                height: '40px',
              }}
            />
          )}

          {/* ======================================================== */}
          {/* CHAPITRE 1 : LE VILLAGE & LES RACINES (X: 0 - 800)       */}
          {/* ======================================================== */}
          <div className="absolute bottom-[135px] left-[60px] flex items-end gap-5">
            <div className="relative">
              <AfricanHut size={210} patternColor="#E9C46A" roofColor="#FAF0CA" />
              {/* Interactive Perched Calao on Hut Roof */}
              <div
                onClick={() => {
                  playInteract();
                  setIsCalaoTourOpen(true);
                }}
                className="absolute -top-4 left-10 z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                title="Cliquer pour lancer la visite guidée express de 60 secondes avec le Calao !"
              >
                <PerchedCalao size={34} />
              </div>
            </div>
            <AfricanHut size={165} patternColor="#FAF0CA" roofColor="#F4D35E" className="opacity-95" />
            {/* Interactive Djembe Hand Drum */}
            <div
              className="cursor-pointer transition-transform hover:scale-110 active:scale-95 relative z-20"
              title="Tambour Djembé — Cliquez pour jouer un rythme mandingue !"
            >
              <AfricanDjembe size={52} onClick={handleDjembeClick} />
            </div>
            <WoodenTotem height={145} />
            <AfricanClayPot size={42} />
          </div>

          {/* Sacred Cowrie #1 (Village) */}
          <SacredCowrie
            className="absolute bottom-[145px] left-[320px] z-20"
            isCollected={collectedCowries.includes(1)}
            onClick={() => handleCollectCowrie(1)}
          />

          {/* Chapter 1 Story Card (Never obscured by navbar: canvas starts strictly below header) */}
          <div className={`absolute bottom-[145px] left-[350px] sm:left-[430px] w-[320px] sm:w-[350px] md:w-[380px] p-4 sm:p-5 border-2 rounded-3xl shadow-xl max-h-[calc(100%-160px)] overflow-y-auto ${
            atmosphere === 'night'
              ? 'bg-[#1E1C2E] border-white/20 text-white'
              : 'bg-[#FDFBF7] border-[#D95D39]/30 text-[#2B201A]'
          }`}>
            <BogolanFrieze color="#D95D39" className="mb-2" />
            <div className="relative inline-block mb-1">
              <span className="font-script text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#D95D39] quill-reveal leading-none">
                ✦ Chapitre 1 · Le Village des Origines
              </span>
              <div className="h-0.5 w-full bg-[#E9C46A] quill-underline rounded-full mt-0.5" />
            </div>
            <h3 className="font-title text-xl sm:text-2xl md:text-[28px] font-bold leading-tight animate-titleBreathe mt-1">
              {IDENTITY_DATA.name} — L'Artisan du Web
            </h3>
            <p className="font-body text-xs md:text-sm mt-2 leading-relaxed font-medium opacity-95">
              « {IDENTITY_DATA.bio} »
            </p>

            {/* Chiffres Clés */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#D95D39]/15 text-center">
              <div className={`p-2 rounded-xl ${atmosphere === 'night' ? 'bg-[#29263E]' : 'bg-[#FAF7F2]'}`}>
                <div className="text-base sm:text-lg font-extrabold font-mono text-[#D95D39]">5+ ANS</div>
                <div className="text-[9px] sm:text-[10px] font-mono opacity-70">EXPÉRIENCE</div>
              </div>
              <div className={`p-2 rounded-xl ${atmosphere === 'night' ? 'bg-[#29263E]' : 'bg-[#FAF7F2]'}`}>
                <div className="text-base sm:text-lg font-extrabold font-mono text-[#2A9D8F]">15+ PROJETS</div>
                <div className="text-[9px] sm:text-[10px] font-mono opacity-70">LIVRÉS EN PRODUCTION</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3.5">
              <button
                onClick={() => goToChapter(1)}
                className="py-2.5 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>PROJETS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playInteract();
                  setIsCalaoTourOpen(true);
                }}
                className="py-2.5 px-3 bg-[#FAF0CA] hover:bg-[#F4D35E] border border-[#E9C46A] text-[#8C4A28] font-mono font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
              >
                <Feather className="w-3.5 h-3.5 text-[#8C4A28]" />
                <span>VISITE 60S</span>
              </button>
            </div>
          </div>

          <SavannaGrasses className="absolute bottom-[130px] left-[350px]" />
          <SavannaGrasses className="absolute bottom-[130px] left-[780px]" />

          {/* ======================================================== */}
          {/* CHAPITRE 2 : L'ALLÉE DES PROJETS (X: 1000 - 1800)        */}
          {/* ======================================================== */}
          <div className="absolute bottom-[135px] left-[980px] flex items-end gap-5">
            <div className="relative">
              <AcaciaTree size={260} />
              {/* Interactive Perched Calao Bird on Acacia branch */}
              <PerchedCalao className="absolute top-10 right-14 z-20" size={32} />
            </div>
            <AfricanClayPot size={46} />
          </div>

          {/* Sacred Cowrie #2 (Projects Lane) */}
          <SacredCowrie
            className="absolute bottom-[145px] left-[990px] z-20"
            isCollected={collectedCowries.includes(2)}
            onClick={() => handleCollectCowrie(2)}
          />

          {/* Projects Station Container (Guaranteed space: NEVER obscured by navbar) */}
          <div className={`absolute bottom-[145px] left-[1050px] w-[320px] sm:w-[580px] md:w-[700px] p-4 sm:p-5 border-2 rounded-3xl shadow-xl max-h-[calc(100%-160px)] overflow-y-auto ${
            atmosphere === 'night'
              ? 'bg-[#1E1C2E] border-white/20 text-white'
              : 'bg-[#FDFBF7] border-[#D95D39]/30 text-[#2B201A]'
          }`}>
            <BogolanFrieze color="#E9C46A" className="mb-2" />
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="relative inline-block mb-1">
                  <span className="font-script text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#D95D39] quill-reveal leading-none">
                    ✦ Chapitre 2 · Les Créations
                  </span>
                  <div className="h-0.5 w-full bg-[#E9C46A] quill-underline rounded-full mt-0.5" />
                </div>
                <h3 className="font-title text-xl sm:text-2xl md:text-[28px] font-bold leading-tight animate-titleBreathe">
                  L'Allée des Créations
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-body font-semibold opacity-75 hidden xs:inline">
                Cliquez pour ouvrir un conte
              </span>
            </div>

            {/* Illustrated Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    playInteract();
                    setSelectedProject(proj);
                  }}
                  className={`p-3.5 border rounded-2xl cursor-pointer transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between ${
                    atmosphere === 'night'
                      ? 'bg-[#29263E] border-white/10 hover:border-[#E9C46A]'
                      : 'bg-[#FAF7F2] border-[#D95D39]/20 hover:border-[#D95D39]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-[#D95D39]/15 text-[#D95D39] rounded-full">
                        {proj.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono opacity-70">{proj.year}</span>
                    </div>
                    <h4 className="font-extrabold text-sm mb-1">
                      {proj.title}
                    </h4>
                    <p className="text-[11px] line-clamp-2 font-medium opacity-85">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#D95D39]/15">
                    <span className="text-[10px] font-mono font-bold text-[#D95D39] flex items-center gap-1">
                      Lire le conte &rarr;
                    </span>
                    <span className="text-[10px] font-mono text-[#2A9D8F] font-bold">
                      {proj.role.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => goToChapter(2)}
              className="w-full mt-3.5 py-2.5 px-4 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
            >
              <span>CONTINUER VERS LE GRAND BAOBAB</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <SavannaGrasses className="absolute bottom-[130px] left-[1750px]" />

          {/* ======================================================== */}
          {/* CHAPITRE 3 : LE GRAND BAOBAB DES SAVOIRS (X: 1950 - 2800) */}
          {/* ======================================================== */}
          <div className="absolute bottom-[135px] left-[1960px] flex items-end gap-6">
            {/* Interactive Baobab Tree with clickable fruit */}
            <div className="cursor-pointer relative" onClick={handleBaobabFruitClick} title="Cliquer sur le baobab pour cueillir une parole sage">
              <BaobabTree size={360} />
            </div>
            <WoodenTotem height={160} />
            <AfricanClayPot size={48} />
          </div>

          {/* Sacred Cowrie #3 (Baobab Tree Branches) */}
          <SacredCowrie
            className="absolute bottom-[280px] left-[2080px] z-20"
            isCollected={collectedCowries.includes(3)}
            onClick={() => handleCollectCowrie(3)}
          />

          {/* Baobab Skills Station Card (Guaranteed space: NEVER obscured by navbar) */}
          <div className={`absolute bottom-[145px] left-[2250px] w-[320px] sm:w-[480px] md:w-[520px] p-4 sm:p-5 border-2 rounded-3xl shadow-xl max-h-[calc(100%-160px)] overflow-y-auto ${
            atmosphere === 'night'
              ? 'bg-[#1E1C2E] border-white/20 text-white'
              : 'bg-[#FDFBF7] border-[#D95D39]/30 text-[#2B201A]'
          }`}>
            <BogolanFrieze color="#2A9D8F" className="mb-2" />
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="relative inline-block mb-1">
                  <span className="font-script text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#D95D39] quill-reveal leading-none">
                    ✦ Chapitre 3 · L’Arbre des Savoirs
                  </span>
                  <div className="h-0.5 w-full bg-[#E9C46A] quill-underline rounded-full mt-0.5" />
                </div>
                <h3 className="font-title text-xl sm:text-2xl md:text-[28px] font-bold leading-tight animate-titleBreathe">
                  Le Grand Baobab
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-[#E9C46A]" />
            </div>

            {/* Wisdom speech toast when baobab is clicked */}
            {baobabWisdom && (
              <div className="p-3 mb-3 bg-[#FAF0CA] border border-[#E9C46A] rounded-2xl text-[#3D2619] text-xs font-medium italic animate-fadeIn flex justify-between items-center">
                <span>{baobabWisdom}</span>
                <button onClick={() => setBaobabWisdom(null)} className="text-[#3D2619] font-bold ml-2">×</button>
              </div>
            )}

            {/* Skill Category Selector Pills */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
              {[
                { id: 'frontend', label: 'Frontend & 3D', icon: Code },
                { id: 'backend', label: 'Backend & Cloud', icon: Server },
                { id: 'graphic_design', label: 'Graphisme', icon: Palette },
                { id: 'tools_devops', label: 'DevOps & Outils', icon: Cloud },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playInteract();
                      setSelectedSkillCategory(tab.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                      selectedSkillCategory === tab.id
                        ? 'bg-[#D95D39] text-white shadow-sm'
                        : atmosphere === 'night'
                        ? 'bg-[#29263E] text-white hover:bg-[#343050]'
                        : 'bg-[#FAF7F2] text-[#4A2E1B] hover:bg-[#F3EDE2] border border-[#D95D39]/15'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Skills List with Warm Progress Bars */}
            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {skills.filter((s) =>
                selectedSkillCategory === 'frontend'
                  ? s.category === 'frontend' || s.category === 'creative_3d'
                  : s.category === selectedSkillCategory
              ).map((skill) => (
                <div key={skill.id} className={`p-2.5 rounded-2xl border ${
                  atmosphere === 'night'
                    ? 'bg-[#29263E] border-white/10'
                    : 'bg-[#FAF7F2] border-[#D95D39]/15'
                }`}>
                  <div className="flex justify-between items-center text-xs font-mono font-bold mb-1">
                    <span>{skill.name}</span>
                    <span className="text-[#D95D39] font-extrabold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E8D5B5] rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-gradient-to-r from-[#D95D39] to-[#2A9D8F] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-[10px] opacity-70">{skill.description}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => goToChapter(3)}
              className="w-full mt-3.5 py-2.5 px-4 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
            >
              <span>REJOINDRE L'ARBRE À PALABRE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <SavannaGrasses className="absolute bottom-[130px] left-[2700px]" />

          {/* ======================================================== */}
          {/* CHAPITRE 4 : L'ARBRE À PALABRE & CONTACT (X: 2950 - 3700)  */}
          {/* ======================================================== */}
          <div className="absolute bottom-[135px] left-[2950px] flex items-end gap-5">
            <div className="relative">
              <AcaciaTree size={280} />
              <PerchedCalao className="absolute top-12 left-16 z-20" size={34} />
            </div>
            <AfricanHut size={190} patternColor="#2A9D8F" roofColor="#FAF0CA" />
            <Campfire className="absolute bottom-0 left-[260px] z-10" size={75} />
            <WoodenTotem height={155} />
            <AfricanClayPot size={46} />
          </div>

          {/* Sacred Cowrie #4 (Palabre Totem) */}
          <SacredCowrie
            className="absolute bottom-[145px] left-[2980px] z-20"
            isCollected={collectedCowries.includes(4)}
            onClick={() => handleCollectCowrie(4)}
          />

          {/* Contact Station Card (Guaranteed space: NEVER obscured by navbar) */}
          <div className={`absolute bottom-[145px] left-[3220px] w-[320px] sm:w-[400px] md:w-[450px] p-4 sm:p-5 border-2 rounded-3xl shadow-xl max-h-[calc(100%-160px)] overflow-y-auto ${
            atmosphere === 'night'
              ? 'bg-[#1E1C2E] border-white/20 text-white'
              : 'bg-[#FDFBF7] border-[#D95D39]/30 text-[#2B201A]'
          }`}>
            <BogolanFrieze color="#D95D39" className="mb-2" />
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="relative inline-block mb-1">
                  <span className="font-script text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#D95D39] quill-reveal leading-none">
                    ✦ Chapitre 4 · L’Espace de Dialogue
                  </span>
                  <div className="h-0.5 w-full bg-[#E9C46A] quill-underline rounded-full mt-0.5" />
                </div>
                <h3 className="font-title text-xl sm:text-2xl md:text-[28px] font-bold leading-tight animate-titleBreathe">
                  L’Arbre à Palabre
                </h3>
              </div>
              <Mail className="w-5 h-5 text-[#D95D39]" />
            </div>

            {contactSent ? (
              <div className="p-4 sm:p-5 text-center bg-[#FAF7F2] rounded-2xl border border-[#2A9D8F]/30 space-y-2 text-[#2B201A]">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A9D8F] mx-auto" />
                <h4 className="font-extrabold text-sm sm:text-base">Message Transmis !</h4>
                <p className="text-xs font-medium opacity-85">
                  Merci {contactName}. Votre message a bien été envoyé. Junes AGASSOUNON vous répondra dans les 24 heures.
                </p>
                <button
                  onClick={() => setContactSent(false)}
                  className="mt-2.5 px-4 py-1.5 text-xs font-mono font-bold bg-[#D95D39] text-white rounded-xl"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Votre Nom"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-[#D95D39] ${
                      atmosphere === 'night'
                        ? 'bg-[#29263E] border-white/10 text-white'
                        : 'bg-[#FAF7F2] border-[#D95D39]/20 text-[#2B201A]'
                    }`}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Votre Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-[#D95D39] ${
                      atmosphere === 'night'
                        ? 'bg-[#29263E] border-white/10 text-white'
                        : 'bg-[#FAF7F2] border-[#D95D39]/20 text-[#2B201A]'
                    }`}
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Votre projet, opportunité ou message..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-[#D95D39] resize-none ${
                    atmosphere === 'night'
                      ? 'bg-[#29263E] border-white/10 text-white'
                      : 'bg-[#FAF7F2] border-[#D95D39]/20 text-[#2B201A]'
                  }`}
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMETTRE LE MESSAGE</span>
                </button>
              </form>
            )}

            {/* Direct Social Links */}
            <div className="mt-3.5 pt-3 border-t border-[#D95D39]/15 flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] opacity-70">RÉSEAUX DIRECTS :</span>
              <div className="flex gap-2">
                {SOCIAL_LINKS.filter((l) => l.platform !== 'cv').slice(0, 3).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2 py-1 rounded-lg border font-semibold text-[10px] flex items-center gap-1 ${
                      atmosphere === 'night'
                        ? 'bg-[#29263E] border-white/10 text-[#FAF0CA]'
                        : 'bg-[#FAF7F2] border-[#D95D39]/15 text-[#2B201A]'
                    }`}
                  >
                    <span>{link.label.split(' ')[0]}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#D95D39]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Proceed to Epilogue & Celebration */}
            <div className="mt-3 pt-2.5 border-t border-[#D95D39]/15">
              <button
                type="button"
                onClick={() => goToChapter(4)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#2A9D8F] to-[#238276] hover:opacity-95 text-white font-mono font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
              >
                <span>VERS L'ÉPILOGUE DU CONTE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <SavannaGrasses className="absolute bottom-[130px] left-[3680px]" />

          {/* ======================================================== */}
          {/* CHAPITRE 5 : L'ÉPILOGUE DU VILLAGE & CÉLÉBRATION (3650 - 4400) */}
          {/* ======================================================== */}
          <div className="absolute bottom-[135px] left-[3650px] flex items-end gap-4">
            <AfricanHut size={195} patternColor="#FAF0CA" roofColor="#FDFBF7" />

            {/* The Great Festive Campfire with Warm Embers */}
            <Campfire className="absolute bottom-0 left-[160px] z-10" size={80} />

            {/* Interactive Celebration Djembe */}
            <div
              className="cursor-pointer transition-transform hover:scale-110 active:scale-95 relative z-20"
              title="Tambour de fête — Cliquez pour jouer un rythme de célébration !"
            >
              <AfricanDjembe size={60} onClick={handleDjembeClick} />
            </div>

            <WoodenTotem height={155} />
            <AfricanClayPot size={46} />
          </div>

          {/* Epilogue Celebration Card */}
          <div className={`absolute bottom-[145px] left-[3820px] w-[320px] sm:w-[400px] md:w-[440px] p-4 sm:p-5 border-2 rounded-3xl shadow-xl max-h-[calc(100%-160px)] overflow-y-auto ${
            atmosphere === 'night'
              ? 'bg-[#1E1C2E] border-white/20 text-white'
              : 'bg-[#FDFBF7] border-[#D95D39]/30 text-[#2B201A]'
          }`}>
            <BogolanFrieze color="#2A9D8F" className="mb-2" />
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="relative inline-block mb-1">
                  <span className="font-script text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#2A9D8F] quill-reveal leading-none">
                    ✦ Chapitre 5 · L’Épilogue du Conte
                  </span>
                  <div className="h-0.5 w-full bg-[#E9C46A] quill-underline rounded-full mt-0.5" />
                </div>
                <h3 className="font-title text-xl sm:text-2xl md:text-[28px] font-bold leading-tight animate-titleBreathe flex items-center gap-1.5">
                  <span>La Célébration Finale</span>
                  <Sparkles className="w-5 h-5 text-[#E9C46A]" />
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#E9C46A]/20 flex items-center justify-center text-[#E9C46A]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#D95D39]/15 text-[#3D2619] leading-relaxed">
                <p className="font-medium">
                  « Merci d’avoir partagé ce chemin à travers la savane. Comme dans les grands contes, chaque création est une transmission : allier la rigueur d'ingénierie logicielle la plus stricte à l'émotion d'un design artisanal et vivant. »
                </p>
                <div className="mt-2 font-mono font-bold text-[11px] text-[#D95D39]">
                  — JUNES AGASSOUNON, Développeur Web &amp; Graphiste
                </div>
              </div>

              {/* Artisan Pillars Summary */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 bg-white/60 border border-[#D95D39]/10 rounded-xl">
                  <div className="font-bold text-[#D95D39] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>Rigueur Logicielle</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">TypeScript 100%, Clean Architecture &amp; Tests</div>
                </div>
                <div className="p-2.5 bg-white/60 border border-[#2A9D8F]/20 rounded-xl">
                  <div className="font-bold text-[#2A9D8F] flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 shrink-0" />
                    <span>Graphisme &amp; Création</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Identités Visuelles, Vectoriel &amp; UI au Code</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#D95D39]/15">
                {/* Official Traveler Passport Button */}
                <button
                  type="button"
                  onClick={() => {
                    playSuccess();
                    setIsPassportOpen(true);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#D95D39] via-[#E76F51] to-[#E9C46A] hover:opacity-95 text-white font-mono font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                >
                  <Award className="w-4 h-4 text-[#FAF0CA]" />
                  <span>GRAVER MON PASSEPORT DU VOYAGEUR</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToChapter(0)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#2A9D8F] to-[#238276] hover:opacity-95 text-white font-mono font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RECOMMENCER LE VOYAGE (LE VILLAGE)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playInteract();
                      setIsDossierOpen(true);
                    }}
                    className="py-2 px-3 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#D95D39]/20 text-[#2B201A] font-mono font-bold text-[11px] rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3 h-3 text-[#D95D39]" />
                    <span>DOSSIER EXPRESS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => goToChapter(3)}
                    className="py-2 px-3 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#2A9D8F]/30 text-[#2A9D8F] font-mono font-bold text-[11px] rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3 h-3" />
                    <span>REVENIR AU CONTACT</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sacred World Boundary Marker (strictly ends at 4390px within 4400px boundary) */}
          <div className="absolute bottom-[135px] left-[4260px] pointer-events-none">
            <BaobabTree size={135} />
          </div>

          {/* ======================================================== */}
          {/* THE 2D ANIMATED CHARACTER WALKING ON CLAY PATH            */}
          {/* ======================================================== */}
          <div
            className={`absolute bottom-[85px] z-30 transition-transform duration-300 ease-out ${
              isJumping ? '-translate-y-16 scale-105' : 'translate-y-0 scale-100'
            }`}
            style={{
              left: `${characterX}px`,
            }}
          >
            <KirikouCharacter
              isWalking={isWalking}
              direction={direction}
            />
          </div>
        </div>
      </div>

      {/* Floating Scroll Down / Exploration Prompt (Fades out when Kirikou starts moving) */}
      <div
        className={`fixed bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-500 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-sm border border-[#E9C46A]/50 text-[#FAF0CA] text-[11px] sm:text-xs font-mono shadow-2xl ${
          characterX > 250 ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 animate-bounce'
        }`}
      >
        <ChevronDown className="w-3.5 h-3.5 text-[#E9C46A] animate-pulse" />
        <span>Scrollez vers le bas pour explorer</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#E9C46A]" />
      </div>

      {/* ======================================================== */}
      {/* 3. SIMPLE BOTTOM STORYBOOK CHAPTER BAR                   */}
      {/* ======================================================== */}
      <footer className="fixed bottom-2.5 sm:bottom-3 left-0 right-0 z-30 flex justify-center px-2 sm:px-4 pointer-events-none pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className={`pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2.5 border-2 rounded-2xl shadow-2xl w-auto max-w-[98vw] transition-colors ${
          atmosphere === 'night'
            ? 'bg-[#181B2E]/95 backdrop-blur-md border-white/20 text-white'
            : 'bg-[#FDFBF7]/95 backdrop-blur-md border-[#D95D39]/30 text-[#2B201A]'
        }`}>
          {/* Previous Button */}
          <button
            onClick={() => goToChapter(Math.max(0, currentChapter - 1))}
            disabled={currentChapter === 0}
            className={`p-1.5 sm:p-2.5 border rounded-xl transition-all disabled:opacity-30 shrink-0 active:scale-95 ${
              atmosphere === 'night'
                ? 'bg-[#23203C] border-white/10 text-white hover:bg-[#2F2B4E]'
                : 'bg-[#FAF7F2] border-[#D95D39]/20 text-[#2B201A] hover:bg-[#F3EDE2]'
            }`}
            title="Chapitre précédent"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#D95D39]" />
          </button>

          {/* Chapter Indicator Tabs — Clean Lucide SVG Icons only */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-0.5">
            {chapters.map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <button
                  key={idx}
                  onClick={() => goToChapter(idx)}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 sm:py-2 sm:px-3 rounded-xl transition-all whitespace-nowrap text-xs font-mono font-bold leading-none shrink-0 active:scale-95 ${
                    currentChapter === idx
                      ? 'bg-[#D95D39] text-white shadow-md'
                      : atmosphere === 'night'
                      ? 'text-gray-300 hover:bg-[#23203C]'
                      : 'text-[#4A2E1B] hover:bg-[#FAF7F2]'
                  }`}
                  title={ch.title}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">
                    {ch.num}. {ch.shortTitle}
                  </span>
                  <span className="sm:hidden font-mono text-[11px]">{ch.num}</span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToChapter(Math.min(4, currentChapter + 1))}
            disabled={currentChapter === 4}
            className={`p-1.5 sm:p-2.5 border rounded-xl transition-all disabled:opacity-30 shrink-0 active:scale-95 ${
              atmosphere === 'night'
                ? 'bg-[#23203C] border-white/10 text-white hover:bg-[#2F2B4E]'
                : 'bg-[#FAF7F2] border-[#D95D39]/20 text-[#2B201A] hover:bg-[#F3EDE2]'
            }`}
            title="Chapitre suivant"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#D95D39]" />
          </button>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 4. MODALS (STORY PROJECT MODAL & DOSSIER MODAL)          */}
      {/* ======================================================== */}
      <KirikouProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <KirikouDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onSelectProject={(proj) => {
          setIsDossierOpen(false);
          setSelectedProject(proj);
        }}
      />

      {/* Admin Dashboard CMS Modal */}
      <AdminDashboardModal />

      {/* 60-Second Express Calao Tour Guide */}
      <CalaoTourGuide
        isOpen={isCalaoTourOpen}
        onClose={() => setIsCalaoTourOpen(false)}
        onOpenPassport={() => {
          setIsCalaoTourOpen(false);
          setIsPassportOpen(true);
        }}
        walkToPosition={walkToPosition}
        goToChapter={goToChapter}
        chapterPositions={chapterPositions}
      />

      {/* Official Traveler Passport Souvenir Modal */}
      <TravelerPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        collectedCowriesCount={collectedCowries.length}
      />

      {/* ======================================================== */}
      {/* 5. SACRED COWRIE COMPLETION REWARD MODAL                 */}
      {/* ======================================================== */}
      {showCowrieSuccess && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn font-sans">
          <div className="bg-[#FDFBF7] border-t-2 sm:border-2 border-[#E9C46A] p-4 sm:p-8 rounded-t-[26px] sm:rounded-3xl max-w-md w-full text-center shadow-2xl text-[#2B201A] relative">
            <div className="w-10 h-1 bg-[#E9C46A]/40 rounded-full mx-auto mb-3 sm:hidden shrink-0" />
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2.5 sm:mb-3 bg-[#FAF0CA] rounded-full flex items-center justify-center shadow-md border-2 border-[#E9C46A] animate-bounce text-[#D95D39]">
              <Gem className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-[#D95D39] mb-1">
              Sagesse de l'Artisan Débloquée !
            </h3>
            <p className="text-[10px] sm:text-xs font-mono font-bold text-[#2A9D8F] mb-2.5 sm:mb-3 uppercase tracking-wider">
              Quête des 4 Cauris Sacrés accomplie (4/4)
            </p>
            <div className="text-xs sm:text-sm font-medium leading-relaxed bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border border-[#D95D39]/20 mb-4 sm:mb-5 text-[#3D2619]">
              « Le travail soigné se voit dans les détails invisibles à ceux qui se pressent. En explorant ce monde jusqu'au bout, vous avez démontré la curiosité d'un véritable partenaire créatif. »
              <div className="mt-2 font-bold font-mono text-[11px] sm:text-xs text-[#D95D39]">
                — JUNES AGASSOUNON, Développeur Web &amp; Graphiste
              </div>
            </div>
            <button
              onClick={() => setShowCowrieSuccess(false)}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#D95D39] to-[#E76F51] hover:from-[#E76F51] hover:to-[#E9C46A] text-white font-mono font-bold text-xs rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95"
            >
              REPRENDRE LA VISITE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
