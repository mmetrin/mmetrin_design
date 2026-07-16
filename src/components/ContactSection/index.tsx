import { useState, useRef } from 'react';
import './ContactSection.css';

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" fill="none" />
    <g clipPath="url(#clip0_0_1)">
      <path d="M11.9971 0C15.2572 0 15.6486 -4.21559e-05 16.9092 0.0869141C18.2131 0.173875 19.0824 0.348014 19.8213 0.652344C20.6037 0.95669 21.2992 1.39179 21.9512 2.04395C22.6465 2.73946 23.0376 3.39139 23.3418 4.17383C23.6461 4.95643 23.8638 5.82606 23.9072 7.08691C23.9942 8.34778 23.9941 8.78262 23.9941 12C23.9941 15.2173 23.9507 15.6522 23.9072 16.9131C23.8203 18.2174 23.6461 19.0871 23.3418 19.8262C23.0376 20.6086 22.603 21.304 21.9512 21.9561C21.2557 22.6517 20.6037 23.0433 19.8213 23.3477C19.0389 23.652 18.1696 23.8696 16.9092 23.9131C15.6486 24 15.2137 24 11.9971 24C8.78048 24 8.34552 23.9566 7.08496 23.9131C5.78108 23.8261 4.91175 23.652 4.17285 23.3477C3.39046 23.0433 2.69496 22.6082 2.04297 21.9561C1.34768 21.2606 0.956575 20.6086 0.652344 19.8262C0.348078 19.0436 0.13039 18.1739 0.0869141 16.9131C-2.1072e-05 15.6522 0 15.2608 0 12C0 8.78262 0.0434463 8.34778 0.0869141 7.08691C0.17385 5.78258 0.348071 4.91295 0.652344 4.17383C0.956577 3.39139 1.39114 2.696 2.04297 2.04395C2.73842 1.34833 3.39048 0.956685 4.17285 0.652344C4.95521 0.34802 5.82455 0.130415 7.08496 0.0869141C8.34552 -4.18924e-05 8.73702 0 11.9971 0ZM11.9971 2.17383C8.82455 2.17383 8.43314 2.17381 7.17285 2.26074C5.99942 2.30421 5.39072 2.47846 4.95605 2.65234C4.39097 2.86973 3.99913 3.13065 3.56445 3.56543C3.13007 3.99997 2.8696 4.39124 2.65234 4.95605C2.52194 5.39083 2.30421 5.99996 2.26074 7.17383C2.17381 8.43469 2.17383 8.8261 2.17383 12C2.17383 15.1739 2.21727 15.5653 2.26074 16.8262C2.30421 17.9998 2.47851 18.6082 2.65234 19.043C2.86965 19.6081 3.12991 19.9999 3.56445 20.4346C3.99913 20.8694 4.39097 21.1303 4.95605 21.3477C5.39071 21.4781 5.99947 21.6958 7.17285 21.7393C8.43314 21.8262 8.82456 21.8262 11.9971 21.8262C15.1701 21.8262 15.5618 21.7827 16.8223 21.7393C17.9958 21.6958 18.6044 21.5215 19.0391 21.3477C19.6041 21.1303 19.996 20.8694 20.4307 20.4346C20.8652 19.9999 21.1255 19.6081 21.3428 19.043C21.4732 18.6082 21.6909 17.9997 21.7344 16.8262C21.8213 15.5653 21.8213 15.1739 21.8213 12C21.8213 8.8261 21.7778 8.43469 21.7344 7.17383C21.6909 5.99995 21.5166 5.39083 21.3428 4.95605C21.1255 4.39124 20.865 3.99996 20.4307 3.56543C19.996 3.13065 19.6041 2.86973 19.0391 2.65234C18.6044 2.5219 17.9958 2.30422 16.8223 2.26074C15.5618 2.1738 15.1701 2.17383 11.9971 2.17383Z" fill="currentColor"/>
      <path d="M11.8223 5.6936C15.2128 5.6936 17.9512 8.43317 17.9512 11.8245C17.9509 15.2155 15.2126 17.9543 11.8223 17.9543C8.43195 17.9543 5.6936 15.2155 5.69336 11.8245C5.69336 8.43319 8.4318 5.69363 11.8223 5.6936ZM11.8223 7.82446C9.60552 7.82458 7.82324 9.60716 7.82324 11.8245C7.8235 14.0415 9.60567 15.8234 11.8223 15.8235C14.039 15.8235 15.821 14.0416 15.8213 11.8245C15.8213 9.60708 14.0391 7.82446 11.8223 7.82446Z" fill="currentColor"/>
      <path d="M18.5155 7.13957C19.3077 7.13957 19.9499 6.4972 19.9499 5.7048C19.9499 4.91239 19.3077 4.27002 18.5155 4.27002C17.7233 4.27002 17.0811 4.91239 17.0811 5.7048C17.0811 6.4972 17.7233 7.13957 18.5155 7.13957Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_0_1">
        <rect width="23.9939" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.37109 8.62939C9.37113 11.1294 9.41164 16.1296 9.41167 19.4112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M9 8.04053C11.5 8.04049 16.5002 7.99998 19.7818 7.99995" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M9 20.0405C10.6033 20.0405 13.2349 20.0238 15.782 20.0119C17.9911 20.0015 19.7818 18.2091 19.7818 16V8.12939" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4 3.04053C6.5 3.04049 11.5002 2.99998 14.7818 2.99995" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4.41113 14.4111C4.4111 11.9111 4.37059 6.91093 4.37055 3.62934" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7754 17.4854C12.5414 15.719 17.3643 8.09295 18.7849 5.06177" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M4.94141 9.29947C6.00027 11.773 8.11605 15.6919 10.9509 17.3088" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    const copyText = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => execCopy());
      } else {
        execCopy();
      }
    };

    const execCopy = () => {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText = 'position:absolute;left:-9999px;top:-9999px;opacity:0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };

    copyText();
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`contact-section__copy-link${copied ? ' contact-section__copy-link--copied' : ''}`}
      onClick={handleClick}
      title="Скопировать"
    >
      <span className="contact-section__copy-text">{text}</span>
      <span className="contact-section__copy-icon">
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </button>
  );
};

export const ContactSection = () => (
  <section className="contact-section" id="contact">
    <div className="contact-section__inner">
      <div className="contact-section__heading-group">
        <h2 className="contact-section__title">Свяжитесь со мной сейчас</h2>
        <p className="contact-section__subtitle">или скопируйте и сохраните мои контакты на попозже :)</p>
      </div>

      <div className="contact-section__actions">
        <a
          href="https://t.me/mmetrin"
          target="_blank"
          rel="noreferrer"
          className="contact-section__cta-btn"
          >
          написать в телеграм
        </a>

        <div className="contact-section__links">
          <CopyButton text="t.me/mmetrin" />
          <div className="contact-section__mail-wrap">
            <CopyButton text="mmetrindesign@gmail.com" />
            <a
              href="https://www.instagram.com/ketrin.mp3/"
              target="_blank"
              rel="noreferrer"
              className="contact-section__icon-link"
              aria-label="Instagram ketrin.mp3"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
