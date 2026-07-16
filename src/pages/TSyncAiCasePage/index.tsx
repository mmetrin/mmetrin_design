import { useEffect, useRef } from 'react';
import {
  CaseBanner,
  CaseCover,
  CaseHeading,
  CaseImage,
  CaseSidebar,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './TSyncAiCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/tsync-ai');

const CASE_SECTIONS = [
  { id: 'context', title: 'Контекст и задача' },
  { id: 'solutions', title: 'Решения' },
  { id: 'result', title: 'Результат' },
  { id: 'reflection', title: 'Рефлексия' },
];

const PROJECT_IMAGES = [
  { name: '01-context', alt: 'Сайт AI4SDLC' },
  { name: '02-context', alt: 'Материалы AI4SDLC' },
  { name: '03-conference', alt: 'Сайт T‑Sync Conf' },
  { name: '04-task', alt: 'MVP мобильного AI‑агента' },
  { name: '05-solution', alt: 'Погружение в сценарии AI‑агента' },
  { name: '06-user-stories', alt: 'Юзер-стори и чек‑лист экранов' },
  { name: '07-mobile-first', alt: 'MVP‑сценарии и корнер‑кейсы' },
  { name: '08-input-behavior', alt: 'Mobile‑first интерфейс AI‑агента' },
  { name: '09-loaders', alt: 'Анимации лоадеров' },
  { name: '10-specs', alt: 'Спецификация AI‑агента' },
];

type TSyncAiImageProps = {
  name: string;
  alt: string;
};

const TSyncAiImage = ({ name, alt }: TSyncAiImageProps) => (
  <CaseImage src={`${CASE_IMAGE_PATH}/${name}.png`} alt={alt} />
);

type ExternalPillProps = {
  href: string;
  children: React.ReactNode;
};

