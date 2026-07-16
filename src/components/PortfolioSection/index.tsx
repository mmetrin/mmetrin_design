import { useState, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { publicPath } from '../../utils/publicPath';
import './PortfolioSection.css';
import { useExpandCollapse } from '../../hooks/useExpandCollapse';

export const FILTERS = [
  { id: 'all', label: 'все работы' },
  { id: 'product', label: 'продуктовые кейсы' },
  { id: 'art', label: 'мой арт‑дирекшн' },
  { id: 'ai', label: 'AI' },
  { id: '3d', label: '3D' },
  { id: 'b2b', label: 'B2B' },
  { id: 'b2c', label: 'B2C' },
];

export interface PortfolioCardData {
  title: string;
  description: string;
  link: string;
  linkHref: string;
  tags: string[];
  image: string;
  filters: string[];
  figmaLink?: string;
  caseHref?: string;
}

export const MAIN_CARDS: PortfolioCardData[] = [
  {
    title: 'Революция формы карты Black: от гипотез до роста конверсии',
    description:
      'Через серию UX‑улучшений повысила конверсию и утили → форма стала основой для других карточных продуктов',
    link: 'tbank.ru/cards/tinkoff-black',
    linkHref: 'https://www.tbank.ru/cards/debit-cards/tinkoff-black/',
    tags: ['исследования', 'A/B‑тесты'],
    image: publicPath('/images/portfolio/card-02.png'),
    filters: ['all', 'product', 'b2c'],
    caseHref: '/cases/black',
  },
  {
    title: 'Как UX‑решение сократило повторные заявки почти до нуля',
    description:
      'Спроектировала новые сценарии → результат превзошел целевые показатели, снизил ручную обработку заявок, и масштабировался на все продукты',
    link: 'tbank.ru/cards/debit-cards',
    linkHref: 'https://www.tbank.ru/cards/debit-cards/',
    tags: ['исследования', 'A/B‑тесты'],
    image: publicPath('/images/portfolio/card-01.png'),
    filters: ['all', 'product', 'b2c'],
    caseHref: '/cases/duplicates',
  },
  {
    title: 'Веб для рекламных 360-кампаний Т‑Бизнеса',
    description:
      'Как я лидила дизайн веб‑страниц для многомиллионных кампаний и пересобрала hero‑блок, чтобы оффер, УТП и форма заявки работали с первого экрана',
    link: 'tbank.ru/business/registration-ip/form/niches',
    linkHref: 'https://www.tbank.ru/business/registration-ip/form/niches/',
    tags: ['A/B‑тесты', 'B2B'],
    image: publicPath('/images/portfolio/card-23.png'),
    filters: ['all', 'product', 'art', '3d', 'b2b'],
    caseHref: '/cases/marketing-sme',
  },
  {
    title: 'Как оформление карты Junior стало семейным сценарием',
    description:
      'Серия UX‑тестов вокруг одного сценария: ребёнок хочет карту → родитель её оформляет, а банк не теряет потенциального клиента на пол пути',
    link: 'tbank.ru/cards/junior',
    linkHref: 'https://www.tbank.ru/cards/debit-cards/tinkoff-black/junior/',
    tags: ['A/B‑тесты'],
    image: publicPath('/images/portfolio/card-03.png'),
    filters: ['all', 'product', '3d', 'b2c'],
    caseHref: '/cases/junior',
  },
  {
    title: 'Акционные дизайны дебетовки для разных аудиторий',
    description:
      'Я проектировала промо‑сценарии для карты Т‑Банка, где дизайн становился частью оффера: помогал говорить с разной ЦА во время крупных акций',
    link: 'tbank.ru/tinkoff-black/foreign',
    linkHref: 'https://www.tbank.ru/cards/debit-cards/tinkoff-black/foreign/',
    tags: ['3D', 'арт‑дирекшн', 'B2B'],
    image: publicPath('/images/portfolio/card-06.png'),
    filters: ['all', '3d', 'b2c'],
    caseHref: '/cases/promo-debit',
  },
  {
    title: '3D- и AI‑визуалы для Т‑Банка, Долями и Росбанка',
    description: 'Сама создавала 3D, ревьюила визуалы публичного веба, собирала AI‑пайплайны и помогала командам быстрее запускать страницы',
    link: 'Т‑Банк веб',
    linkHref: '#',
    tags: ['арт‑дирекшн', 'b2b'],
    image: publicPath('/images/portfolio/card-04.png'),
    filters: ['all', 'product', 'art', 'ai', '3d', 'b2b'],
    caseHref: '/cases/visuals-ai',
  },
  {
    title: 'Долями. Раздел статей и 3D',
    description: 'Как я спроектировала шаблонную систему контента, которая помогла расти SEO‑трафику, объяснять продукт партнёрам и быстрее публиковать новые материалы',
    link: 'dolyame.ru и мобильное приложение',
    linkHref: 'https://dolyame.ru/',
    tags: ['3D', 'арт‑дирекшн'],
    image: publicPath('/images/portfolio/card-07.png'),
    filters: ['all', 'product', 'b2b', 'b2c'],
    caseHref: '/cases/dolyame-articles',
  },

  {
    title: 'Как я выстроила дизайн‑процессы для большого B2B‑веба',
    description:
      'Кейс о дизайн‑лидерстве, систематизации процессов и работе с качеством в большом потоке продуктовых, маркетинговых и сервисных задач.',
    link: 'Т‑Банк веб',
    linkHref: '#',
    tags: ['B2B', 'лидерство'],
    image: publicPath('/images/portfolio/card-05.png'),
    filters: ['all', 'product', 'art', 'b2b'],
    caseHref: '/cases/design-processes',
  },

  {
    title: 'ИИ графика → Nano Banana, GPT. Магазин керамики ручной работы',
    description: 'E-commerce концепт для бренда керамики, где я создала цельный стиль AI-визуала и интерфейса. Работа заняла сутки',
    link: 'некоммерческий кейс',
    linkHref: '#',
    tags: ['AI', '3D'],
    image: publicPath('/images/portfolio/card-10.png'),
    filters: ['all', 'ai', '3d', 'b2c'],
    caseHref: '/cases/ceramics-ai',
  },
  {
    title: 'AI‑агент для инженерной IT‑конференции T‑Sync Conf',
    description:
      'Как я за неделю спроектировала mobile‑first MVP для инженерной конференции',
    link: 'Т‑Банк веб',
    linkHref: '#',
    tags: ['AI', 'арт‑дирекшн'],
    image: publicPath('/images/portfolio/card-08.png'),
    filters: ['all', 'ai', 'art', 'b2c'],
    caseHref: '/cases/tsync-ai',
  },
  /*
  {
    title: 'Как помочь клиенту разобраться в сложных тарифах РКО',
    description:
      'Спроектировала сервис подбора расчетно‑кассового обслуживания (РКО), который помогает бизнесу подобрать выгодные условия без изучения горы документов',
    link: 'tbank.ru/cards/debit-cards/tinkoff-black',
    linkHref: 'https://www.tbank.ru/cards/debit-cards/tinkoff-black/',
    tags: ['исследования', 'b2b'],
    image: publicPath('/images/portfolio/card-09.png'),
    filters: ['all', 'product', 'b2b'],
  },

  {
    title: 'TipTopPay',
    description:
      'Кейс о дизайн‑лидерстве, систематизации процессов и работе с качеством в большом потоке продуктовых, маркетинговых и сервисных задач.',
    link: 'Т‑Банк веб',
    linkHref: '#',
    tags: ['AI', 'арт‑дирекшн'],
    image: publicPath('/images/portfolio/card-05.png'),
    filters: ['all', 'ai', 'b2b', 'b2c', 'art', 'product'],
  },
  */
];

const PRE_2023_CARDS: PortfolioCardData[] = [
  {
    title: 'AI‑сервис для онлайн логопедии. Стартап с нуля',
    description:
      'Спроектировала сервис подбора расчетно‑кассового обслуживания (РКО), который помогает разобраться в условиях без изучения десятков страниц документов',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['веб‑приложение', '2D', '3D'],
    image: publicPath('/images/portfolio/card-11.png'),
    filters: ['all', '3d', 'b2c'],
    figmaLink: 'https://www.figma.com/design/RI1NhsmUGX0SX9VqqpF3S7/AI-Speech-%7C-work-by--mmetrin?node-id=3901-22985#',
    caseHref: '/cases/ai-speech',
  },
  {
    title: 'Услуги косплей‑специалистов',
    description:
      'Редизайн сайта для cosplay-комьюнити. Я обновила визуальный стиль и структуру интерфейса, чтобы сайт выглядел современнее и лучше передавал энергию ниши',
    link: 'cosplaydreamteam.com',
    linkHref: 'https://www.cosplaydreamteam.com/',
    tags: ['лендинг'],
    image: publicPath('/images/portfolio/card-12.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/SdI7hyBKSkiMEhKY4qHQBw/YourDreamTeam-%7C-work-by--mmetrin?node-id=0-1&t=dH4PhcU8R33vPG8S-1',
    caseHref: '/cases/cosplay',
  },
  {
    title: 'Магазин дизайнерских ламп',
    description:
      'E-commerce концепт для бренда ламп, где я показала работу с визуальной подачей продукта, композицией и аккуратным UI для каталога',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['многостраничник'],
    image: publicPath('/images/portfolio/card-13.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/efEnVPlSAPW8gOWlmgisM7/Designer-Lamps-%7C-work-by--mmetrin?node-id=0-1&p=f&t=QF6OQk6dUiaiKiJq-0',
    caseHref: '/cases/lamps',
  },
  {
    title: 'Аренда авто и мотоциклов по миру',
    description:
      'Редизайн сайта для аренды авто и мотоциклов. Я обновила структуру и визуальный стиль, чтобы пользователь быстрее находил подходящий транспорт и сразу понимал условия выбора',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['веб‑приложение'],
    image: publicPath('/images/portfolio/card-14.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/FKHEGx5QqIxFGkePI847ag/Motorauto.rent-%7C-work-by--mmetrin?node-id=0-1&t=evLeFyF3VbLFUluv-1',
    caseHref: '/cases/autorent',
  },
  // {
  //   title: 'Сервис автоматизации планирования встреч',
  //   description:
  //     'Спроектировала сервис подбора расчетно‑кассового обслуживания (РКО), который помогает разобраться в условиях без изучения десятков страниц документов',
  //   link: 'макеты в figma',
  //   linkHref: '#',
  //   tags: ['веб‑приложение'],
  //   image: publicPath('/images/portfolio/card-15.png'),
  //   filters: ['all', 'product', 'b2b'],
  //   figmaLink: '#',
  // },
  {
    title: 'Дашборд. Аналитика и статистика по таск‑трекеру',
    description:
      'Концепт дашборда для управления командными задачами. Я собрала интерфейс, где можно быстро отслеживать прогресс, нагрузку и ключевые показатели проекта',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['дашборд'],
    image: publicPath('/images/portfolio/card-16.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/8P0fctWE1KRFuI8cE57x2t/Dashboard-%7C-work-by--mmetrin?node-id=0-1&t=DZHKYSNLtcHR3AEy-1',
    caseHref: '/cases/dashboard',
  },
  {
    title: 'Телефонный секретарь Маша',
    description:
      'Спроектировала веб-версию личного кабинета для сервиса телефонного секретаря с расшифровками звонков',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['личный веб‑кабинет'],
    image: publicPath('/images/portfolio/card-17.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/0xhPUy0DmW3bEpLuSwQKuQ/Masha-Secretary-%7C-work-by--mmetrin?node-id=0-1&t=DidDr2d60uaMIUNd-1',
    caseHref: '/cases/masha-secretary',
  },
  {
    title: 'Тур по Исландии',
    description:
      'Концепт лендинга для тревел-проекта об Исландии. Собрала атмосферную промо-страницу с крупными изображениями, холодной палитрой и простым сценарием, чтобы сайт сразу передавал ощущение путешествия',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['лендинг'],
    image: publicPath('/images/portfolio/card-18.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/JBDIaS1nC7IXJukphqQd1V/Iceland-%7C-work-by--mmetrin?node-id=0-1',
    caseHref: '/cases/island',
  },
  {
    title: 'Модельное фэшн‑шоу',
    description:
      'Лендинг для модельного шоу. Я собрала визуальную подачу и структуру страницы так, чтобы сайт сразу передавал атмосферу события и вёл пользователя к ключевой информации',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['лендинг'],
    image: publicPath('/images/portfolio/card-20.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/RYDPpr3FPGI5CinBXL29aO/EDEM-Model-%7C-work-by--mmetrin?node-id=0-1',
    caseHref: '/cases/models-show',
  },

  {
    title: 'История Маяковского и Лили Брик',
    description:
      'Визуальный лонгрид о Лиле Брик и Маяковском. Я собрала страницу как цельную историю — через типографику, композицию и атмосферу русского авангарда',
    link: 'макеты в figma',
    linkHref: '#',
    tags: ['лонгрид'],
    image: publicPath('/images/portfolio/card-19.png'),
    filters: ['all', 'b2c'],
    figmaLink: '#',
    caseHref: '/cases/mayakovsky',
  },
  {
    title: 'Продюсирование роликов актеров',
    description:
      'Проект по созданию демороликов. Я проанализировала текущий сайт, предложила гипотезы для роста конверсии и подготовила интерактивные прототипы с разными визуальными направлениями',
    link: 'reelarc.com',
    linkHref: 'http://reelarc.com/',
    tags: ['лендинг'],
    image: publicPath('/images/portfolio/card-21.png'),
    filters: ['all', 'b2c'],
    figmaLink:
      'https://www.figma.com/design/bYANUZKDeToAOm68ferHoK/Reelarc-%7C-work-by--mmetrin?t=71OpwHRJBqQf2JXg-0',
    caseHref: '/cases/reelarc',
  },
  // {
  //   title: 'Магазин стульев и кресел',
  //   description:
  //     'Спроектировала сервис подбора расчетно‑кассового обслуживания (РКО), который помогает разобраться в условиях без изучения десятков страниц документов',
  //   link: 'макеты в figma',
  //   linkHref: '#',
  //   tags: ['многостраничник'],
  //   image: publicPath('/images/portfolio/card-22.png'),
  //   filters: ['all', 'product', 'b2c'],
  //   figmaLink: '#',
  // },
];

const INITIAL_MAIN_CARD_COUNT = 10;

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 14.3436 18.219" fill="none" aria-hidden>
    <g transform="translate(0, 18.219) rotate(-90)">
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

const FigmaIcon = () => (
  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.5 20C5.43 20 7 18.43 7 16.5V13H3.5C1.57 13 0 14.57 0 16.5C0 18.43 1.57 20 3.5 20Z"
      fill="#0ACF83"
    />
    <path d="M0 10C0 8.07 1.57 6.5 3.5 6.5H7V13.5H3.5C1.57 13.5 0 11.93 0 10Z" fill="#A259FF" />
    <path d="M0 3.5C0 1.57 1.57 0 3.5 0H7V7H3.5C1.57 7 0 5.43 0 3.5Z" fill="#F24E1E" />
    <path d="M7 0H10.5C12.43 0 14 1.57 14 3.5C14 5.43 12.43 7 10.5 7H7V0Z" fill="#FF7262" />
    <path
      d="M14 10C14 11.93 12.43 13.5 10.5 13.5C8.57 13.5 7 11.93 7 10C7 8.07 8.57 6.5 10.5 6.5C12.43 6.5 14 8.07 14 10Z"
      fill="#1ABCFE"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M10 18.25C14.5563 18.25 18.25 14.5563 18.25 10C18.25 5.44365 14.5563 1.75 10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M1.75 10H18.25M10 1.75C12.0625 3.8 13.125 6.5 13.125 10C13.125 13.5 12.0625 16.2 10 18.25C7.9375 16.2 6.875 13.5 6.875 10C6.875 6.5 7.9375 3.8 10 1.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CardTags = ({ tags }: { tags: string[] }) => (
  <div className="portfolio-card__tags">
    {tags.map((tag, i) => (
      <span key={tag}>
        {i > 0 && <span className="portfolio-card__dot">•</span>}
        {tag}
      </span>
    ))}
  </div>
);

const CardLink = ({ card }: { card: PortfolioCardData }) => {
  const hasExternalLink = Boolean(card.linkHref && card.linkHref !== '#');
  const hasFigmaLink = Boolean(card.figmaLink && card.figmaLink !== '#');

  if (hasExternalLink && hasFigmaLink) {
    return (
      <div className="portfolio-card__links">
        <a
          className="portfolio-card__link portfolio-card__link--with-icon"
          href={card.linkHref}
          target="_blank"
          rel="noreferrer"
        >
          <GlobeIcon />
          <span className="portfolio-card__link-label">{card.link}</span>
        </a>
        <a
          className="portfolio-card__link portfolio-card__link--with-icon portfolio-card__link--figma"
          href={card.figmaLink}
          target="_blank"
          rel="noreferrer"
        >
          <FigmaIcon />
          <span className="portfolio-card__link-label">макеты в figma</span>
        </a>
      </div>
    );
  }

  return card.figmaLink ? (
    <a
      className="portfolio-card__link portfolio-card__link--with-icon portfolio-card__link--figma"
      href={card.figmaLink}
      target="_blank"
      rel="noreferrer"
    >
      <FigmaIcon />
      <span className="portfolio-card__link-label">{card.link}</span>
    </a>
  ) : !card.linkHref || card.linkHref === '#' ? (
    <span className="portfolio-card__link portfolio-card__link--static">{card.link}</span>
  ) : (
    <a className="portfolio-card__link" href={card.linkHref} target="_blank" rel="noreferrer">
      {card.link}
    </a>
  );
};

const PortfolioCard = ({
  card,
  revealDelay = 0,
}: {
  card: PortfolioCardData;
  revealDelay?: number;
}) => {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const navigate = useNavigate();

  const isInteractiveTarget = (target: EventTarget | null) =>
    target instanceof HTMLElement && Boolean(target.closest('a, button'));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => setCursor(null), []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!card.caseHref || isInteractiveTarget(e.target)) {
        return;
      }

      navigate(card.caseHref);
    },
    [card.caseHref, navigate],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!card.caseHref || isInteractiveTarget(e.target)) {
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(card.caseHref);
      }
    },
    [card.caseHref, navigate],
  );

  return (
    <article
      className="portfolio-card"
      data-case-href={card.caseHref}
      data-reveal
      style={{ '--reveal-delay': `${revealDelay}ms` } as React.CSSProperties}
      role={card.caseHref ? 'link' : undefined}
      tabIndex={card.caseHref ? 0 : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="portfolio-card__info">
        <div className="portfolio-card__text">
          <h3 className="portfolio-card__title">{card.title}</h3>
          <p className="portfolio-card__desc">{card.description}</p>
        </div>
        <div
          className="portfolio-card__meta-zone"
          onMouseEnter={() => setCursor(null)}
          onMouseMove={(e) => e.stopPropagation()}
        >
          <div className="portfolio-card__meta">
            <div className="portfolio-card__link-wrap">
              <CardLink card={card} />
            </div>
            <CardTags tags={card.tags} />
          </div>
        </div>
      </div>
      <div className="portfolio-card__image">
        <img src={card.image} alt={card.title} loading="lazy" decoding="async" />
      </div>
      {cursor && (
        <div
          className="portfolio-card__cursor-btn"
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden
        >
          читать кейс
        </div>
      )}
    </article>
  );
};

const toRows = <T,>(arr: T[], n: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

const normalizePath = (path: string) => {
  const normalized = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return normalized || '/';
};

const getPortfolioCaseParam = (search: string) => {
  const caseHref = new URLSearchParams(search).get('portfolioCase');
  return caseHref ? normalizePath(caseHref) : null;
};

const scrollToPortfolioSection = () => {
  const target = document.getElementById('portfolio');

  if (!target) {
    return;
  }

  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  target.scrollIntoView({ behavior: 'auto', block: 'start' });
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
};

const scrollToY = (top: number, duration = 360) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;

  document.documentElement.style.scrollBehavior = 'auto';

  if (prefersReducedMotion || duration <= 0) {
    window.scrollTo({ top, behavior: 'auto' });
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    return () => {};
  }

  const startTop = window.scrollY;
  const distance = top - startTop;
  const startedAt = window.performance.now();
  let frameId = 0;

  const tick = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      frameId = window.requestAnimationFrame(tick);
      return;
    }

    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  };

  frameId = window.requestAnimationFrame(tick);

  return () => {
    window.cancelAnimationFrame(frameId);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  };
};

const scrollToPortfolioCard = (caseHref: string) => {
  const target = Array.from(
    document.querySelectorAll<HTMLElement>('.portfolio-card[data-case-href]'),
  ).find((card) => normalizePath(card.dataset.caseHref ?? '') === caseHref);

  if (!target) {
    return () => {};
  }

  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const headerOffset = isMobile ? 88 : 104;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  return scrollToY(Math.max(0, targetTop));
};

const PortfolioGrid = ({ cards }: { cards: PortfolioCardData[] }) => (
  <div className="portfolio-section__rows">
    {toRows(cards, 2).map((row, i) => (
      <div key={i} className="portfolio-section__row">
        {row.map((card, j) => (
          <PortfolioCard key={card.title} card={card} revealDelay={(i * 2 + j) * 35} />
        ))}
      </div>
    ))}
  </div>
);

const PortfolioSlider = ({ cards }: { cards: PortfolioCardData[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const scrollSpeed = 48;

    const tick = (timestamp: number) => {
      const slider = sliderRef.current;
      const lastFrame = lastFrameRef.current ?? timestamp;
      const deltaSeconds = (timestamp - lastFrame) / 1000;
      lastFrameRef.current = timestamp;

      if (slider && !pausedRef.current) {
        slider.scrollLeft += scrollSpeed * deltaSeconds;

        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
          slider.scrollLeft = 0;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="portfolio-section__slider"
      data-reveal
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
    >
      {cards.map((card) => (
        <PortfolioCard key={card.title} card={card} />
      ))}
    </div>
  );
};

const PortfolioMobileList = ({
  visibleCards,
  hiddenCards,
  expanded,
  triggerRef,
  toggle,
  showMoreButton,
  showMoreLabel,
  hideMoreLabel,
}: {
  visibleCards: PortfolioCardData[];
  hiddenCards: PortfolioCardData[];
  expanded: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  toggle: () => void;
  showMoreButton: boolean;
  showMoreLabel: string;
  hideMoreLabel: string;
}) => (
  <div className="portfolio-section__mobile-list">
    <PortfolioGrid cards={visibleCards} />

    {hiddenCards.length > 0 && (
      <div
        className={`portfolio-section__collapse${expanded ? ' portfolio-section__collapse--open' : ''}`}
      >
        <div className="portfolio-section__collapse-inner">
          <div className="portfolio-section__collapse-padded">
            <PortfolioGrid cards={hiddenCards} />
          </div>
        </div>
      </div>
    )}

    {showMoreButton && hiddenCards.length > 0 && (
      <div
        className="portfolio-section__more"
        ref={triggerRef as React.RefObject<HTMLDivElement>}
        data-reveal
      >
        <button
          className={`portfolio-show-btn${expanded ? ' portfolio-show-btn--open' : ''}`}
          onClick={toggle}
        >
          <ArrowDownIcon />
          <span>{expanded ? hideMoreLabel : showMoreLabel}</span>
        </button>
      </div>
    )}
  </div>
);

const DividerCursor = ({ right }: { right?: boolean }) => (
  <svg
    className={`portfolio-section__divider-cursor${right ? ' portfolio-section__divider-cursor--right' : ''}`}
    width="6"
    height="40"
    viewBox="0 0 7 46.6667"
    fill="none"
    aria-hidden
  >
    <circle
      cx="3.5"
      cy="3.5"
      r="3.26023"
      transform="matrix(1 0 0 -1 0 7)"
      fill="#F2C8F8"
      stroke="#F2C8F8"
      strokeWidth="0.48"
    />
    <path d="M3.5 46.6667L3.5 7" stroke="#F2C8F8" strokeWidth="1.17" />
  </svg>
);

const PortfolioDivider = () => (
  <div className="portfolio-section__divider">
    <p className="portfolio-section__divider-text">
      Далее работы{' '}
      <span className="portfolio-section__divider-highlight">
        <DividerCursor />
        до 2023 года
        <DividerCursor right />
      </span>
    </p>
  </div>
);

const PortfolioPre2023Notice = () => (
  <aside className="portfolio-section__pre2023-notice" data-reveal>
    <span className="portfolio-section__pre2023-notice-icon" aria-hidden>
      i
    </span>
    <p>
      Здесь мои ранние работы — пет-проекты, концепты для Behance и небольшие
      коммерческие задачи. У них нет подробных описаний и замеренных метрик, зато есть
      макеты в Figma
    </p>
  </aside>
);

const PortfolioFilters = ({
  activeFilter,
  onSelect,
}: {
  activeFilter: string;
  onSelect: (id: string) => void;
}) => (
  <div className="portfolio-section__filters" role="group" aria-label="Фильтры по категории">
    {FILTERS.map((f) => (
      <button
        key={f.id}
        className={`portfolio-chip${activeFilter === f.id ? ' portfolio-chip--active' : ''}`}
        onClick={() => onSelect(f.id)}
        aria-pressed={activeFilter === f.id}
      >
        {f.label}
      </button>
    ))}
  </div>
);

type PortfolioSectionProps = {
  id?: string;
  title?: string;
  mode?: 'grid' | 'slider';
  showMoreButton?: boolean;
  showPre2023Cards?: boolean;
  showMoreLabel?: string;
  hideMoreLabel?: string;
  mobileInitialCount?: number;
  className?: string;
};

export const PortfolioSection = ({
  id = 'portfolio',
  title = 'Портфолио',
  mode = 'grid',
  showMoreButton = true,
  showPre2023Cards = true,
  showMoreLabel = 'показать все кейсы',
  hideMoreLabel = 'скрыть часть работ',
  mobileInitialCount = 3,
  className = '',
}: PortfolioSectionProps = {}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { expanded, toggle, triggerRef, reset, setExpandedState } = useExpandCollapse();
  const location = useLocation();
  const handledPortfolioCaseRef = useRef<string | null>(null);

  const currentPath = normalizePath(location.pathname);
  const filteredMain = useMemo(
    () =>
      MAIN_CARDS.filter(
        (c) =>
          c.filters.includes(activeFilter) &&
          (!c.caseHref || normalizePath(c.caseHref) !== currentPath),
      ),
    [activeFilter, currentPath],
  );
  const showPre2023 = showPre2023Cards;
  const initialMainCardCount = Math.min(INITIAL_MAIN_CARD_COUNT, MAIN_CARDS.length);

  const pre2023Cards = useMemo(
    () => PRE_2023_CARDS.filter((c) => c.filters.includes(activeFilter)),
    [activeFilter],
  );
  const visibleMain = useMemo(
    () => filteredMain.filter((c) => MAIN_CARDS.indexOf(c) < initialMainCardCount),
    [filteredMain, initialMainCardCount],
  );
  const hiddenMain = useMemo(
    () => filteredMain.filter((c) => MAIN_CARDS.indexOf(c) >= initialMainCardCount),
    [filteredMain, initialMainCardCount],
  );
  const visibleMobileSliderCards = useMemo(
    () => filteredMain.slice(0, mobileInitialCount),
    [filteredMain, mobileInitialCount],
  );
  const hiddenPre = useMemo(
    () => (showPre2023 ? pre2023Cards : []),
    [pre2023Cards, showPre2023],
  );
  const hiddenMobileSliderCards = useMemo(
    () => [...filteredMain.slice(mobileInitialCount), ...hiddenPre],
    [filteredMain, hiddenPre, mobileInitialCount],
  );
  const hasHiddenCards = hiddenMain.length > 0 || hiddenPre.length > 0;
  const isSlider = mode === 'slider';
  const requestedCaseHref = id === 'portfolio' ? getPortfolioCaseParam(location.search) : null;
  const hiddenTargetCards = useMemo(
    () =>
      isSlider
        ? [...hiddenMain, ...hiddenPre, ...hiddenMobileSliderCards]
        : [...hiddenMain, ...hiddenPre],
    [hiddenMain, hiddenMobileSliderCards, hiddenPre, isSlider],
  );
  const isRequestedCaseHidden = useMemo(
    () =>
      Boolean(
        requestedCaseHref &&
          hiddenTargetCards.some(
            (card) => card.caseHref && normalizePath(card.caseHref) === requestedCaseHref,
          ),
      ),
    [hiddenTargetCards, requestedCaseHref],
  );

  useLayoutEffect(() => {
    if (!requestedCaseHref) {
      return;
    }

    scrollToPortfolioSection();

    if (isRequestedCaseHidden && hasHiddenCards) {
      setExpandedState(true);
    }
  }, [requestedCaseHref, hasHiddenCards, isRequestedCaseHidden, setExpandedState]);

  useEffect(() => {
    if (!requestedCaseHref || handledPortfolioCaseRef.current === requestedCaseHref) {
      return;
    }

    const delay = isRequestedCaseHidden && hasHiddenCards ? 120 : 60;

    let cancelScroll: () => void = () => {};
    const timeoutId = window.setTimeout(() => {
      cancelScroll = scrollToPortfolioCard(requestedCaseHref);
      handledPortfolioCaseRef.current = requestedCaseHref;
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelScroll();
    };
  }, [
    requestedCaseHref,
    hasHiddenCards,
    isRequestedCaseHidden,
  ]);

  return (
    <section
      className={`portfolio-section${isSlider ? ' portfolio-section--slider' : ''}${className ? ` ${className}` : ''}`}
      id={id}
    >
      <div className="portfolio-section__inner">
        <div className="portfolio-section__header">
          <div data-reveal>
            <h2 className="portfolio-section__title">{title}</h2>
          </div>
          <div data-reveal style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
            <PortfolioFilters
              activeFilter={activeFilter}
              onSelect={(id) => {
                setActiveFilter((prev) => (prev === id && id !== 'all' ? 'all' : id));
                reset();
              }}
            />
          </div>
        </div>

        {isSlider ? (
          <>
            <PortfolioSlider cards={filteredMain} />
            <PortfolioMobileList
              visibleCards={visibleMobileSliderCards}
              hiddenCards={hiddenMobileSliderCards}
              expanded={expanded}
              triggerRef={triggerRef}
              toggle={toggle}
              showMoreButton={showMoreButton}
              showMoreLabel={showMoreLabel}
              hideMoreLabel={hideMoreLabel}
            />
          </>
        ) : (
          <PortfolioGrid cards={visibleMain} />
        )}

        {!isSlider && hasHiddenCards && (
          <div
            className={`portfolio-section__collapse${expanded ? ' portfolio-section__collapse--open' : ''}`}
          >
            <div className="portfolio-section__collapse-inner">
              <div className="portfolio-section__collapse-padded">
                {hiddenMain.length > 0 && <PortfolioGrid cards={hiddenMain} />}

                {showPre2023 && hiddenPre.length > 0 && (
                  <div className="portfolio-section__pre2023">
                    <div data-reveal>
                      <PortfolioDivider />
                    </div>
                    <PortfolioPre2023Notice />
                    <PortfolioGrid cards={hiddenPre} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!isSlider && showMoreButton && hasHiddenCards && (
          <div
            className="portfolio-section__more"
            ref={triggerRef as React.RefObject<HTMLDivElement>}
            data-reveal
          >
            <button
              className={`portfolio-show-btn${expanded ? ' portfolio-show-btn--open' : ''}`}
              onClick={toggle}
            >
              <ArrowDownIcon />
              <span>{expanded ? hideMoreLabel : showMoreLabel}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
