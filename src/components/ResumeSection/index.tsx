import { useEffect, useRef, useState } from 'react';
import { useExpandCollapse } from '../../hooks/useExpandCollapse';
import { useHeroBackgroundParallax } from '../../hooks/useHeroBackgroundParallax';
import { publicPath } from '../../utils/publicPath';
import './ResumeSection.css';

type Job = {
  title: string;
  period?: string;
  intro?: string;
  points: string[];
};

type Experience = {
  company: string;
  period: string;
  color: string;
  jobs: Job[];
};

type Certificate = {
  title: string;
  description: React.ReactNode;
  image: string;
};

const RESUME_IMAGE_PATH = publicPath('/images/resume');

const EXPERIENCES: Experience[] = [
  {
    company: 'Т-Банк',
    period: '2 года и 9 месяцев',
    color: 'tbank',
    jobs: [
      {
        title: 'Руководитель команды дизайна / B2B',
        period: 'Август 2024 — сейчас (2 года)',
        intro: 'Руководство дизайном публичной зоны Т-Бизнеса tbank.ru: более 70 продуктов: РКО, регистрация бизнеса, кредиты, эквайринг, бухгалтерия, ВЭД и другие B2B-продукты.',
        points: [
          'Руководила командой из пяти дизайнеров: отвечала за найм, онбординг, распределение задач, ревью и развитие сотрудников',
          'Подготовила 3х дизайнеров к успешному grade-up',
          'Выстроила roadmap, дизайн-бэклог, OKR, дизайн-ревью и отслеживание lead time → time-to-market (T2M) команды сократился более чем на 50%',
          'Отвечала за качество 300+ страниц: проектирование форм и сборка страниц, контроль конверсии и удержания, ревью UI-текста и 3D-графики. Проводила UX/UI-аудиты 1000+ страниц',
          'Участвовала в организации миграции Росбанка на новую инфраструктуру без критических потерь → метрики конверсии и вовлечённости сохранены в рамках плана',
          'Перерабатывала блоки и сопровождала A/B-тесты — у одного блока эффект конверсии превысил MDE, используется в рекламных кампаниях на 1000000+ аудиторию',
          'Кросскомандная- и работа с подрядчиками → оперативное решение конфликтных ситуаций',
        ],
      },
      {
        title: 'Продуктовый дизайнер / B2C',
        period: 'Ноябрь 2023 — Август 2024 (10 месяцев)',
        intro: 'Работала с картами Black, Junior, пенсионными и тактильными картами, вкладами, накопительными счетами, инвестициями «Долями» на tbank.ru',
        points: [
          'Переработала форму оформления Black: A/B-тест показал статзначимый рост конверсии в короткую и полную заявку, утилизацию и aha-момент (приросты метрик в районе 3-5%)',
          'Переработала сценарии повторных заявок: ручная обработка была почти устранена, т.е. срез cost-ов удался в несколько раз лучше, чем MDE',
          'Инициировала и спроектировала большие обновления Junior: сценарии ребенка и родителя, передачу оформления карты и кросс-сейл',
          'Формулировала UX-гипотезы, участвовала в 20+ успешных A/B-тестах и сопровождала решения от исследования проблемы до анализа результата',
          'Развивала TFusion — внутренний AI-инструмент генерации изображений, работала с LLM, экспериментировала с LoRa-ми и собирала датасеты, который мог позволить сократить T2M на 60%',
          'Спроектировала селект дизайна карты и кросс-сейл; успешные решения масштабировали на Junior и Platinum',
        ],
      },
    ],
  },
  {
    company: 'Фриланс',
    period: 'Январь 2023 — Август 2023 (8 месяцев)',
    color: 'freelance',
    jobs: [{ title: 'UI/UX дизайнер', points: [
      'Адаптивный UX/UI-дизайн продуктов – мобильные приложения и сайты: поэтапная презентация и защита результатов перед клиентами и командой разработки',
      'Разработка и поддержка дизайн-систем и UI-kit в Figma',
      'UX-исследования с использованием фреймворков – построение CJM, User Flow, Mind Map, Personas → выявление болей аудитории и требований бизнеса',
      'Полный цикл дизайна продукта – от концепции landing page до масштабного веб-сервиса – соблюдение гайдлайнов и стандартов юзабилити',
      'Пост-запусковая поддержка проектов – взаимодействие с frontend-разработчиками для корректной реализации дизайна и достижения оптимальных результатов',
    ] }],
  },
  {
    company: 'AI Стартап по онлайн-логопедии',
    period: 'Октябрь 2021 — Декабрь 2022 (1 год и 3 месяца)',
    color: 'startup',
    jobs: [{ title: 'UI/UX дизайнер и иллюстратор', points: [
      'Запуск стартапа с 0 – участие в разработке концепции и выпуск версий веб- и мобильного приложения, построение дизайн-системы',
      'Проектирование интерфейсов и UX-флоу – создание интерактивных прототипов, вайрфреймов и первичное тестирование',
      'Пользовательские исследования целевой аудитории – проведение интервью с 100+ детьми и фокус-групп (в т.ч. при поддержке «Медси» и дет садов)',
      'Формирование и проверка продуктовых гипотез – запуск опросов, анализ данных и визуализация результатов (графики, диаграммы) для презентации',
      'Разработала персонажей, покадровые анимации артикуляции, графику для упражнений и AR-маски',
      'Работала с backend-, frontend-, CV- и QA-командами',
    ] }],
  },
  {
    company: 'ITMS — IT-Консалтинг Технопарк Академгородка',
    period: 'Декабрь 2019 — Октябрь 2021 (1 год и 11 месяцев)',
    color: 'itms',
    jobs: [{ title: 'Веб-дизайнер, веб-разработчик', points: [
      'Проектирование и дизайн макетов веб-страниц и UI-моделей интерфейсов для последующей вёрстки',
      'Локализация и участие в разработке краудсорсинговой платформы pro-bono marketplace',
      'Локализация и участие в разработке краудсорсинговой платформы pro-bono marketplace',
      'Верстала адаптивные сайты на HTML, CSS, Bootstrap и JavaScript',
      'Поддерживала веб-сервисы и участвовала в подготовке датасетов для нейросетевых моделей',
    ] }],
  },
];

