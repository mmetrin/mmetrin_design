import { useRef } from 'react';
import {
  CaseCover,
  CaseHeading,
  CaseSidebar,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './CeramicsAiCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/ceramics-ai');

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
];

export const CeramicsAiCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case ceramics-ai-case">
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
            title="AI‑арт‑дирекшн для e‑commerce проекта"
            projectHref="https://www.behance.net/gallery/251255311/AI-Art-Handmade-Ceramics-Ecommerce-Website-Design"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/00-cover-bg.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/00-cover-bg.png`}
            stats={[
              {
                text: 'AI‑визуалы в едином стиле. Генерила изображения так, чтобы они работали как часть одной бренд‑системы',
              },
              {
                text: 'Интерфейс для handmade‑товаров. Собрала витрину, где акцент на наличии, характере предметов и быстром выборе',
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
              В этом проекте я собрала концепт интернет‑магазина для бренда handmade‑керамики:
              от визуального направления и генерации изображений до UI‑структуры, карточек
              товаров и сценария выбора предметов.
            </p>
            <p>
              Главный фокус был не только в интерфейсе, а в цельной арт‑дирекции. Я использовала
              нейросети как часть дизайн‑процесса: сгенерировала визуалы в едином стиле,
              настроила атмосферу бренда и собрала вокруг неё сайт, где продукт, графика
              и интерфейс работают как одна система.
            </p>
            <p>
              Проект показывает, как я могу быстро создавать выразительные digital‑концепты
              с нуля: придумывать визуальный язык, управлять AI‑изображениями, сохранять
              консистентность и превращать это в аккуратный e‑commerce опыт.
            </p>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) => (
          <img
            key={name}
            src={`${CASE_IMAGE_PATH}/${name}`}
            alt={`Визуал проекта handmade‑керамики ${index + 1}`}
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

export default CeramicsAiCasePage;
