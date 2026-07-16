import { useEffect, useState } from 'react';
import './PortfolioReturnButton.css';

const PortfolioReturnIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 19V5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M6.75 10.25C8.38 8.1 10.08 6.43 12 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M17.25 10.25C15.62 8.1 13.92 6.43 12 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

type PortfolioReturnButtonProps = {
  visibleAfterPx?: number;
  getIsVisible?: () => boolean;
};

export const PortfolioReturnButton = ({
  visibleAfterPx = 0,
  getIsVisible,
}: PortfolioReturnButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(getIsVisible ? getIsVisible() : window.scrollY >= visibleAfterPx);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [getIsVisible, visibleAfterPx]);

  return (
    <a
      className={`portfolio-return${isVisible ? ' portfolio-return--visible' : ''}`}
      href="#top"
      aria-label="Вернуться наверх страницы"
    >
      <PortfolioReturnIcon />
    </a>
  );
};
