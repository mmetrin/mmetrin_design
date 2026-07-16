import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { publicPath } from '../../utils/publicPath';
import './Header.css';

const TELEGRAM_URL = 'https://t.me/mmetrin';
const PORTFOLIO_OFFSET = 960;
const DESKTOP_HEADER_QUERY = '(min-width: 481px)';
const HIDE_AFTER_SCROLL_DOWN_MS = 1000;
const SCROLL_IDLE_RESET_MS = 180;

const NAV_ITEMS = [
  { label: 'портфолио', href: '#portfolio' },
  { label: 'отзывы', href: '#reviews' },
  { label: 'опыт работы', href: '#resume' },
  { label: 'AI‑фото', href: '#contact' },
];

const HOME_HREF = publicPath('/');

const useHeaderNavItems = () => {
  const { pathname } = useLocation();

  return useMemo(
    () =>
      NAV_ITEMS.map(item => ({
        ...item,
        href: pathname === '/' ? item.href : `${HOME_HREF}${item.href}`,
      })),
    [pathname]
  );
};

type HeaderNavLinkProps = {
  label: string;
  href: string;
  className: string;
  onNavigate?: () => void;
};

const HeaderNavLink = ({ label, href, className, onNavigate }: HeaderNavLinkProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const hashStart = href.indexOf('#');
    const hash = hashStart >= 0 ? href.slice(hashStart) : '';

    if (hash && pathname !== '/') {
      event.preventDefault();
      navigate({ pathname: '/', hash });
    }

    onNavigate?.();
  };

  return <a href={href} className={className} onClick={handleClick}>{label}</a>;
};

const TelegramMobileIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.527 7.568 19.83.504c.854-.31 1.6.209 1.323 1.503L18.086 16.456c-.226 1.008-.828 1.255-1.678.78l-4.634-3.415-2.236 2.157c-.247.247-.454.454-.93.454l.332-4.714 8.574-7.746c.373-.332-.08-.516-.578-.184L5.347 11.34.75 9.94c-1.006-.314-1.028-1.006.247-1.48z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2.5 6h19M2.5 12h19M2.5 18h19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 23.019 23.019" fill="none" aria-hidden>
    <g transform="translate(23.019, 10.141) rotate(135)">
      <path d="M1.469 6.92565C4.98677 7.26034 8.969 6.92628 16.969 6.92561" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M1.25 7.08382C3.01639 8.84979 5.6424 11.6727 8.67359 13.0933" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7.43589 1.25032C4.9624 2.30918 3.04349 4.42497 1.42652 7.25981" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  </svg>
);

/* ─── Full (expanded) header ─── */
export const FullHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navItems = useHeaderNavItems();

  return (
    <>
      <div className="full-header__inner">
        <div className="full-header__identity">
          <a href={HOME_HREF} className="full-header__avatar">
            <img
              src={publicPath('/images/avatar-full.png')}
              alt="Катерина Михайлова"
              className="full-header__avatar-img"
            />
          </a>
          <div className="full-header__name">
            <span className="full-header__name-text">Катерина Михайлова</span>
            <div className="full-header__status">
              <div className="full-header__status-dot-wrap">
                <span className="full-header__status-dot" />
              </div>
              <span className="full-header__status-text">открыта к предложениям</span>
            </div>
          </div>
        </div>

        <nav className="full-header__nav" aria-hidden="true">
          {navItems.map(({ label, href }) => (
            <HeaderNavLink key={label} label={label} href={href} className="full-header__nav-link" />
          ))}
        </nav>

        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="full-header__cta">
          <span className="full-header__cta-text">написать в telegram</span>
          <span className="full-header__cta-icon"><ArrowIcon /></span>
        </a>

        <div className="full-header__mobile-actions">
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="full-header__mobile-tg" aria-label="Написать в Telegram">
            <TelegramMobileIcon />
          </a>
          <button type="button" className="full-header__mobile-menu" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Full-screen menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <button type="button" className="mobile-menu__close" aria-label="Закрыть меню" onClick={closeMenu}>
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu__body">
          <nav className="mobile-menu__nav">
            {navItems.map(({ label, href }) => (
              <HeaderNavLink key={label} label={label} href={href} className="mobile-menu__nav-link" onNavigate={closeMenu} />
            ))}
          </nav>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mobile-menu__cta" onClick={closeMenu}>
            <span>написать в telegram</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
};

