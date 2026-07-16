import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CaseBanner,
  CaseCover,
  CaseDeferredIframe,
  CaseHeading,
  CaseImage,
  CaseSidebar,
  CaseSubheading,
  CaseText,
  CaseTextList,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './PromoDebitCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/designs-black');

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'problem', title: 'Проблема' },
  { id: 'scenario-1', title: 'Нерезиденты' },
  { id: 'scenario-2', title: 'Природа России' },
  { id: 'result', title: 'Результат' },
  { id: 'related', title: 'Связанные кейсы' },
  { id: 'reflection', title: 'Рефлексия' },
];

type PromoImageProps = {
  name: string;
  alt: string;
  mobile?: boolean;
};

const PromoImage = ({ name, alt, mobile = false }: PromoImageProps) => (
  <CaseImage
    src={`${CASE_IMAGE_PATH}/${name}.png`}
    mobileSrc={mobile ? `${CASE_IMAGE_PATH}/${name}-mobile.png` : undefined}
    alt={alt}
  />
);

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 14.3436 18.219" fill="none" aria-hidden>
    <g transform="translate(0, 18.219) rotate(-90)">
      <path
        d="M1.469 6.92565C4.98677 7.26034 8.969 6.92628 16.969 6.92561"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M1.25 7.08382C3.01639 8.84979 5.6424 11.6727 8.67359 13.0933"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M7.43589 1.25032C4.9624 2.30918 3.04349 4.42497 1.42652 7.25981"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const PromoDebitCasePage = () => {
  const [showAll3D, setShowAll3D] = useState(false);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case promo-debit-case">
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
            title="Акционные дизайны дебетовки для разных аудиторий"
            projectHref="https://www.tbank.ru/cards/debit-cards/tinkoff-black/foreign/"
            projectLabel="tbank.ru/tinkoff-black/foreign"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.png`}
            stats={[
              {
                text: 'Создавала 3D‑визуалы для акций Black: природные и культурные коллекции',
              },
              {
                text: 'Собирала сцены в Blender с нуля: здесь про мои успехи в графическом дизайне',
              },
            ]}
          />
        </div>
      </div>

      <div className="case-study-layout">
        <CaseSidebar items={CASE_SECTIONS} />
        <div className="case-study-content">
          <CaseText id="intro">
            <p>
              В начале 2024 года работала над одной из первых 3D‑шек → и она попала на главную tbank.ru.
            </p>
            <p>
              С этой иллюстрацией банк рассказывала о наградах и презентовала обновлённую айдентику после перехода
              от Тинькофф к Т‑Банку. Моему удивлению не было предела: я только начинала работать с 3D,              а мой вклад оказался на самом видном месте продукта.
            </p>
          </CaseText>

          <CaseText>
            <a
              className="case-cover__pill"
              href="https://web.archive.org/web/20240626035721/https://www.tbank.ru/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Моя 3D на tbank.ru (раздел «Банк года»)</span>
            </a>
          </CaseText>

          <PromoImage
            name="card-01"
            alt="3D‑иллюстрация для продуктовой страницы T‑Bank"
          />

          <CaseText>
            <p>
              С этого началась моя большая история в 3D, ведь я сама собирала веб‑страницы для Т.
            </p>
          </CaseText>

          <CaseHeading id="brief">Кратко</CaseHeading>
          <CaseText>
            <p>
              Black — один из ключевых продуктов Т‑Банка. <span className="promo-debit-case__marker">Для рекламных кампаний продукт готовил промо‑страницы:</span>
                под разные аудитории, офферы и условия оформления.
            </p>
            <p>
              В таких сценариях дизайн карты становился не просто визуальной деталью. Он помогал сделать акцию
              понятнее, эмоциональнее и ближе к пользователю.
            </p>
            <p>
              Я работала над 3D с акционными дизайнами Black: проектировала промо‑сценарии, продумывала селект карт и
              создавала визуалы в Blender. В кейсе покажу два подхода: персонализированные дизайны для нерезидентов и
              природную коллекцию.
            </p>
          </CaseText>

          <PromoImage
            name="card-02"
            alt="Развитие промо‑сценария с акционными дизайнами Black"
          />

          <CaseHeading id="problem">Проблема</CaseHeading>
          <CaseText>
            <p>
              <Link className="promo-debit-case__inline-link" to="/cases/black">
                В кейсе «Революция формы карты Black: от гипотез до роста конверсии»
              </Link>{' '}
              я уже упоминала, что мы знаем, что{' '}
              <span className="promo-debit-case__marker">дизайн карты влияет</span> 
             на выбор банка и заказ карты (иногда даже повторный заказ дополнительной карты).
            </p>
            <p>
              В промо‑сценариях Black нужно было показать не только карту, но и обыграть условия акции ярко: например,
              бесплатное обслуживание навечно или эксклюзивный дизайн. В таких акциях обычно заранее узнают у аудитории,
              какие дизайны заходят больше.
            </p>
          </CaseText>

          <CaseSubheading id="scenario-1">Сценарий 1. Карта для нерезидентов</CaseSubheading>
          <CaseText>
            <p>
              В одном из акционных сценариев мы работали с нерезидентами — клиентами из других стран, которые оформляют
              карту в России. У них отличается не только пакет документов, но и культурный контекст, поэтому промо‑страница
              должна быть более персональной.
            </p>
            <p>
              Я рассматривала иммерсивный подход с погружением пользователя в сцену:
            </p>
          </CaseText>

          <PromoImage
            name="card-03"
            alt="Первый концепт карты для нерезидентов"
          />

          <CaseText>
            <p>
              После обсуждения с командой мы выбрали более масштабируемое решение — культуру страны я передала через атрибуты: шляпы, орнаменты,
              фактуры, локальные предметы.
            </p>
            <p>
              Так карта становилась не просто вариантом в селекте, а маленьким культурным сюжетом. Финальный концепт:
            </p>
          </CaseText>

          <div className="promo-debit-case__media-stack">
            <div className="promo-debit-case__media-stack-item promo-debit-case__media-stack-item--top">
              <PromoImage
                name="card-04"
                alt="Финальный концепт карты для нерезидентов"
              />
            </div>

            <div className="promo-debit-case__hero-iframe" data-reveal>
              <div className="promo-debit-case__hero-iframe-frame">
                <CaseDeferredIframe
                  src="https://player.vimeo.com/video/1198768323?background=1&amp;autopause=0"
                  width="1920"
                  height="781"
                  loading="lazy"
                  frameBorder="0"
                  allow="autoplay; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                  title="Promo video"
                />
              </div>
            </div>

            <div className="promo-debit-case__media-stack-item promo-debit-case__media-stack-item--bottom">
              <PromoImage
                name="card-05"
                alt="Результат второго концепта карты для нерезидентов"
              />
            </div>

            <div
              className={`promo-debit-case__media-stack-extra${showAll3D ? ' promo-debit-case__media-stack-extra--visible' : ''}`}
            >
              <PromoImage
                name="card-10"
                alt="Дополнительный 3D‑ракурс для кейса с нерезидентами"
              />
            </div>
          </div>

          {!showAll3D && (
            <div className="promo-debit-case__show-more" data-reveal>
              <button
                className="portfolio-show-btn"
                onClick={() => setShowAll3D(true)}
              >
                <ArrowDownIcon />
                показать все 3D поближе
              </button>
            </div>
          )}

          <CaseSubheading id="scenario-2">Сценарий 2. Природа России</CaseSubheading>
          <CaseText>
            <p>
              В этом сценарии нужно было представить акцию с вечным бесплатным обслуживанием Black, где дизайны — пейзажи природы России.
            </p>
            <p>
              Тут есть простые символы: цена 0 ₽ за обслуживание и ∞ — эта цена навечно.
            </p>
            <p>
              Эта идея легла в 3D‑сцены: знак бесконечности, карта и природные окружения собирались в один визуальный образ.
              Так графика не просто украшала страницу, а сразу помогала считать смысл акции ещё до прочтения текстов.
            </p>
            <p>Для главной мной была создана такая картинка:</p>
          </CaseText>

          <CaseText>
            <a
              className="case-cover__pill"
              href="https://web.archive.org/web/20240406053358/https://www.tinkoff.ru/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Веб‑архив tbank.ru</span>
            </a>
          </CaseText>

          <PromoImage
            name="card-06"
            alt="3D‑визуал для акции с природными дизайнами карты Black"
          />

          <CaseText>
            <p>
              Ещё собирала такую страницу и 3D для дебетовой карты Black:
            </p>
          </CaseText>

          <CaseText>
            <a
              className="case-cover__pill"
              href="https://web.archive.org/web/20240424165849/https://www.tinkoff.ru/cards/debit-cards/tinkoff-black/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Веб‑архив tinkoff.ru/cards/debit-cards/tinkoff-black</span>
            </a>
          </CaseText>

          <PromoImage
            name="card-07"
            alt="3D‑иллюстрация для дебетовой карты Black"
          />
          <PromoImage
            name="card-08"
            alt="Дополнительный 3D‑visual для Black"
          />

          <CaseHeading id="result">Результат</CaseHeading>
          <CaseTextList
            intro="В результате сформировался подход к акционным дизайнам Black, который можно использовать в похожих сценариях. Получилось так:"
            items={[
              'дизайн карты стал частью акционного сообщения',
              'селект помогал раскрывать смысл кампании',
              '3D‑визуалы можно было адаптировать под разные аудитории и офферы',
              'подход подходил для секционных картинок и промо‑страниц',
              'визуал оставался в рамках стандартов Т‑Банка',
            ]}
          />

          <CaseBanner>
            В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
          </CaseBanner>

          <PromoImage
            name="card-09"
            alt="Иллюстрация результата кейса"
          />

          <CaseHeading id="related">Связанные кейсы</CaseHeading>
          <CaseText>
            <p>
              Чтобы лучше понять контекст работы с Black, 3D и продуктовыми сценариями Т‑Банка, можно посмотреть соседние кейсы: UX‑сценарии, заявки и операционную эффективность:
            </p>
            <ul className="promo-debit-case__related-list">
              <li>
                <Link to="/cases/duplicates">Как UX‑решение сократило повторные заявки почти на 100%</Link>
              </li>
              <li>
                <Link to="/cases/black">Революция формы карты Black: от гипотез до роста конверсии</Link>
              </li>
              <li>
                <Link to="/cases/visuals-ai">3D- и AI‑визуалы для Т‑Банка и Росбанка</Link>
              </li>
            </ul>
          </CaseText>

          <CaseHeading id="reflection">Рефлексия</CaseHeading>
          <CaseText>
            <p>
              В этом проекте для меня было важно не влюбиться в 3D сильнее, чем в задачу.
            </p>
            <p>
              Красивый визуал сам по себе не решает проблему. Но если связать его с оффером, аудиторией и пользовательским сценарием, он начинает работать как часть продукта: помогает объяснять, вовлекать и доводить до заявки.
            </p>
          </CaseText>

          <CaseBanner>
            Спустя время по указанным URL‑ам может обновиться контент и отличаться от скринов.
          </CaseBanner>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton getIsVisible={() => true} />
    </article>
  );
};

export default PromoDebitCasePage;
