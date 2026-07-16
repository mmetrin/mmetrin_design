import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { publicPath } from '../../utils/publicPath';
import './ReviewsSection.css';
import { useExpandCollapse, EXPAND_DURATION, EXPAND_EASING } from '../../hooks/useExpandCollapse';

const FILTERS = [
  { id: 'all', label: 'все отзывы' },
  { id: 'leads', label: 'от руководителей' },
  { id: 'pm', label: 'от продактов и маркетологов' },
  { id: 'proj', label: 'от проджектов' },
  { id: 'design', label: 'от дизайнеров' },
  { id: 'edit', label: 'от редакторов' },
];

const ALL_REVIEW_IMAGES = Array.from({ length: 24 }, (_, i) =>
  publicPath(`/images/reviews/r${String(i + 1).padStart(2, '0')}.png`)
);

const FILTER_CONFIGS: Record<string, { images: string[]; showMore: boolean }> = {
  all: {
    images: ALL_REVIEW_IMAGES,
    showMore: true,
  },
  leads: {
    images: [publicPath('/images/reviews/review-leads.png')],
    showMore: true,
  },
  pm: {
    images: [publicPath('/images/reviews/review-pm.png')],
    showMore: true,
  },
  proj: {
    images: [publicPath('/images/reviews/review-proj.png')],
    showMore: true,
  },
  design: {
    images: [publicPath('/images/reviews/review-design.png')],
    showMore: false,
  },
  edit: {
    images: [publicPath('/images/reviews/review-edit.png')],
    showMore: false,
  },
};

const DESKTOP_COLLAPSED_HEIGHT = 600;
const MOBILE_COLLAPSED_HEIGHT = 550;
const MOBILE_MEDIA_QUERY = '(max-width: 480px)';

const getCollapsedHeight = () =>
  window.matchMedia(MOBILE_MEDIA_QUERY).matches ? MOBILE_COLLAPSED_HEIGHT : DESKTOP_COLLAPSED_HEIGHT;

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5.99023 19C7.7562 17.2336 16.5791 8.6076 17.9997 5.57642" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 19C16.234 17.2336 7.41114 8.6076 5.99051 5.57642" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 14.3436 18.219" fill="none" aria-hidden>
    <g transform="translate(0, 18.219) rotate(-90)">
      <path d="M1.469 6.92565C4.98677 7.26034 8.969 6.92628 16.969 6.92561" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M1.25 7.08382C3.01639 8.84979 5.6424 11.6727 8.67359 13.0933" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7.43589 1.25032C4.9624 2.30918 3.04349 4.42497 1.42652 7.25981" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  </svg>
);

const NoticeIcon = () => (
  <svg className="reviews-section__notice-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="#B6B4D5"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.7498 7.87817C13.8277 7.87817 13.7922 5.37817 12.0248 5.37817C9.94684 5.37817 9.98231 7.87817 11.7498 7.87817ZM13.2498 17.4353V10.5406C13.2498 9.98828 12.8021 9.37817 12.2498 9.37817C10.7497 9.37817 10.7497 9.50024 10.7497 11.6214L10.7497 17.4353C10.7486 18.5002 13.2498 18.5002 13.2498 17.4353Z" fill="#FFFFFF"/>
  </svg>
);

const ReviewsFilters = ({ active, onSelect }: { active: string; onSelect: (id: string) => void }) => (
  <div className="reviews-section__filters">
    {FILTERS.map(f => (
      <button
        key={f.id}
        className={`portfolio-chip${active === f.id ? ' portfolio-chip--active' : ''}`}
        onClick={() => onSelect(f.id)}
        aria-pressed={active === f.id}
      >
        {f.label}
      </button>
    ))}
  </div>
);