/* ─── Compact (pill) sticky header ─── */
const PillAvatar = () => (
  <a href={HOME_HREF} className="pill-avatar">
    <img
      src={publicPath('/images/avatar-pill.png')}
      alt="Катерина Михайлова"
      className="pill-avatar__img"
    />
  </a>
);

export const StickyHeader = () => {
  const [visible, setVisible] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const lastScrollYRef = useRef(0);
  const downScrollTimerRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const navItems = useHeaderNavItems();
  const { pathname } = useLocation();
  const matches = useMatches();
  const isNotFoundPage = matches.some(
    (match) => (match.handle as { isNotFoundPage?: boolean } | undefined)?.isNotFoundPage,
  );

  const clearDownScrollTimer = () => {
    if (downScrollTimerRef.current !== null) {
      window.clearTimeout(downScrollTimerRef.current);
      downScrollTimerRef.current = null;
    }
  };

  const clearScrollIdleTimer = () => {
    if (scrollIdleTimerRef.current !== null) {
      window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isNotFoundPage) {
      setVisible(true);
      return;
    }

    if (pathname.startsWith('/cases/')) {
      setVisible(true);
      return;
    }

    const check = () => setVisible(window.scrollY >= PORTFOLIO_OFFSET);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [isNotFoundPage, pathname]);

  useEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_HEADER_QUERY);
    const isCasePage = pathname.startsWith('/cases/');
    lastScrollYRef.current = window.scrollY;

    const resetDownScroll = () => {
      clearDownScrollTimer();
      clearScrollIdleTimer();
    };

    const checkDirection = () => {
      if (isNotFoundPage) {
        setHiddenByScroll(false);
        resetDownScroll();
        return;
      }

      if (!desktopMedia.matches) {
        setHiddenByScroll(false);
        lastScrollYRef.current = window.scrollY;
        resetDownScroll();
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (Math.abs(delta) < 4) {
        return;
      }

      if (delta < 0) {
        setHiddenByScroll(false);
        resetDownScroll();
      } else if ((isCasePage || currentY >= PORTFOLIO_OFFSET) && downScrollTimerRef.current === null) {
        downScrollTimerRef.current = window.setTimeout(() => {
          setHiddenByScroll(true);
          downScrollTimerRef.current = null;
        }, HIDE_AFTER_SCROLL_DOWN_MS);
      }

      clearScrollIdleTimer();
      scrollIdleTimerRef.current = window.setTimeout(() => {
        clearDownScrollTimer();
      }, SCROLL_IDLE_RESET_MS);

      lastScrollYRef.current = currentY;
    };

    const checkDesktop = () => {
      if (!desktopMedia.matches) {
        setHiddenByScroll(false);
        resetDownScroll();
      }
    };

    window.addEventListener('scroll', checkDirection, { passive: true });
    desktopMedia.addEventListener('change', checkDesktop);

    return () => {
      window.removeEventListener('scroll', checkDirection);
      desktopMedia.removeEventListener('change', checkDesktop);
      resetDownScroll();
    };
  }, [isNotFoundPage, pathname]);

  useEffect(() => {
    if (!visible) {
      setHiddenByScroll(false);
    }
  }, [visible]);

  const headerVisible = visible && !hiddenByScroll;

  return (
    <div
      className={`sticky-header${headerVisible ? ' sticky-header--visible' : ''}${isNotFoundPage ? ' sticky-header--expanded' : ''}`}
      aria-hidden={!headerVisible}
    >
      <div className="sticky-header__pill">
        <div className="sticky-header__identity">
          <PillAvatar />
          <div className="sticky-header__name">
            <span className="sticky-header__name-text">Катерина Михайлова</span>
            <div className="sticky-header__status">
              <span className="sticky-header__status-dot" />
              <span className="sticky-header__status-text">открыта к предложениям</span>
            </div>
          </div>
        </div>

        <nav className="sticky-header__nav">
          {navItems.map(({ label, href }) => (
            <HeaderNavLink key={label} label={label} href={href} className="sticky-header__nav-link" />
          ))}
        </nav>

        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="sticky-header__cta">
          <span className="sticky-header__cta-text">написать в telegram</span>
          <span className="sticky-header__cta-icon"><ArrowIcon /></span>
        </a>
      </div>
    </div>
  );
};

