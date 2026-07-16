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
import './LampsCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/lamps');

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
  '11.png',
  '12.png',
  '13.png',
  '14.png',
  '15.png',
  '16.png',
  '17.png',
  '18.png',
  '19.png',
  '20.png',
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

export const LampsCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case lamps-case">
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
            title="Магазин дизайнерских ламп"
            projectHref="https://www.behance.net/gallery/160900875/Mommolights-Website-EcommerceLamps"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[]}
          />
        </div>
      </div>

      <div className="case-study-layout">
        <CaseSidebar items={CASE_SECTIONS} />
        <div className="case-study-content">
          <CaseHeading id="description">Описание</CaseHeading>
          <CaseText>
            <p>
              Концепт e‑commerce сайта для бренда дизайнерских ламп. Я собрала визуальную подачу
              и интерфейс так, чтобы светильники воспринимались не просто как товары,
              а как выразительные интерьерные объекты.
            </p>
            <p>
              В проекте показана работа с композицией, каталогом, карточками товаров
              и атмосферной брендовой витриной.
            </p>
            <ExternalPill href="https://www.figma.com/design/efEnVPlSAPW8gOWlmgisM7/Designer-Lamps-%7C-work-by--mmetrin?node-id=0-1&p=f&t=QF6OQk6dUiaiKiJq-0">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) =>
          name === '09.png' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/787721734?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1080"
              className="embed-content embed-content--wide"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео e‑commerce сайта магазина дизайнерских ламп"
            />
          ) : name === '12.png' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/787723743?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1080"
              className="embed-content embed-content--wide"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео карточки товара магазина дизайнерских ламп"
            />
          ) : name === '15.png' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/787752357?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1080"
              className="embed-content embed-content--wide"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео страницы магазина дизайнерских ламп"
            />
          ) : name === '18.png' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/787752004?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1080"
              className="embed-content embed-content--wide"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео каталога магазина дизайнерских ламп"
            />
          ) : (
            <CaseDeferredImage
              key={name}
              src={`${CASE_IMAGE_PATH}/${name}`}
              alt={`Визуал проекта магазина дизайнерских ламп ${index + 1}`}
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

export default LampsCasePage;
