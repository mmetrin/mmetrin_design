import { useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import '../../components/ContactSection/ContactSection.css';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  useReveal();

  return (
    <div className="not-found-page" data-reveal>
      <section className="contact-section" id="contact">
        <div className="contact-section__inner">
          <div className="contact-section__heading-group">
            <h1 className="contact-section__title">Блин, такой страницы нет</h1>
            <p className="contact-section__subtitle">Но вы всё еще можете предложить мне работу :))</p>
          </div>

          <div className="contact-section__actions">
            <a
              href={publicPath('#portfolio')}
              className="contact-section__cta-btn"
            >
              вернуться к портфолио
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