const ExternalPill = ({ href, children }: ExternalPillProps) => (
  <a className="case-cover__pill" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export const TSyncAiCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useEffect(() => {
    const el = bgImgRef.current;
    if (!el || window.matchMedia('(max-width: 480px)').matches) return;

    let rafId = 0;
    let targetX = 0;
    let currentX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const section = el.closest('.duplicate-applications-case__hero') as HTMLElement;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      targetX = dx * 24;
    };

    const onMouseLeave = () => {
      targetX = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      el.style.transform = `scale(1.05) translateX(${currentX.toFixed(2)}px)`;
      rafId = window.requestAnimationFrame(tick);
    };

    const section = el.closest('.duplicate-applications-case__hero') as HTMLElement;
    if (!section) return;

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      window.cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
  }, []);

  return (
    <article className="duplicate-applications-case visuals-ai-case tsync-ai-case">
      <div className="duplicate-applications-case__hero">
        <div className="duplicate-applications-case__hero-bg" aria-hidden>
          <img
            className="duplicate-applications-case__hero-bg-image"
            src={publicPath('/images/hero/bg-texture.jpg')}
            alt=""
            ref={bgImgRef}
          />
          <div className="duplicate-applications-case__hero-fade" />
        </div>

        <div className="duplicate-applications-case__cover">
          <CaseCover
            title="AI‑агент для T‑Sync Conf"
            backgroundSrc={`${CASE_IMAGE_PATH}/00-cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/00-cover.png`}
            stats={[
              {
                text: 'Отсекла лишние AI‑фичи и оставила полезный MVP. Фокус — быстрые ответы, навигация и запись на активности',
              },
              {
                text: 'Лидила AI‑направление в команде.\nСайт AI4SDLC делали мои дизайнеры',
              },
            ]}
          />
        </div>
      </div>

      <div className="case-study-layout">
        <CaseSidebar items={CASE_SECTIONS} />
        <div className="case-study-content">
          <CaseHeading id="context">Контекст и задача</CaseHeading>
          <CaseText>
            <p>Т‑Банк — крупный онлайн‑банк. Т‑Технологии — материнская компания Т‑Банка.</p>
            <p>
              В роли дизайн‑лида я вела команду, где мы делали разные проекты, в том числе
              для Т‑Технологий. Один из таких проектов — сайт AI4SDLC: его делали дизайнеры моей
              команды под ревью. Подробнее о направлении и проекте можно посмотреть в видео
            </p>
            <div className="visuals-ai-case__pill-row">
              <ExternalPill href="https://ai4sdlc.tbank.ru">Сайт AI4SDLC</ExternalPill>
              <ExternalPill href="https://www.youtube.com/watch?v=kVfp-TsKeNM">
                О проекте 2
              </ExternalPill>
              <ExternalPill href="https://www.youtube.com/watch?v=G72qugp5dSY">
                О проекте 1
              </ExternalPill>
            </div>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[0]} />
          <TSyncAiImage {...PROJECT_IMAGES[1]} />
          <CaseText>
            <p>
              Следующим событием стала T‑Sync Conf — инженерная конференция Т‑Технологий.
              О ней также писали в новостях Т‑Банка.
            </p>
            <div className="visuals-ai-case__pill-row">
              <ExternalPill href="https://web.archive.org/web/20260203162713/https://t-syncconf.ru/">
                Сайт T‑Sync Conf
              </ExternalPill>
              <ExternalPill href="https://www.tbank.ru/about/news/23012026-t-technology-will-hold-first-large-scale-conference-for-engineers-t-sync-conf/?utm_source=chatgpt.com">
                О конференции
              </ExternalPill>
            </div>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[2]} />
          <CaseText>
            <p>
              К мероприятию нужно было быстро собрать базу мобильного AI‑агента, который будет
              помогать участникам ориентироваться на площадке.
            </p>
            <p>
              Я подключилась к задаче: разобралась в сценариях, определила экраны для корнеров
              и функционала, адаптировала UI под конференцию и подготовила подробную спеку.
            </p>
          </CaseText>
          <CaseBanner>
            NDA: часть деталей и метрик намеренно обобщена или изменена, в том числе
            на примере выше. Все выводы и результаты отражают реальную проектную работу
            и её влияние.
          </CaseBanner>

          <CaseHeading id="solutions">Решения</CaseHeading>
          <CaseText>
            <p>
              Я подключилась hands‑on и начала с погружения в предметную область: изучила сайт
              конференции, формат мероприятия, возможные точки входа в агента и ситуации,
              в которых человек будет им пользоваться.
            </p>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[3]} />
          <CaseText>
            <p>
              После этого собрала примерные юзер-сторис: вопросы про программу, навигацию,
              активности, запись, рекомендации, проблемы с авторизацией и другое.
            </p>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[4]} />
          <CaseText>
            <p>
              На основе этого я определила MVP‑сценарии и корнер‑кейсы. Мне было важно заранее
              продумать не только happy path, но и более живые ситуации: пользователь
              не авторизован, запись закрыта, мест нет, сервис недоступен, вопрос странный.
            </p>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[5]} />
          <CaseText>
            <p>
              Затем я адаптировала интерфейс под mobile‑first сценарий и стиль T‑Sync Conf.
              Мы переиспользовали готовые компоненты, но я кастомизировала их так, чтобы агент
              ощущался частью конференции, а не отдельной технической вставкой.
            </p>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[6]} />
          <CaseText>
            <p>
              Отдельно продумала поведение других элементов интерфейса.
            </p>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[7]} />
          <CaseText>
            <p>Ещё я сама собрала анимации для лоадеров, а затем добавила их в спецификации.</p>
            <div className="visuals-ai-case__pill-row">
              <ExternalPill href="https://codepen.io/mmetrin/pen/WbxdmXp">
                Анимация загрузки чата
              </ExternalPill>
              <ExternalPill href="https://codepen.io/mmetrin/pen/LEZeaJK">
                Анимация загрузки ответа
              </ExternalPill>
            </div>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[8]} />
          <CaseText>
            <p>
              Большая часть работы ушла в спецификацию. Я подробно описала компоненты, состояния,
              ошибки, поведение чата и запись на активности, чтобы разработка могла быстро забрать
              решение в работу без постоянных уточнений.
            </p>
          </CaseText>
          <TSyncAiImage {...PROJECT_IMAGES[9]} />

          <CaseHeading id="result">Результат</CaseHeading>
          <CaseText>
            <p>
              Мы собрали MVP AI‑агента в очень короткий срок. Он закрывал базовые задачи участника
              конференции и покрывал поставленные цели.
            </p>
            <p>
              Для бизнеса это усиливало опыт конференции и показывало AI‑экспертизу
              Т‑Технологий не только в программе события, но и в самом пользовательском сценарии.
            </p>
            <p>
              Для разработки результат был тоже практичным: команда получила не набор экранов,
              а понятную систему сценариев, состояний и поведения.
            </p>
          </CaseText>

          <CaseHeading id="reflection">Что было важным</CaseHeading>
          <CaseText>
            <p>
              Для меня это был особенно интересный проект, потому что он был очень срочным
              и живым. Я подключилась не как внешний наблюдатель и не через длинную цепочку
              постановки, а прямо hands‑on: работала в коротком контуре с разработчиками,
              которые вели конференцию, быстро принимала решения и сразу доводила их до спеки.
            </p>
            <p>
              Мне понравилось, что здесь дизайн был не про «нарисовать чат», а про быструю
              продуктовую сборку: вникнуть в новую предметную область, отсечь лишнее, описать
              корнеры, собрать понятный UX и помочь команде успеть к реальному событию.
            </p>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default TSyncAiCasePage;