export const Header = StickyHeader;

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99023 19C7.7562 17.2336 16.5791 8.6076 17.9997 5.57642" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 19C16.234 17.2336 7.41114 8.6076 5.99051 5.57642" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

/* ─── Mobile sticky header (slides in when portfolio is reached) ─── */
export const MobileStickyHeader = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const navItems = useHeaderNavItems();
  const { pathname } = useLocation();
  const matches = useMatches();
  const isNotFoundPage = matches.some(
    (match) => (match.handle as { isNotFoundPage?: boolean } | undefined)?.isNotFoundPage,
  );

  useEffect(() => {
    if (isNotFoundPage) {
      setVisible(true);
      return;
    }

    if (pathname.startsWith('/cases/')) {
      setVisible(true);
      return;
    }

    const check = () => {
      const portfolio = document.getElementById('portfolio');
      if (!portfolio) return;
      setVisible(portfolio.getBoundingClientRect().top <= 0);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [isNotFoundPage, pathname]);

  // Close menu when header hides
  useEffect(() => { if (!visible) setMenuOpen(false); }, [visible]);

  useEffect(() => {
    let lastY = window.scrollY;

    const checkDirection = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) < 4) {
        return;
      }

      setDimmed(delta > 0 && currentY > 20);
      lastY = currentY;
    };

    checkDirection();
    window.addEventListener('scroll', checkDirection, { passive: true });
    return () => window.removeEventListener('scroll', checkDirection);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`mobile-sticky-header${visible ? ' mobile-sticky-header--visible' : ''}${dimmed ? ' mobile-sticky-header--dimmed' : ''}`}
        aria-hidden={!visible}
      >
        <div className="mobile-sticky-header__inner">
          <div className="mobile-sticky-header__identity">
            <a href={HOME_HREF} className="mobile-sticky-header__avatar">
              <img src={publicPath('/images/avatar-full.png')} alt="Катерина Михайлова" className="mobile-sticky-header__avatar-img" />
            </a>
            <div className="mobile-sticky-header__name">
              <span className="mobile-sticky-header__name-text">Катерина Михайлова</span>
              <div className="mobile-sticky-header__status">
                <span className="mobile-sticky-header__status-dot" />
                <span className="mobile-sticky-header__status-text">открыта к предложениям</span>
              </div>
            </div>
          </div>
          <div className="mobile-sticky-header__actions">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mobile-sticky-header__tg" aria-label="Написать в Telegram">
              <TelegramMobileIcon />
            </a>
            <button type="button" className="mobile-sticky-header__menu-btn" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <button type="button" className="mobile-menu__close" aria-label="Закрыть меню" onClick={closeMenu}>
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu__body">
          <nav className="mobile-menu__nav">
            {navItems.map(({ label, href }) => (
              <HeaderNavLink key={label} label={label} href={href} className="mobile-menu__nav-link" onNavigate={closeMenu} />
            ))}
          </nav>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mobile-menu__cta" onClick={closeMenu}>
            <span>написать в telegram</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
};