const CERTIFICATES: Certificate[] = [
  { title: 'Дизайнер трехмерной графики (3D-дизайнер)', description: <a href="https://bangbangeducation.ru/" target="_blank" rel="noreferrer">Bang Bang Education</a>, image: `${RESUME_IMAGE_PATH}/certificate-1.png` },
  { title: 'Веб-дизайн и фриланс', description: <><a href="https://alexeybychkov.club/" target="_blank" rel="noreferrer">Стала лучшей в 9 группе</a> (конкурс 2 человека из 100 участников)<br /><a className="resume-section__certificate-link--muted" href="https://alexeybychkov.com/" target="_blank" rel="noreferrer">от Алексея Бычкова</a></>, image: `${RESUME_IMAGE_PATH}/certificate-2.png` },
  { title: 'Графический дизайн и сайты на Tilda', description: 'от Кристины Дмитриевой', image: `${RESUME_IMAGE_PATH}/certificate-3.png` },
  { title: 'UI/UX Research & Design Wave 2', description: 'Binar Academy 2022 год', image: `${RESUME_IMAGE_PATH}/certificate-4.png` },
  { title: 'Изобразительное искусство с отличием', description: 'На фото дипломы по художке, хореографии, аттестат и диплом', image: `${RESUME_IMAGE_PATH}/certificate-5.png` },
  { title: 'Программирование и ИС с отличием', description: 'ГБПОУ НСО «Новосибирский технический колледж имени Б.С. Галущака»', image: `${RESUME_IMAGE_PATH}/certificate-6.png` },
  { title: 'HTML и CSS', description: 'Stepik 2021 год', image: `${RESUME_IMAGE_PATH}/certificate-8.png` },
  { title: 'Конкурс “Веб-дизайн”', description: 'IT Планета 2021 год', image: `${RESUME_IMAGE_PATH}/certificate-7.png` },
];

const BulletList = ({ points }: { points: string[] }) => (
  <ul className="resume-section__points">
    {points.map((point) => <li key={point}>{point}</li>)}
  </ul>
);

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 14.3436 18.219" fill="none" aria-hidden>
    <g transform="translate(0, 18.219) rotate(-90)">
      <path d="M1.469 6.92565C4.98677 7.26034 8.969 6.92628 16.969 6.92561" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M1.25 7.08382C3.01639 8.84979 5.6424 11.6727 8.67359 13.0933" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7.43589 1.25032C4.9624 2.30918 3.04349 4.42497 1.42652 7.25981" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

