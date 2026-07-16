import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicPath } from '../../utils/publicPath';
import './Footer.css';

const FOOTER_VARIANT_INTERVAL = 2000;
const FOOTER_AUTOPLAY_START_DELAY = 1000;
const FOOTER_VARIANT_LOAD_DISTANCE = 900;
const CONTACT_EMAIL = 'mmetrindesign@gmail.com';
const CONTACT_EMAIL_TEXT = 'Привет, Катерина! У нас к тебе предложение';
const CONTACT_EMAIL_LINK = `mailto:${CONTACT_EMAIL}?body=${encodeURIComponent(CONTACT_EMAIL_TEXT)}`;
type FooterVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
type FooterImageVariant = Exclude<FooterVariant, 1>;

type FooterVariantConfig = {
  buttonColor: string;
  buttonHoverColor: string;
  marqueeSrc: string;
  bodyClass: string;
};

const FOOTER_VARIANT_IDS: FooterVariant[] = [1, 13, 2, 4, 7, 10, 12, 8, 14, 3, 9, 5, 11];
const FOOTER_IMAGE_VARIANT_IDS: FooterImageVariant[] = [2, 3, 4, 7, 8, 5, 6, 9, 10, 11, 12, 13, 14];

const FOOTER_VARIANTS: Record<FooterVariant, FooterVariantConfig> = {
  1: {
    buttonColor: '#c6c2ff',
    buttonHoverColor: '#c6c2ff',
    marqueeSrc: publicPath('/images/footer/say-hello-text.svg'),
    bodyClass: '',
  },
  2: {
    buttonColor: '#80a300',
    buttonHoverColor: '#6f8d00',
    marqueeSrc: publicPath('/images/footer/footer-v2-marquee.svg'),
    bodyClass: 'footer-v2-active',
  },
  3: {
    buttonColor: '#07538f',
    buttonHoverColor: '#06487c',
    marqueeSrc: publicPath('/images/footer/footer-v3-marquee.svg'),
    bodyClass: 'footer-v3-active',
  },
  4: {
    buttonColor: '#e96d00',
    buttonHoverColor: '#c95f00',
    marqueeSrc: publicPath('/images/footer/footer-v4-marquee.svg'),
    bodyClass: 'footer-v4-active',
  },
  5: {
    buttonColor: '#07538f',
    buttonHoverColor: '#06487c',
    marqueeSrc: publicPath('/images/footer/footer-v5-marquee.svg'),
    bodyClass: 'footer-v5-active',
  },
  6: {
    buttonColor: '#009b90',
    buttonHoverColor: '#00847b',
    marqueeSrc: publicPath('/images/footer/footer-v6-marquee.svg'),
    bodyClass: 'footer-v6-active',
  },
  7: {
    buttonColor: '#80a300',
    buttonHoverColor: '#6f8d00',
    marqueeSrc: publicPath('/images/footer/footer-v2-marquee.svg'),
    bodyClass: 'footer-v7-active',
  },
  8: {
    buttonColor: '#80a300',
    buttonHoverColor: '#6f8d00',
    marqueeSrc: publicPath('/images/footer/footer-v2-marquee.svg'),
    bodyClass: 'footer-v8-active',
  },
  9: {
    buttonColor: '#890401',
    buttonHoverColor: '#6f0301',
    marqueeSrc: publicPath('/images/footer/footer-v9-marquee.svg'),
    bodyClass: 'footer-v9-active',
  },
  10: {
    buttonColor: '#890401',
    buttonHoverColor: '#6f0301',
    marqueeSrc: publicPath('/images/footer/footer-v9-marquee.svg'),
    bodyClass: 'footer-v10-active',
  },
  11: {
    buttonColor: '#890401',
    buttonHoverColor: '#6f0301',
    marqueeSrc: publicPath('/images/footer/footer-v9-marquee.svg'),
    bodyClass: 'footer-v11-active',
  },
  12: {
    buttonColor: '#D6CAB7',
    buttonHoverColor: '#C9B59F',
    marqueeSrc: publicPath('/images/footer/footer-v12-marquee.svg'),
    bodyClass: 'footer-v12-active',
  },
  13: {
    buttonColor: '#D6CAB7',
    buttonHoverColor: '#C9B59F',
    marqueeSrc: publicPath('/images/footer/footer-v13-marquee.svg'),
    bodyClass: 'footer-v13-active',
  },
  14: {
    buttonColor: '#D6CAB7',
    buttonHoverColor: '#C9B59F',
    marqueeSrc: publicPath('/images/footer/footer-v14-marquee.svg'),
    bodyClass: 'footer-v14-active',
  },
};

