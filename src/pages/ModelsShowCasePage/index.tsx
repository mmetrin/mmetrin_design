import { useRef } from 'react';
import {
  CaseCover,
  CaseDeferredImage,
  CaseHeading,
  CaseSidebar,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './ModelsShowCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/models-show');

const CASE_SECTIONS = [
  { id: 'description', title: 'Описание' },
];

const PROJECT_IMAGE_NAMES = [
  '01.png',
  '02.png',
  '03.png',
  '04.png',
  '05.png',
  '06.png',
  '07.png',
  '08.png',
  '09.png',
  '10.png',
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

export const ModelsShowCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case models-show-case">
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
            title="Модельное фэшн‑шоу"
            projectHref="https://www.behance.net/gallery/158332423/UIUX-Design-models-show-Landing-Page"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Fashion‑подача: собрала лендинг так, чтобы визуальный стиль сразу передавал атмосферу модельного шоу',
              },
              {
                text: 'Структура промо‑страницы: выстроила блоки так, чтобы пользователь быстро считывал событие, настроение и ключевую информацию',
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
              Концепт лендинга для модельного шоу. В этом проекте я работала с fashion‑подачей
              в веб‑интерфейсе: собрала страницу так, чтобы она быстро передавала настроение
              события, знакомила с визуальным стилем шоу и помогала пользователю считать
              основную информацию.
            </p>
            <p>
              Главный фокус был на композиции и ритме. Я использовала крупные визуальные акценты,
              выразительную типографику и контрастные блоки, чтобы лендинг ощущался не как
              обычная информационная страница, а как часть промо‑кампании события.
            </p>
            <ExternalPill href="https://www.figma.com/design/RYDPpr3FPGI5CinBXL29aO/EDEM-Model-%7C-work-by--mmetrin?node-id=0-1">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) => (
          <CaseDeferredImage
            key={name}
            src={`${CASE_IMAGE_PATH}/${name}`}
            alt={`Визуал лендинга модельного фэшн‑шоу ${index + 1}`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        ))}
      </section>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default ModelsShowCasePage;
