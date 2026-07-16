import { useCallback, useEffect, useRef, useState } from 'react';
import { HeroSection } from '../../components/HeroSection';
import { MAIN_CARDS, PortfolioSection } from '../../components/PortfolioSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { ReviewsSection } from '../../components/ReviewsSection';
import { ContactSection } from '../../components/ContactSection';
import { ResumeSection } from '../../components/ResumeSection';
import { useReveal } from '../../hooks';
import { HOME_INITIAL_CONTENT_READY_EVENT } from '../../utils/initialPageLoader';

const INITIAL_PORTFOLIO_PREVIEW_COUNT = 2;

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();
    image.fetchPriority = 'low';
    image.decoding = 'async';
    image.onload = image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      resolve();
    }
  });

const isPortfolioReturnVisible = () => {
  const portfolio = document.getElementById('portfolio');

  if (!portfolio) {
    return false;
  }

  const portfolioBottom = portfolio.offsetTop + portfolio.offsetHeight;
  return window.scrollY + window.innerHeight >= portfolioBottom;
};

export const HomePage = () => {
  useReveal();
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [arePortfolioPreviewsReady, setArePortfolioPreviewsReady] = useState(false);
  const hasReportedReadyRef = useRef(false);

  const handleHeroReady = useCallback(() => setIsHeroReady(true), []);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      MAIN_CARDS.slice(0, INITIAL_PORTFOLIO_PREVIEW_COUNT).map((card) => preloadImage(card.image)),
    ).then(() => {
      if (!cancelled) {
        setArePortfolioPreviewsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHeroReady || !arePortfolioPreviewsReady || hasReportedReadyRef.current) {
      return;
    }

    hasReportedReadyRef.current = true;
    window.dispatchEvent(new Event(HOME_INITIAL_CONTENT_READY_EVENT));
  }, [arePortfolioPreviewsReady, isHeroReady]);

  return (
    <>
      <HeroSection onInitialContentReady={handleHeroReady} />
      <PortfolioSection />
      <PortfolioReturnButton getIsVisible={isPortfolioReturnVisible} />
      <ReviewsSection />
      <ResumeSection />
      <div data-reveal><ContactSection /></div>
    </>
  );
};
