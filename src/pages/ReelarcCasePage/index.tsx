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
import './ReelarcCasePage.css';

const CASE_SECTIONS = [
  { id: 'description', title: 'Описание' },
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

export const ReelarcCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case masha-secretary-case reelarc-case">
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
            title="Продюсирование роликов актеров"
            projectHref="http://reelarc.com/"
            projectLabel="reelarc.com"
            backgroundSrc={publicPath('/images/cases/reelarc/bg.png')}
            mobileBackgroundSrc={publicPath('/images/cases/reelarc/bg.png')}
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
              Проект для сервиса, который помогает актёрам создавать деморолики для проб.
              Я проанализировала текущий сайт, изучила похожие решения, предложила гипотезы
              для роста конверсии и собрала интерактивные прототипы с разными визуальными
              версиями, чтобы заказчик мог выбрать направление без лишних затрат на реализацию.
            </p>
            <ExternalPill href="https://www.figma.com/design/bYANUZKDeToAOm68ferHoK/Reelarc-%7C-work-by--mmetrin?t=71OpwHRJBqQf2JXg-0">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default ReelarcCasePage;