export const ResumeSection = () => {
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const { expanded, toggle, triggerRef } = useExpandCollapse();
  const backgroundRef = useRef<HTMLImageElement>(null);

  useHeroBackgroundParallax(backgroundRef, {
    maxOffset: 16,
    scale: 1.04,
    containerSelector: '.resume-section',
  });

  const openCertificate = (certificate: Certificate) => {
    setIsModalClosing(false);
    setActiveCertificate(certificate);
  };

  const closeCertificate = () => setIsModalClosing(true);

  useEffect(() => {
    if (!activeCertificate) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCertificate();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeCertificate]);

  useEffect(() => {
    if (!activeCertificate) return undefined;
    document.body.classList.add('resume-modal-open');
    return () => document.body.classList.remove('resume-modal-open');
  }, [activeCertificate]);

  useEffect(() => {
    if (!isModalClosing) return undefined;
    const timeoutId = window.setTimeout(() => {
      setActiveCertificate(null);
      setIsModalClosing(false);
    }, 220);
    return () => window.clearTimeout(timeoutId);
  }, [isModalClosing]);

  return (
    <section className="resume-section" id="resume">
      <div className="resume-section__background" aria-hidden="true">
        <img ref={backgroundRef} src={`${RESUME_IMAGE_PATH}/item.png`} alt="" />
      </div>
      <div className="resume-section__content">
        <h2 className="resume-section__title" data-reveal>Опыт и&nbsp;образование</h2>
        <div className={`resume-section__collapse${expanded ? ' resume-section__collapse--open' : ''}`}>
          <div className="resume-section__grid" data-reveal style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
            <div className="resume-section__experience">
            {EXPERIENCES.map((experience, experienceIndex) => (
              <article className="resume-section__experience-item" key={experience.company}>
                <div className="resume-section__timeline" aria-hidden="true">
                  {experience.color === 'tbank'
                    ? <img src={`${RESUME_IMAGE_PATH}/tbank.png`} alt="" />
                    : <span className={`resume-section__timeline-dot resume-section__timeline-dot--${experience.color}`} />}
                  {experienceIndex < EXPERIENCES.length - 1 && <span className="resume-section__timeline-line" />}
                </div>
                <div className="resume-section__experience-content">
                  <header className="resume-section__company">
                    <h3>{experience.company}</h3>
                    <p>{experience.period}</p>
                  </header>
                  <div className={`resume-section__jobs ${experienceIndex === 0 ? 'resume-section__jobs--bank' : ''}`}>
                    {experience.jobs.map((job) => (
                      <section className="resume-section__job" key={job.title}>
                        <h4>{job.title}</h4>
                        {job.period && <p className="resume-section__job-period">{job.period}</p>}
                        {job.intro && <p className="resume-section__intro">{job.intro}</p>}
                        <BulletList points={job.points} />
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            </div>
            <aside className="resume-section__certificates">
              <h3>Сертификаты</h3>
              <div className="resume-section__certificate-list">
                {CERTIFICATES.map((certificate) => (
                  <article className="resume-section__certificate" key={certificate.title}>
                    <div>
                      <h4>{certificate.title}</h4>
                      <p>{certificate.description}</p>
                    </div>
                    <button type="button" className="resume-section__certificate-preview" onClick={() => openCertificate(certificate)} aria-label={`Открыть сертификат «${certificate.title}»`}>
                      <img src={certificate.image} alt="" />
                      <span><img src={`${RESUME_IMAGE_PATH}/expand.svg`} alt="" /></span>
                    </button>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
        <div className="resume-section__more" ref={triggerRef as React.RefObject<HTMLDivElement>}>
          <button type="button" className={`portfolio-show-btn${expanded ? ' portfolio-show-btn--open' : ''}`} onClick={toggle} aria-expanded={expanded}>
            <ArrowDownIcon />
            <span>{expanded ? 'скрыть' : 'показать полностью'}</span>
          </button>
        </div>
      </div>
      {activeCertificate && (
        <div className={`resume-section__modal${isModalClosing ? ' resume-section__modal--closing' : ''}`} role="dialog" aria-modal="true" aria-label={activeCertificate.title} onMouseDown={closeCertificate}>
          <div className="resume-section__modal-content" onMouseDown={(event) => event.stopPropagation()}>
            <img src={activeCertificate.image} alt={activeCertificate.title} />
            <button type="button" onClick={closeCertificate} aria-label="Закрыть просмотр">
              <img src={publicPath('/images/cases/duplicate-applications/mobile-sidebar-cross.svg')} alt="" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
