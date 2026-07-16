import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Hero.css';

export const Hero = () => {
  const [btnHidden, setBtnHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 480px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const firstCard = document.querySelector('.portfolio-card');
    if (!firstCard) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBtnHidden(true);
        } else {
          // Показать кнопку только если карточка ещё ниже viewport (не проскроллили мимо)
          setBtnHidden(entry.boundingClientRect.top <= 0);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -100px 0px' }
    );
    observer.observe(firstCard);
    return () => observer.disconnect();
  }, []);

  const btn = (
    <a href="#portfolio" className={`hero__btn${btnHidden ? ' hero__btn--hidden' : ''}`}>
      <span className="hero__btn-text">смотреть портфолио</span>
    </a>
  );

  return (
    <section className="hero">
      <div className="hero__text">
        <div className="hero__subtitle-group">
          <p className="hero__eyebrow">привет, я&nbsp;Катя. чуть‑чуть графический и..</p>
          <h1 className="hero__title">
            Продуктовый дизайнер<br />
            с&nbsp;6+ годами опыта в&nbsp;UI&nbsp;/&nbsp;UX
          </h1>
        </div>
        <p className="hero__description">
          Лидила веб‑привлечение&nbsp;<strong>B2B</strong>&nbsp;Т‑Банка, повышала конверсии&nbsp;и&nbsp;утили дебетовки&nbsp;Black&nbsp;(<strong>B2C</strong>), с&nbsp;нуля создавала нейростартап для&nbsp;Медси и&nbsp;ASHA
        </p>
      </div>
      {isMobile ? createPortal(btn, document.body) : btn}
    </section>
  );
};
