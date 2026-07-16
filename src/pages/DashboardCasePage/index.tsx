import { Fragment, useRef } from 'react';
import {
  CaseCover,
  CaseDeferredIframe,
  CaseDeferredImage,
  CaseHeading,
  CaseSidebar,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './DashboardCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/dashboard');

const CASE_SECTIONS = [
  { id: 'description', title: 'Описание' },
];

const PROJECT_IMAGE_NAMES = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '04.jpg',
  '05.jpg',
  '06.jpg',
];

type ExternalPillProps = {
  href: string;
  children: string;
};

const ExternalPill = ({ href, children }: ExternalPillProps) => (
  <a className="case-cover__pill" href={href} target="_blank" rel="noreferrer">
    <span>{children}</span>
  </a>
);

export const DashboardCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case dashboard-case">
      <div className="duplicate-applications-case__hero">
        <div className="duplicate-applications-case__hero-bg" aria-hidden>
          <img
            className="duplicate-applications-case__hero-bg-image"
            src={publicPath('/images/hero/bg-texture.jpg')}
            alt=""
            ref={bgImgRef}
            decoding="async"
            fetchPriority="low"
          />
          <div className="duplicate-applications-case__hero-fade" />
        </div>

        <div className="duplicate-applications-case__cover">
          <CaseCover
            title="Дашборд. Аналитика и статистика по таск‑трекеру"
            projectHref="https://www.behance.net/gallery/158314841/UIUX-Dashboard-Projectmanagement"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Информационный дизайн: собрала дашборд так, чтобы задачи, графики и показатели быстро считывались',
              },
              {
                text: 'Масштабируемый UI: продумала компоненты, подсказки и light/dark mode для удобной работы с данными',
              },
            ]}
          />
        </div>
      </div>

      <div className="case-study-layout">
        <CaseSidebar items={CASE_SECTIONS} />
        <div className="case-study-content">
          <CaseHeading id="description">Описание</CaseHeading>
          <CaseText>
            <p>
              TaskTrack — концепт dashboard‑сервиса для управления проектами и командной
              работой. В этом проекте я работала с информационной архитектурой, аналитическими
              виджетами и визуализацией данных: собрала интерфейс, где пользователь может
              быстро оценить состояние задач, прогресс команды и важные показатели проекта.
            </p>
            <p>
              Отдельный фокус был на удобстве работы с большим количеством данных. Я продумала
              структуру дашборда, графики, подсказки, light/dark mode и компонентный подход,
              чтобы интерфейс оставался понятным, масштабируемым и аккуратным визуально.
            </p>
            <ExternalPill href="https://www.figma.com/design/8P0fctWE1KRFuI8cE57x2t/Dashboard-%7C-work-by--mmetrin?node-id=0-1&t=DZHKYSNLtcHR3AEy-1">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) => (
          <Fragment key={name}>
            <CaseDeferredImage
              src={`${CASE_IMAGE_PATH}/${name}`}
              alt={`Визуал dashboard‑сервиса TaskTrack ${index + 1}`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            {name === '02.jpg' && (
              <CaseDeferredIframe
                src="https://player.vimeo.com/video/853505301?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
                width="1920"
                height="1181"
                className="embed-content"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; picture-in-picture"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Видео dashboard‑сервиса TaskTrack"
              />
            )}
            {name === '05.jpg' && (
              <CaseDeferredIframe
                src="https://player.vimeo.com/video/853512798?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
                width="1920"
                height="1031"
                className="embed-content embed-content--dashboard-short"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; picture-in-picture"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Видео light/dark mode dashboard‑сервиса TaskTrack"
              />
            )}
          </Fragment>
        ))}
      </section>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default DashboardCasePage;