const FOOTER_VARIANT_BODY_CLASSES = ['footer-v2-active', 'footer-v3-active', 'footer-v4-active', 'footer-v5-active', 'footer-v6-active', 'footer-v7-active', 'footer-v8-active', 'footer-v9-active', 'footer-v10-active', 'footer-v11-active', 'footer-v12-active', 'footer-v13-active', 'footer-v14-active'];

const FooterBottom = () => (
  <div className="site-footer__bottom">
    <p className="site-footer__copy">© 2026 Катерина Михайлова</p>
    <Link to="/policy" className="site-footer__policy">Политики обработки данных</Link>
  </div>
);

type FooterProps = {
  fixedVariant?: FooterVariant;
  hideCaption?: boolean;
};

export const Footer = ({ fixedVariant, hideCaption = false }: FooterProps) => {
  const isVariantFixed = fixedVariant !== undefined;
  const [variant, setVariant] = useState<FooterVariant>(fixedVariant ?? 1);
  const [shouldLoadFooterVariants, setShouldLoadFooterVariants] = useState(isVariantFixed);
  const [areFooterVariantsReady, setAreFooterVariantsReady] = useState(false);
  const [marqueeCursor, setMarqueeCursor] = useState<{ x: number; y: number } | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const footerAutoplayStartedRef = useRef(false);
  const footerAutoplayDelayRef = useRef<number | null>(null);
  const footerAutoplayIntervalRef = useRef<number | null>(null);
  const variantTopRefs = {
    2: useRef<HTMLImageElement | null>(null),
    3: useRef<HTMLImageElement | null>(null),
    4: useRef<HTMLImageElement | null>(null),
    5: useRef<HTMLImageElement | null>(null),
    6: useRef<HTMLImageElement | null>(null),
    7: useRef<HTMLImageElement | null>(null),
    8: useRef<HTMLImageElement | null>(null),
    9: useRef<HTMLImageElement | null>(null),
    10: useRef<HTMLImageElement | null>(null),
    11: useRef<HTMLImageElement | null>(null),
    12: useRef<HTMLImageElement | null>(null),
    13: useRef<HTMLImageElement | null>(null),
    14: useRef<HTMLImageElement | null>(null),
  };
  const variantBottomRefs = {
    2: useRef<HTMLImageElement | null>(null),
    3: useRef<HTMLImageElement | null>(null),
    4: useRef<HTMLImageElement | null>(null),
    5: useRef<HTMLImageElement | null>(null),
    6: useRef<HTMLImageElement | null>(null),
    7: useRef<HTMLImageElement | null>(null),
    8: useRef<HTMLImageElement | null>(null),
    9: useRef<HTMLImageElement | null>(null),
    10: useRef<HTMLImageElement | null>(null),
    11: useRef<HTMLImageElement | null>(null),
    12: useRef<HTMLImageElement | null>(null),
    13: useRef<HTMLImageElement | null>(null),
    14: useRef<HTMLImageElement | null>(null),
  };

  const updateFooterVariantsReady = useCallback(() => {
    if (!shouldLoadFooterVariants) return;

    const imageVariantIds = fixedVariant === undefined
      ? FOOTER_IMAGE_VARIANT_IDS
      : fixedVariant === 1
        ? []
        : [fixedVariant as FooterImageVariant];

    const images = imageVariantIds.flatMap(item => [
      variantBottomRefs[item].current,
      variantTopRefs[item].current,
    ]);

    if (images.length === 0) {
      setAreFooterVariantsReady(true);
      return;
    }

    if (!images.every(img => img?.complete && img.naturalWidth > 0)) return;

    Promise.all(images.map(img => img?.decode?.().catch(() => undefined) ?? Promise.resolve()))
      .then(() => {
        requestAnimationFrame(() => setAreFooterVariantsReady(true));
      });
  }, [fixedVariant, shouldLoadFooterVariants]);

  const clearFooterAutoplayTimers = useCallback(() => {
    if (footerAutoplayDelayRef.current !== null) {
      window.clearTimeout(footerAutoplayDelayRef.current);
      footerAutoplayDelayRef.current = null;
    }

    if (footerAutoplayIntervalRef.current !== null) {
      window.clearInterval(footerAutoplayIntervalRef.current);
      footerAutoplayIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isVariantFixed) {
      setVariant(fixedVariant);
      setShouldLoadFooterVariants(true);
      return undefined;
    }

    setVariant(1);
    setShouldLoadFooterVariants(false);
    setAreFooterVariantsReady(false);

    const footerElement = footerRef.current;

    if (!footerElement) {
      setShouldLoadFooterVariants(true);
      return undefined;
    }

    const footer = footerElement;
    let frameId = 0;
    let initialCheckTimer = 0;
    let isDone = false;

    const stop = () => {
      window.removeEventListener('scroll', checkDistance);
      window.removeEventListener('resize', checkDistance);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(initialCheckTimer);
    };

    const loadVariants = () => {
      isDone = true;
      setShouldLoadFooterVariants(true);
      stop();
    };

    function checkDistance() {
      if (isDone) return;

      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const distanceToViewport = footer.getBoundingClientRect().top - window.innerHeight;

        if (distanceToViewport <= FOOTER_VARIANT_LOAD_DISTANCE) {
          loadVariants();
        }
      });
    }

    window.addEventListener('scroll', checkDistance, { passive: true });
    window.addEventListener('resize', checkDistance);
    initialCheckTimer = window.setTimeout(checkDistance, 1000);

    return stop;
  }, [fixedVariant, isVariantFixed]);

  useEffect(() => {
    if (isVariantFixed) return undefined;
    if (!areFooterVariantsReady) return undefined;

    const footerElement = footerRef.current;
    if (!footerElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || footerAutoplayStartedRef.current) return;

        footerAutoplayStartedRef.current = true;
        footerAutoplayDelayRef.current = window.setTimeout(() => {
          setVariant(v => {
            const currentIndex = FOOTER_VARIANT_IDS.indexOf(v);
            return FOOTER_VARIANT_IDS[(currentIndex + 1) % FOOTER_VARIANT_IDS.length];
          });
          footerAutoplayIntervalRef.current = window.setInterval(() => {
            setVariant(v => {
              const currentIndex = FOOTER_VARIANT_IDS.indexOf(v);
              return FOOTER_VARIANT_IDS[(currentIndex + 1) % FOOTER_VARIANT_IDS.length];
            });
          }, FOOTER_VARIANT_INTERVAL);
        }, FOOTER_AUTOPLAY_START_DELAY);
      },
      { threshold: 0.2, rootMargin: '0px 0px -15% 0px' }
    );

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
      clearFooterAutoplayTimers();
    };
  }, [areFooterVariantsReady, clearFooterAutoplayTimers, isVariantFixed]);

  useEffect(() => {
    FOOTER_VARIANT_BODY_CLASSES.forEach(bodyClass => {
      const classVariant = Number(bodyClass.match(/\d+/)?.[0]);
      document.body.classList.toggle(bodyClass, variant === classVariant);
    });
    return () => {
      FOOTER_VARIANT_BODY_CLASSES.forEach(bodyClass => {
        document.body.classList.remove(bodyClass);
      });
    };
  }, [variant]);

  const handleMarqueeMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMarqueeCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMarqueeMouseLeave = useCallback(() => {
    setMarqueeCursor(null);
  }, []);

  const imageVariantIds = fixedVariant === undefined
    ? FOOTER_IMAGE_VARIANT_IDS
    : fixedVariant === 1
      ? []
      : [fixedVariant as FooterImageVariant];
  const marqueeVariantIds = fixedVariant === undefined ? FOOTER_VARIANT_IDS : [fixedVariant];

  return (
    <footer
      className={`site-footer${hideCaption ? ' site-footer--no-caption' : ''}`}
      ref={footerRef}
      style={
        {
          '--footer-computer-mask': `url("${publicPath('/images/footer/katya-computer-mask.svg')}")`,
        } as React.CSSProperties
      }
    >
      <div className="site-footer__bg">
        <div className="site-footer__stage">

          {shouldLoadFooterVariants && (fixedVariant === undefined || fixedVariant === 1) && (
            <>
              {/* ── Нижний слой v1: цветная маска под бегущей строкой ── */}
              <div
                className={`site-footer__variant-layer site-footer__variant-layer--under${variant === 1 ? ' site-footer__variant-layer--active' : ''}`}
                aria-hidden={variant !== 1}
              >
                <div className="site-footer__color-layer">
                  <img
                    className="site-footer__color-photo"
                    src={publicPath('/images/footer/katya-color.jpg')}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
              </div>

              {/* ── Верхний слой v1: фото с телевизором поверх бегущей строки ── */}
              <div
                className={`site-footer__variant-layer site-footer__variant-layer--top${variant === 1 ? ' site-footer__variant-layer--active' : ''}`}
                aria-hidden={variant !== 1}
              >
                <img
                  className="site-footer__photo"
                  src={publicPath('/images/footer/katya-computer.png')}
                  alt="Катерина Михайлова"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </>
          )}

          {shouldLoadFooterVariants && imageVariantIds.map((variantId) => {
            const isActive = variant === variantId;
            const topSrc = publicPath(`/images/footer/footer-v${variantId}-top.png`);
            const bottomSrc = variantId === 2
              ? publicPath('/images/footer/footer-v2-bottom.png')
              : variantId === 3
                ? publicPath('/images/footer/footer-v3-bottom.png')
                : publicPath(`/images/footer/footer-v${variantId}-bottom.jpg`);

            return [
              (
                <img
                  key={`bottom-${variantId}`}
                  ref={variantBottomRefs[variantId]}
                  className={`site-footer__variant-layer site-footer__variant-layer--under${isActive ? ' site-footer__variant-layer--active' : ''} site-footer__v${variantId}-layer`}
                  src={bottomSrc}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onLoad={updateFooterVariantsReady}
                  aria-hidden={!isActive}
                />
              ),
              (
                <img
                  key={`top-${variantId}`}
                  ref={variantTopRefs[variantId]}
                  className={`site-footer__variant-layer site-footer__variant-layer--top${isActive ? ' site-footer__variant-layer--active' : ''} site-footer__v${variantId}-layer`}
                  src={topSrc}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onLoad={updateFooterVariantsReady}
                  aria-hidden={!isActive}
                />
              ),
            ];
          })}

          {/* ── Бегущая строка — фиксирована, одни координаты для всех вариантов ── */}
          {shouldLoadFooterVariants && (
            <div className="site-footer__marquee-wrap">
              <div className="site-footer__marquee-track">
                <span className="site-footer__marquee-item">
                  {marqueeVariantIds.map(item => (
                    <img
                      key={item}
                      className={`site-footer__marquee-img site-footer__marquee-img--v${item}${variant === item ? ' site-footer__marquee-img--active' : ''}`}
                      src={FOOTER_VARIANTS[item].marqueeSrc}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </span>
                <span className="site-footer__marquee-item">
                  {marqueeVariantIds.map(item => (
                    <img
                      key={item}
                      className={`site-footer__marquee-img site-footer__marquee-img--v${item}${variant === item ? ' site-footer__marquee-img--active' : ''}`}
                      src={FOOTER_VARIANTS[item].marqueeSrc}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </span>
              </div>
              <a
                className="site-footer__marquee-hitarea"
                href={CONTACT_EMAIL_LINK}
                aria-label="Отправить привет на почту"
                onMouseMove={handleMarqueeMouseMove}
                onMouseLeave={handleMarqueeMouseLeave}
              >
                {marqueeCursor && (
                  <span
                    className="site-footer__marquee-cursor-btn"
                    style={{
                      left: `${marqueeCursor.x}px`,
                      top: `${marqueeCursor.y}px`,
                      background: FOOTER_VARIANTS[variant].buttonColor,
                    }}
                  >
                    отправить "привет" на почту
                  </span>
                )}
              </a>
            </div>
          )}

          {/* ── Подпись case-cover__pill — фиксирована, всегда видна ── */}
          <div className="site-footer__caption" aria-hidden>
            <span className="site-footer__caption-text">ниже AI‑автопортреты: арт‑дирекшн мой от пикселя до финального промпта</span>
          </div>

          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};
