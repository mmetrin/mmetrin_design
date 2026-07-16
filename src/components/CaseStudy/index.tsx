import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { publicPath } from '../../utils/publicPath';
import { preloadNextCases } from '../../utils/preloadNextCases';
import { CASE_IMAGE_DIMENSIONS } from '../../utils/caseImageDimensions';
import './CaseStudy.css';

type CaseCoverStat = {
  text: string;
};

type CaseCoverProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  projectHref?: string;
  projectLabel?: string;
  backgroundSrc: string;
  mobileBackgroundSrc?: string;
  stats: CaseCoverStat[];
};

type CaseTextProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type CaseHeadingProps = CaseTextProps & {
  id?: string;
  actionHref?: string;
  actionLabel?: string;
};

type CaseSidebarItem = {
  id: string;
  title: string;
  level?: number;
  desktopOnly?: boolean;
};

type CaseSidebarProps = {
  items: CaseSidebarItem[];
};

type CaseTextListProps = {
  intro?: React.ReactNode;
  items: string[];
  outro?: React.ReactNode;
};

type CaseImageProps = {
  src: string;
  mobileSrc?: string;
  alt: string;
};

type CaseBannerProps = {
  children: React.ReactNode;
};

type CaseDeferredImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt'
> & {
  src: string;
  alt: string;
};

type CaseDeferredIframeProps = Omit<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  'src'
> & {
  src: string;
};

