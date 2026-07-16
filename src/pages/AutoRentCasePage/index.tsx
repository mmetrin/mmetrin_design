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
import './AutoRentCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/autorent');

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
  '28.jpg',
  '29.jpg',
  '30.jpg',
  '31.jpg',
  '32.jpg',
  '33.jpg',
  '34.jpg',
  '35.jpg',
  '36.jpg',
  '37.jpg',
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

export const AutoRentCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case autorent-case">
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
            title="Аренда авто и мотоциклов по миру"
            projectHref="https://www.behance.net/gallery/180310661/UXUI-Design-Website-Carandmotorbike-rental"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Редизайн сервиса аренды: обновила структуру сайта, чтобы выбор авто или мотоцикла стал быстрее и понятнее',
              },
              {
                text: 'Каталог транспорта: собрала карточки и сценарий сравнения так, чтобы пользователь сразу видел ключевые параметры',
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
              Концепт редизайна сайта для сервиса аренды авто и мотоциклов. В этом проекте
              я работала с e‑commerce‑логикой выбора: продумала главную страницу, каталог
              транспорта, карточки моделей и сценарий, в котором пользователь может быстро
              сравнить варианты и перейти к бронированию.
            </p>
            <p>
              Отдельный фокус был на визуальной подаче. Я сделала интерфейс чище и современнее,
              чтобы сайт выглядел надёжно, но при этом сохранял динамику темы — скорость,
              дорогу, свободу движения и ощущение путешествия.
            </p>
            <ExternalPill href="https://www.figma.com/design/FKHEGx5QqIxFGkePI847ag/Motorauto.rent-%7C-work-by--mmetrin?node-id=0-1&t=evLeFyF3VbLFUluv-1">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) =>
          name === '05.jpg' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/865723996?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1604"
              className="embed-content embed-content--autorent-hero"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео главной страницы сервиса аренды транспорта"
            />
          ) : name === '07.jpg' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/865737106?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=1"
              width="1920"
              height="1295"
              className="embed-content embed-content--autorent-catalog"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео каталога сервиса аренды транспорта"
            />
          ) : name === '09.jpg' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/865723937?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1254"
              className="embed-content embed-content--autorent-card"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео карточки транспорта"
            />
          ) : name === '18.jpg' ? (
            <CaseDeferredIframe
              key={name}
              src="https://player.vimeo.com/video/865725239?;portrait=0&loop=1&muted=1&title=0&byline=0&speed=0&autopause=0&autoplay=1&&sidedock=0&controls=0"
              width="1920"
              height="1177"
              className="embed-content embed-content--autorent-booking"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
              title="Видео сценария бронирования транспорта"
            />
          ) : (
            <CaseDeferredImage
              key={name}
              src={`${CASE_IMAGE_PATH}/${name}`}
              alt={`Визуал редизайна сервиса аренды транспорта ${index + 1}`}
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

export default AutoRentCasePage;