export const ReviewsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [contentAnimationPhase, setContentAnimationPhase] = useState(0);
  const { expanded, toggle, triggerRef, setExpandedState } = useExpandCollapse();
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeConfig = FILTER_CONFIGS[activeFilter] ?? FILTER_CONFIGS.all;
  const images = activeConfig.images;
  const shouldShowMoreButton = activeConfig.showMore;
  const heightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filterSwitchFromHeightRef = useRef<number | null>(null);
  const nonAllExpandedRef = useRef(false);
  const prevFilterRef = useRef(activeFilter);
  const prevExpandedRef = useRef(expanded);
  const prevImageCountRef = useRef(images.length);
  const prevShowMoreButtonRef = useRef(shouldShowMoreButton);

  // JS-driven height animation — same easing/duration as portfolio collapse.
  // This avoids the jerky max-height → none jump that CSS alone can't smooth.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const filterChanged =
      prevFilterRef.current !== activeFilter ||
      prevImageCountRef.current !== images.length ||
      prevShowMoreButtonRef.current !== shouldShowMoreButton;
    const expandedChanged = prevExpandedRef.current !== expanded;

    if (heightTimerRef.current !== null) {
      clearTimeout(heightTimerRef.current);
      heightTimerRef.current = null;
    }

    const switchFromHeight = filterSwitchFromHeightRef.current;

    if (!shouldShowMoreButton) {
      if (filterChanged && switchFromHeight !== null) {
        el.style.transition = 'none';
        el.style.height = `${switchFromHeight}px`;
        el.offsetHeight;
        el.style.transition = `height ${EXPAND_DURATION}ms ${EXPAND_EASING}`;
        el.style.height = `${el.scrollHeight}px`;
        heightTimerRef.current = setTimeout(() => {
          if (wrapRef.current) wrapRef.current.style.height = 'auto';
          heightTimerRef.current = null;
        }, EXPAND_DURATION + 30);
      } else {
        el.style.transition = 'none';
        el.style.height = 'auto';
      }
      filterSwitchFromHeightRef.current = null;
      prevFilterRef.current = activeFilter;
      prevExpandedRef.current = expanded;
      prevImageCountRef.current = images.length;
      prevShowMoreButtonRef.current = shouldShowMoreButton;
      return;
    }

    if (filterChanged && !expandedChanged) {
      if (expanded && switchFromHeight !== null) {
        el.style.transition = 'none';
        el.style.height = `${switchFromHeight}px`;
        el.offsetHeight;
        el.style.transition = `height ${EXPAND_DURATION}ms ${EXPAND_EASING}`;
        el.style.height = `${el.scrollHeight}px`;
        heightTimerRef.current = setTimeout(() => {
          if (wrapRef.current) wrapRef.current.style.height = 'auto';
          heightTimerRef.current = null;
        }, EXPAND_DURATION + 30);
      } else {
        el.style.transition = 'none';
        el.style.height = `${getCollapsedHeight()}px`;
        el.offsetHeight;
        el.style.transition = `height ${EXPAND_DURATION}ms ${EXPAND_EASING}`;
      }
      filterSwitchFromHeightRef.current = null;
      prevFilterRef.current = activeFilter;
      prevExpandedRef.current = expanded;
      prevImageCountRef.current = images.length;
      prevShowMoreButtonRef.current = shouldShowMoreButton;
      return;
    }

    el.style.transition = `height ${EXPAND_DURATION}ms ${EXPAND_EASING}`;

    if (expanded) {
      // Ensure we start the transition FROM the collapsed height
      el.style.height = `${getCollapsedHeight()}px`;
      el.offsetHeight; // force reflow to establish start point
      el.style.height = `${el.scrollHeight}px`;
      // After animation, release to auto so images / window resize work
      heightTimerRef.current = setTimeout(() => {
        if (wrapRef.current) wrapRef.current.style.height = 'auto';
        heightTimerRef.current = null;
      }, EXPAND_DURATION + 30);
    } else {
      // Pin current height (may be 'auto') before transitioning down
      if (!el.style.height || el.style.height === 'auto') {
        el.style.height = `${el.offsetHeight}px`;
        el.offsetHeight; // force reflow
      }
      el.style.height = `${getCollapsedHeight()}px`;
    }

    prevFilterRef.current = activeFilter;
    prevExpandedRef.current = expanded;
    prevImageCountRef.current = images.length;
    prevShowMoreButtonRef.current = shouldShowMoreButton;
    filterSwitchFromHeightRef.current = null;

    return () => {
      if (heightTimerRef.current !== null) clearTimeout(heightTimerRef.current);
    };
  }, [expanded, shouldShowMoreButton, activeFilter, images.length]);

  useEffect(() => {
    if (activeFilter !== 'all') {
      nonAllExpandedRef.current = expanded;
    }
  }, [activeFilter, expanded]);

  const handleFilterChange = (id: string) => {
    const next = id !== 'all' && id === activeFilter ? 'all' : id;
    filterSwitchFromHeightRef.current = wrapRef.current?.offsetHeight ?? null;
    if (activeFilter !== 'all') {
      nonAllExpandedRef.current = expanded;
    }
    setActiveFilter(next);
    setExpandedState(next === 'all' ? false : nonAllExpandedRef.current);
    setContentAnimationPhase(phase => phase ^ 1);
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const nextImage = useCallback(() => setLightbox(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) nextImage();
    else if (dx > 50) prevImage();
    touchStartX.current = null;
  }, [nextImage, prevImage]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox, prevImage, nextImage]);

  return (
    <section className="reviews-section" id="reviews">

      {/* Заголовок и фильтры — на белом фоне страницы */}
      <div className="reviews-section__header-area">
        <div className="reviews-section__inner">
          <div data-reveal>
            <div className="reviews-section__header">
              <h2 className="reviews-section__title">Отзывы</h2>
              <div className="reviews-section__mobile-notice">
                <div className="reviews-section__notice-banner">
                  <NoticeIcon />
                  <p className="reviews-section__notice-text">
                    Отзывы прикреплены картинками, так как это скриншоты с сохранением пунктуации и орфографии автором → нажмите на отзыв чтобы увеличить или ознакомьтесь с отзывами с компьютера
                  </p>
                </div>
              </div>
              <ReviewsFilters active={activeFilter} onSelect={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Градиент: белый → #f3f4f7, после фильтров */}
      <div className="reviews-section__filter-fade" />

      {/* Серая область с белым контейнером */}
      <div className="reviews-section__content-area">
        <div data-reveal style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
          <div className="reviews-section__card">
            <div
              className={`reviews-section__content-switch ${contentAnimationPhase === 0 ? 'reviews-section__content-switch--phase-a' : 'reviews-section__content-switch--phase-b'}`}
            >

              {/* Общие упоминания — только при фильтре «все отзывы» */}
              {activeFilter === 'all' && (
                <div className="reviews-section__mentions">
                  <p className="reviews-section__mentions-title">
                    Общие упоминания коллег из Т‑Банка при сборе отзывов
                  </p>
                  <div className="reviews-section__mentions-strip">
                    <img
                      src={publicPath('/images/reviews/mentions.png')}
                      alt="Общие упоминания коллег"
                      draggable={false}
                      className="reviews-section__mentions-img reviews-section__mentions-img--desktop"
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      src={publicPath('/images/reviews/mentions-mobile.png')}
                      alt="Общие упоминания коллег"
                      draggable={false}
                      className="reviews-section__mentions-img reviews-section__mentions-img--mobile"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              )}

              {/* Изображения отзывов */}
              <div className="reviews-section__body">
                <div className="reviews-section__wrap" ref={wrapRef}>
                  {images.map((src, i) => (
                    <img
                      key={`${activeFilter}-${i}`}
                      src={src}
                      alt="Отзывы"
                      className={`reviews-section__img${!expanded && i >= 3 ? ' reviews-section__img--mobile-hidden' : ''}`}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      onClick={() => setLightbox(i)}
                    />
                  ))}
                  {!expanded && shouldShowMoreButton && <div className="reviews-section__img-fade" />}
                </div>

                {shouldShowMoreButton && (
                  <div
                    className="reviews-section__more"
                    ref={triggerRef as React.RefObject<HTMLDivElement>}
                  >
                    <button
                      className={`portfolio-show-btn${expanded ? ' portfolio-show-btn--open' : ''}`}
                      onClick={toggle}
                    >
                      <ArrowDownIcon />
                      <span>{expanded ? 'скрыть часть отзывов' : 'показать все отзывы'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Нижний градиент: #f3f4f7 → белый */}
      <div className="reviews-section__bottom-fade" />

      {/* Lightbox (mobile only) */}
      {lightbox !== null && (
        <div className="reviews-lightbox" onClick={closeLightbox} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button className="reviews-lightbox__close" onClick={closeLightbox} aria-label="Закрыть">
            <CloseIcon />
          </button>
          <div className="reviews-lightbox__img-wrap">
            <img
              className="reviews-lightbox__img"
              src={images[lightbox]}
              alt="Отзыв"
              onClick={e => e.stopPropagation()}
            />
          </div>
          {images.length > 1 && (
            <div className="reviews-lightbox__controls" onClick={e => e.stopPropagation()}>
              <button className="reviews-lightbox__arrow reviews-lightbox__arrow--prev" onClick={e => { e.stopPropagation(); prevImage(); }} aria-label="Предыдущий">
                <ArrowDownIcon />
              </button>
              <button className="reviews-lightbox__arrow reviews-lightbox__arrow--next" onClick={e => { e.stopPropagation(); nextImage(); }} aria-label="Следующий">
                <ArrowDownIcon />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