const getCaseImageDimensions = (src: string) => {
  const imagePathStart = src.indexOf('/images/cases/');
  const imagePath = imagePathStart >= 0 ? src.slice(imagePathStart).split(/[?#]/)[0] : src;
  return CASE_IMAGE_DIMENSIONS[imagePath];
};

const useDeferredCaseMedia = <T extends HTMLElement>() => {
  const mediaRef = useRef<T>(null);

  return { mediaRef };
};

export const scrollToCaseSection = (id: string) => {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const rect = target.getBoundingClientRect();
  const targetPageTop = rect.top + window.scrollY;
  const targetHeight = rect.height;
  const viewportHeight = window.innerHeight;
  const headerOffset = isMobile ? 88 : 96;
  const visualCenter = isMobile ? viewportHeight * 0.26 : viewportHeight * 0.34;
  const targetTop =
    targetPageTop - visualCenter + Math.min(targetHeight * 0.5, 28) - headerOffset;

  window.history.replaceState(null, '', `#${id}`);
  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
};

const ArrowRightTopIcon = () => (
  <svg width="24" height="24" viewBox="0 0 23.019 23.019" fill="none" aria-hidden>
    <g transform="translate(23.019, 10.141) rotate(135)">
      <path
        d="M1.469 6.92565C4.98677 7.26034 8.969 6.92628 16.969 6.92561"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M1.25 7.08382C3.01639 8.84979 5.6424 11.6727 8.67359 13.0933"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M7.43589 1.25032C4.9624 2.30918 3.04349 4.42497 1.42652 7.25981"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const QueueIcon = () => (
  <img src={publicPath('/images/cases/duplicate-applications/mobile-sidebar-queue.svg')} alt="" aria-hidden />
);

const CrossIcon = () => (
  <img
    className="case-mobile-sidebar__cross-icon"
    src={publicPath('/images/cases/duplicate-applications/mobile-sidebar-cross.svg')}
    alt=""
    aria-hidden
  />
);

const NoticeIcon = () => (
  <svg
    className="reviews-section__notice-icon case-banner__icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
      fill="#B6B4D5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7498 7.87817C13.8277 7.87817 13.7922 5.37817 12.0248 5.37817C9.94684 5.37817 9.98231 7.87817 11.7498 7.87817ZM13.2498 17.4353V10.5406C13.2498 9.98828 12.8021 9.37817 12.2498 9.37817C10.7497 9.37817 10.7497 9.50024 10.7497 11.6214L10.7497 17.4353C10.7486 18.5002 13.2498 18.5002 13.2498 17.4353Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const CaseCover = ({
  title,
  backHref,
  backLabel = 'ко всем работам',
  projectHref,
  projectLabel,
  backgroundSrc,
  mobileBackgroundSrc,
  stats,
}: CaseCoverProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobileCover, setIsMobileCover] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 900px)').matches,
  );
  const [coverLoaded, setCoverLoaded] = useState(false);
  const loadedCoverImagesRef = useRef(new Set<string>());
  const portfolioBackHref = backHref ?? `/?portfolioCase=${encodeURIComponent(pathname)}#portfolio`;
  const isInternalBackLink = portfolioBackHref.startsWith('/');
  const visibleBackgroundSrc = isMobileCover && mobileBackgroundSrc ? mobileBackgroundSrc : backgroundSrc;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const updateCoverMode = () => {
      setIsMobileCover(media.matches);
      setCoverLoaded(false);
    };

    updateCoverMode();
    media.addEventListener('change', updateCoverMode);
    return () => media.removeEventListener('change', updateCoverMode);
  }, []);

  useLayoutEffect(() => {
    setCoverLoaded(false);
    loadedCoverImagesRef.current.clear();
  }, [visibleBackgroundSrc]);

  useEffect(() => {
    if (!coverLoaded) {
      return;
    }

    const preloadFollowingCases = () => {
      const preload = () => preloadNextCases(pathname);
      const requestIdleCallback = (window as unknown as {
        requestIdleCallback?: (callback: () => void, options: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      }).requestIdleCallback;

      if (requestIdleCallback) {
        const idleCallbackId = requestIdleCallback(preload, { timeout: 2000 });
        return () => {
          (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleCallbackId);
        };
      }

      const timeoutId = window.setTimeout(preload, 500);
      return () => window.clearTimeout(timeoutId);
    };

    return preloadFollowingCases();
  }, [coverLoaded, pathname]);

  const handleCoverLoad = (imageName: string) => {
    loadedCoverImagesRef.current.add(imageName);

    const requiredImageCount = isMobileCover && mobileBackgroundSrc ? 1 : 2;
    if (loadedCoverImagesRef.current.size < requiredImageCount) {
      return;
    }

    setCoverLoaded(true);
  };

  return (
    <section className="case-cover" data-reveal>
      <div className="case-cover__top">
        <div className="case-cover__side">
          <a
            className="case-cover__pill"
            href={portfolioBackHref}
            onClick={(event) => {
              if (!isInternalBackLink) {
                return;
              }

              event.preventDefault();
              navigate(portfolioBackHref);
            }}
          >
            <ArrowLeftIcon />
            <span>{backLabel}</span>
          </a>
        </div>
        <h1 className="case-cover__title">{title}</h1>
        <div className="case-cover__side case-cover__side--right">
          {projectHref && projectLabel && (
            <a className="case-cover__pill" href={projectHref} target="_blank" rel="noreferrer">
              <span>{projectLabel}</span>
              <ArrowRightTopIcon />
            </a>
          )}
        </div>
      </div>

      <div className={`case-cover__panel${coverLoaded ? ' case-cover__panel--loaded' : ''}`}>
        <div className="case-cover__skeleton" aria-hidden />
        {isMobileCover && mobileBackgroundSrc ? (
          <img
            className="case-cover__bg-mobile"
            src={visibleBackgroundSrc}
            alt=""
            aria-hidden
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => handleCoverLoad('mobile')}
            onError={() => handleCoverLoad('mobile')}
          />
        ) : (
          <>
            <img
              className="case-cover__bg case-cover__bg--main"
              src={visibleBackgroundSrc}
              alt=""
              aria-hidden
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={() => handleCoverLoad('main')}
              onError={() => handleCoverLoad('main')}
            />
            <img
              className="case-cover__bg case-cover__bg--mirror"
              src={visibleBackgroundSrc}
              alt=""
              aria-hidden
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={() => handleCoverLoad('mirror')}
              onError={() => handleCoverLoad('mirror')}
            />
          </>
        )}
        <div className="case-cover__stats">
          {stats.map((stat) => (
            <div className="case-cover__stat" key={stat.text}>
              {stat.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CaseSidebar = ({ items }: CaseSidebarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 34 });
  const [visible, setVisible] = useState(false);
  const [docked, setDocked] = useState(false);
  const [portfolioCardsVisible, setPortfolioCardsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 900px)').matches,
  );
  const sidebarRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const visibleItems = useMemo(
    () => items.filter((item) => !item.desktopOnly || !isMobile),
    [isMobile, items],
  );

  useEffect(() => {
    const updateSidebar = () => {
      const headings = visibleItems
        .map((item) => document.getElementById(item.id))
        .filter((node): node is HTMLElement => Boolean(node));
      const firstHeading = headings[0];

      if (!firstHeading) {
        return;
      }

      const sidebarHeight = sidebarRef.current?.offsetHeight ?? visibleItems.length * 34;
      const dockLine = Math.max(24, (window.innerHeight - sidebarHeight) / 2);
      const activationLine = window.innerHeight * 0.5;
      const portfolioCards = Array.from(
        document.querySelectorAll<HTMLElement>('#case-more-work .portfolio-card'),
      );
      const hasVisiblePortfolioCard = portfolioCards.some((card) => {
        const rect = card.getBoundingClientRect();
        return (
          rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0
        );
      });
      const shouldShow =
        firstHeading.getBoundingClientRect().top <= dockLine && !hasVisiblePortfolioCard;

      setPortfolioCardsVisible(hasVisiblePortfolioCard);
      setVisible(shouldShow);
      setDocked(shouldShow);

      if (hasVisiblePortfolioCard) {
        setMobileOpen(false);
      }

      const current = headings.reduce(
        (lastActive, heading, index) =>
          heading.getBoundingClientRect().top <= activationLine ? index : lastActive,
        0,
      );

      setActiveIndex(current);

      const activeItem = itemRefs.current[current];
      if (activeItem) {
        setIndicatorStyle({
          top: activeItem.offsetTop,
          height: activeItem.offsetHeight,
        });
      }
    };

    updateSidebar();
    window.addEventListener('scroll', updateSidebar, { passive: true });
    window.addEventListener('resize', updateSidebar);

    return () => {
      window.removeEventListener('scroll', updateSidebar);
      window.removeEventListener('resize', updateSidebar);
    };
  }, [visibleItems]);

  useEffect(() => {
    const onResize = () => {
      const nextIsMobile = window.matchMedia('(max-width: 900px)').matches;
      setIsMobile(nextIsMobile);

      if (!nextIsMobile) {
        setMobileOpen(false);
      }
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={sidebarRef}
        className={`case-sidebar${visible ? ' case-sidebar--visible' : ''}${docked ? ' case-sidebar--docked' : ''}`}
        aria-label="Содержание кейса"
        style={
          {
            '--active-index': activeIndex,
            '--indicator-top': `${indicatorStyle.top}px`,
            '--indicator-height': `${indicatorStyle.height}px`,
          } as React.CSSProperties
        }
      >
        <span className="case-sidebar__indicator" aria-hidden />
        {visibleItems.map((item, index) => (
          <a
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className={`case-sidebar__item${item.level ? ` case-sidebar__item--level-${item.level}` : ''}`}
            href={`#${item.id}`}
            key={item.id}
            onClick={(event) => {
              event.preventDefault();
              scrollToCaseSection(item.id);
            }}
          >
            <span>{item.title}</span>
          </a>
        ))}
      </nav>

      <div
        className={`case-mobile-sidebar${mobileOpen ? ' case-mobile-sidebar--open' : ''}${portfolioCardsVisible ? ' case-mobile-sidebar--hidden' : ''}`}
      >
        <button
          className="case-mobile-sidebar__backdrop"
          type="button"
          aria-label="Закрыть содержание"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />
        <div className="case-mobile-sidebar__sheet">
          <nav
            className="case-mobile-sidebar__popup"
            aria-label="Содержание кейса"
            aria-hidden={!mobileOpen}
            style={{ '--active-index': activeIndex } as React.CSSProperties}
          >
            <span className="case-mobile-sidebar__indicator" aria-hidden />
            {visibleItems.map((item) => (
              <a
                className={`case-mobile-sidebar__item${item.level ? ` case-mobile-sidebar__item--level-${item.level}` : ''}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  setMobileOpen(false);
                  scrollToCaseSection(item.id);
                }}
              >
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
          <button
            className="case-mobile-sidebar__toggle"
            type="button"
            aria-label={mobileOpen ? 'Скрыть содержание' : 'Показать содержание'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CrossIcon /> : <QueueIcon />}
          </button>
        </div>
      </div>
    </>
  );
};

export const CaseHeading = ({ children, id, actionHref, actionLabel }: CaseHeadingProps) => (
  <section className="case-block case-heading" id={id} data-reveal>
    <h2>{children}</h2>
    {actionHref && actionLabel && (
      <a
        className="case-heading__action case-cover__pill"
        href={actionHref}
        target="_blank"
        rel="noreferrer"
      >
        <span>{actionLabel}</span>
        <ArrowRightTopIcon />
      </a>
    )}
  </section>
);

export const CaseSubheading = ({ children, id }: CaseTextProps & { id?: string }) => (
  <section className="case-block case-subheading" id={id} data-reveal>
    <h3>{children}</h3>
  </section>
);

export const CaseText = ({ children, className, id }: CaseTextProps) => (
  <section className={`case-block case-text${className ? ` ${className}` : ''}`} id={id} data-reveal>
    <div>{children}</div>
  </section>
);

export const CaseTextList = ({ intro, items, outro }: CaseTextListProps) => (
  <section className="case-block case-text case-text-list" data-reveal>
    {intro && <p>{intro}</p>}
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    {outro && <p>{outro}</p>}
  </section>
);

export const CaseTextListAlt = ({ intro, items, outro }: CaseTextListProps) => (
  <section className="case-block case-text case-text-list case-text-list--alt" data-reveal>
    {intro && <p>{intro}</p>}
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    {outro && <p>{outro}</p>}
  </section>
);

export const CaseImage = ({ src, mobileSrc, alt }: CaseImageProps) => {
  const { mediaRef } = useDeferredCaseMedia<HTMLElement>();
  const [isLoaded, setIsLoaded] = useState(false);
  const displayedSrc =
    mobileSrc && window.matchMedia('(max-width: 900px)').matches ? mobileSrc : src;
  const dimensions = getCaseImageDimensions(displayedSrc);

  useEffect(() => {
    setIsLoaded(false);
  }, [displayedSrc]);

  return (
    <figure ref={mediaRef} className={`case-image${isLoaded ? ' case-image--loaded' : ''}`}>
      <div className="case-image__skeleton" aria-hidden="true" />
      <picture>
        {mobileSrc && <source media="(max-width: 900px)" srcSet={mobileSrc} />}
        <img
          src={src}
          alt={alt}
          width={dimensions?.[0]}
          height={dimensions?.[1]}
          loading="lazy"
          decoding="async"
          onLoad={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setIsLoaded(true);
          }}
        />
      </picture>
    </figure>
  );
};

export const CaseDeferredImage = ({ src, alt, onLoad, onError, ...props }: CaseDeferredImageProps) => {
  const { mediaRef } = useDeferredCaseMedia<HTMLDivElement>();
  const [isLoaded, setIsLoaded] = useState(false);
  const dimensions = getCaseImageDimensions(src);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div
      ref={mediaRef}
      className={`case-deferred-image${isLoaded ? ' case-deferred-image--loaded' : ''}`}
      style={dimensions ? { aspectRatio: `${dimensions[0]} / ${dimensions[1]}` } : undefined}
    >
      <div className="case-deferred-image__skeleton" aria-hidden="true" />
      <img
        {...props}
        src={src}
        alt={alt}
        width={dimensions?.[0]}
        height={dimensions?.[1]}
        loading="lazy"
        decoding="async"
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
      />
    </div>
  );
};

export const CaseDeferredIframe = ({ src, ...props }: CaseDeferredIframeProps) => {
  const { mediaRef } = useDeferredCaseMedia<HTMLIFrameElement>();

  return (
    <iframe
      {...props}
      ref={mediaRef}
      src={src}
      loading="lazy"
      onLoad={(event) => {
        props.onLoad?.(event);
      }}
      onError={(event) => {
        props.onError?.(event);
      }}
    />
  );
};

export const CaseBanner = ({ children }: CaseBannerProps) => (
  <aside className="case-block case-banner" data-reveal>
    <div className="case-banner__inner">
      <NoticeIcon />
      <p>{children}</p>
    </div>
  </aside>
);
