import { ContactSection } from '../ContactSection';
import { PortfolioSection } from '../PortfolioSection';
import './CaseOutroSection.css';

export const CaseOutroSection = () => (
  <section className="case-outro" data-reveal>
    <PortfolioSection
      id="case-more-work"
      title="А еще читайте другие кейсы"
      mode="slider"
      showMoreLabel="показать другие кейсы"
      hideMoreLabel="скрыть другие кейсы"
      className="case-outro__portfolio"
    />
    <ContactSection />
  </section>
);
