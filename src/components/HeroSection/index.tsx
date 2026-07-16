import { useCallback, useEffect, useRef } from 'react';
import { FullHeader } from '../Header';
import { Hero } from '../Hero';
import { StatsBar } from '../StatsBar';
import { publicPath } from '../../utils/publicPath';
import './HeroSection.css';

const MOBILE_CARD_ITEMS = [
  { title: 'Программист:', sub: 'IT‑образование с отличием, AI‑инструменты' },
  { title: 'Художник:', sub: '8 лет худ. школы с отличием и насмотренность' },
  { title: 'Много отзывов', sub: 'от коллег, заказчиков и руководителей' },
];

const HeroMobileCard = () => (
  <div className="hero-mobile-card">
    <div className="hero-mobile-card__glass">
      <div className="hero-mobile-card__inner">
        {MOBILE_CARD_ITEMS.map(item => (
          <div key={item.title} className="hero-mobile-card__row">
            <div className="hero-mobile-card__dot-clip">
              <div className="hero-mobile-card__dot" />
            </div>
            <p className="hero-mobile-card__text">
              <span className="hero-mobile-card__title">{item.title}</span>
              {' '}
              <span className="hero-mobile-card__sub">{item.sub}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

type HeroSectionProps = {
  onInitialContentReady?: () => void;
};

export const HeroSection = ({ onInitialContentReady }: HeroSectionProps) => {
  const imageCenterRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const centerImgRef = useRef<HTMLImageElement>(null);
  const loadedInitialImagesRef = useRef(new Set<string>());
  const initialContentReadyRef = useRef(false);

  const markInitialImageReady = useCallback((imageName: string) => {
    if (initialContentReadyRef.current) {
      return;
    }

    loadedInitialImagesRef.current.add(imageName);

    if (loadedInitialImagesRef.current.size === 2) {
      initialContentReadyRef.current = true;
      onInitialContentReady?.();
    }
  }, [onInitialContentReady]);

  useEffect(() => {
    const checkCachedImages = () => {
      if (bgImgRef.current?.complete) {
        markInitialImageReady('background');
      }

      if (centerImgRef.current?.complete) {
        markInitialImageReady('center');
      }
    };

    checkCachedImages();
  }, [markInitialImageReady]);

  useEffect(() => {
    const el = imageCenterRef.current;
    if (!el) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta  = e.beta  ?? 0;
      targetX = Math.max(-30, Math.min(30, gamma * 0.55));
      targetY = Math.max(-12, Math.min(12, (beta - 45) * 0.25));
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      if (window.matchMedia('(max-width: 480px)').matches) {
        el.style.transform = `translateX(calc(-50% + ${currentX.toFixed(2)}px)) translateY(${currentY.toFixed(2)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      window.addEventListener('deviceorientation', handleOrientation, true);
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      cancelAnimationFrame(rafId);
      el.style.transform = '';
    };

    const DOE = (window as any).DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === 'function') {
      // iOS 13+ — разрешение через первый тап
      const onTouch = () => {
        DOE.requestPermission()
          .then((res: string) => { if (res === 'granted') start(); })
          .catch(() => {});
      };
      window.addEventListener('touchstart', onTouch, { once: true });
      return () => {
        window.removeEventListener('touchstart', onTouch);
        stop();
      };
    }

    // Android и остальные — запускаем сразу
    start();
    return stop;
  }, []);

  // Desktop mouse parallax on background image
  useEffect(() => {
    const el = bgImgRef.current;
    if (!el || window.matchMedia('(max-width: 480px)').matches) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const section = el.closest('.hero-section') as HTMLElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      targetX = dx * 30;
      targetY = dy * 14;
    };

    const onMouseLeave = () => { targetX = 0; targetY = 0; };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      el.style.transform = `scale(1.07) translateX(${currentX.toFixed(2)}px) translateY(${currentY.toFixed(2)}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const section = el.closest('.hero-section') as HTMLElement;
    if (!section) return;

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Background + fade — both behind content */}
      <div className="hero-section__bg">
        <img
          className="hero-section__bg-img"
          src={publicPath('/images/hero/bg-texture.jpg')}
          alt=""
          aria-hidden
          ref={bgImgRef}
          width="2880"
          height="1920"
          decoding="async"
          fetchPriority="high"
          onLoad={() => markInitialImageReady('background')}
          onError={() => markInitialImageReady('background')}
        />
        <div className="hero-section__fade" aria-hidden />
      </div>

      {/* Expanded header — not fixed, part of hero */}
      <div className="hero-section__header">
        <FullHeader />
      </div>

      {/* Hero text */}
      <div className="hero-section__content">
        <Hero />
      </div>

      {/* image_center — pre-rendered frame export */}
      <div className="image-center" ref={imageCenterRef} aria-hidden>
        <picture>
          <source srcSet={publicPath('/images/hero/image-center@3x.webp')} type="image/webp" />
          <img
            src={publicPath('/images/hero/image-center@3x.png')}
            alt=""
            width="3750"
            height="1350"
            decoding="async"
            fetchPriority="high"
            ref={centerImgRef}
            onLoad={() => markInitialImageReady('center')}
            onError={() => markInitialImageReady('center')}
          />
        </picture>
      </div>

      {/* Stats bar */}
      <div className="hero-section__stats">
        <StatsBar />
      </div>

      {/* Mobile floating info card */}
      <HeroMobileCard />
    </section>
  );
};
