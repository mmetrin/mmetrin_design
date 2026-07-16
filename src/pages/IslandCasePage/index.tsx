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
import './IslandCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/island');

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

export const IslandCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case island-case">
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
            title="Тур по Исландии"
            projectHref="https://www.behance.net/gallery/158326685/UIUX-Design-LandingPageICE"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Travel‑подача: собрала лендинг так, чтобы визуальный стиль сразу передавал атмосферу Исландии и ощущение путешествия',
              },
              {
                text: 'Композиция промо‑страницы: выстроила блоки так, чтобы пользователь быстро считывал направление, настроение и ключевую информацию',
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
              Концепт лендинга для travel‑проекта об Исландии. В этом проекте я работала
              с атмосферной промо‑страницей: собрала визуальную подачу, структуру и интерфейс
              так, чтобы сайт быстро погружал пользователя в настроение путешествия.
            </p>
            <p>
              Главный фокус был на ощущении места. Я использовала крупные изображения, холодную
              палитру, контрастную типографику и простую навигацию, чтобы передать масштаб
              ледяных пейзажей и сделать лендинг похожим не на обычную туристическую страницу,
              а на визуальное приглашение к поездке.
            </p>
            <ExternalPill href="https://www.figma.com/design/JBDIaS1nC7IXJukphqQd1V/Iceland-%7C-work-by--mmetrin?node-id=0-1">
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
            alt={`Визуал лендинга тура по Исландии ${index + 1}`}
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

export default IslandCasePage;
