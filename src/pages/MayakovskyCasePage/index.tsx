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
import './MayakovskyCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/mayakovsky');

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
];

export const MayakovskyCasePage = () => {
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
            title="История Маяковского и Лили Брик"
            projectHref="https://www.behance.net/gallery/170408907/Longread-Lilya-Brik-BelovedofMayakovsky"
            projectLabel="Behance"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Editorial‑подача: собрала лонгрид так, чтобы типографика, изображения и композиция работали как единая история',
              },
              {
                text: 'Сторителлинг в интерфейсе: выстроила визуальный ритм страницы, который ведёт пользователя по материалу и поддерживает атмосферу эпохи',
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
              Концепт визуального лонгрида о Лиле Брик и её связи с Маяковским. В этом проекте
              я работала с editorial‑подачей: собрала страницу так, чтобы текст, изображения,
              типографика и композиция складывались в цельную историю.
            </p>
            <p>
              Главный фокус был на атмосфере и ритме чтения. Я использовала контрастную
              типографику, крупные акценты и визуальные приёмы, отсылающие к русскому авангарду,
              чтобы пользователь не просто читал материал, а погружался в эпоху, характер
              героини и драматичность темы.
            </p>
          </CaseText>
        </div>
      </div>

      <section className="ceramics-ai-case__gallery" aria-label="Визуалы проекта">
        {PROJECT_IMAGE_NAMES.map((name, index) => (
          <CaseDeferredImage
            key={name}
            src={`${CASE_IMAGE_PATH}/${name}`}
            alt={`Визуал лонгрида о Лиле Брик и Маяковском ${index + 1}`}
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

export default MayakovskyCasePage;
