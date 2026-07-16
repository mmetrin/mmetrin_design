import { useRef } from 'react';
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
import './CosplayCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/cosplay');

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
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
  '21.jpg',
  '22.jpg',
  '23.jpg',
  '24.jpg',
  '25.jpg',
  '26.jpg',
  '27.jpg',
  '28.jpg',
  '29.jpg',
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

export const CosplayCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case cosplay-case">
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
            title="Услуги косплей‑специалистов"
            projectHref="https://www.behance.net/gallery/178623773/UXUI-redesign-CosplayWebsite"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Редизайн под нишевую аудиторию. Обновила интерфейс так, чтобы он лучше отражал культуру cosplay и ожидания комьюнити',
              },
              {
                text: 'Более выразительный визуальный стиль. Собрала яркую подачу с акцентом на персонажей, события и атмосферу фанатской среды',
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
              Это редизайн сайта для cosplay‑комьюнити — ниши, где важны не только удобство
              интерфейса, но и яркая визуальная подача. Я переосмыслила структуру страниц,
              обновила UI и собрала более современный визуальный стиль, который лучше отражает
              характер аудитории: фанатскую культуру, образы, события и эмоциональность.
            </p>
            <p>
              В проекте я показала работу с редизайном существующего сайта: сохранила понятный
              сценарий, но сделала интерфейс чище, выразительнее и ближе к визуальному миру
              cosplay.
            </p>
            <ExternalPill href="https://www.figma.com/design/SdI7hyBKSkiMEhKY4qHQBw/YourDreamTeam-%7C-work-by--mmetrin?node-id=0-1&t=dH4PhcU8R33vPG8S-1">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) =>
          name === '12.jpg' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/858615882?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1560"
              className="embed-content embed-content--cosplay"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео редизайна сайта для cosplay‑комьюнити"
            />
          ) : name === '26.jpg' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/858617210?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1510"
              className="embed-content embed-content--cosplay-wide"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео интерфейса сайта для cosplay‑комьюнити"
            />
          ) : (
            <CaseDeferredImage
              key={name}
              src={`${CASE_IMAGE_PATH}/${name}`}
              alt={`Визуал редизайна сайта для cosplay‑комьюнити ${index + 1}`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          ),
        )}
      </section>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default CosplayCasePage;
