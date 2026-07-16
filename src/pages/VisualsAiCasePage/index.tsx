import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CaseBanner,
  CaseCover,
  CaseHeading,
  CaseImage,
  CaseSidebar,
  CaseSubheading,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './VisualsAiCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/visuals-ai');

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'dolyame', title: 'Долями' },
  { id: 'b2b-redesign', title: 'Т‑Бизнес' },
  { id: 'system', title: 'Система', level: 1 },
  { id: 'collaboration', title: 'Много 3D', level: 1 },
  { id: 'examples', title: 'Примеры' },
  { id: 'rosbank', title: 'Росбанк' },
  { id: 'partners', title: 'Т‑Партнеры' },
  { id: 'time', title: 'Time' },
  { id: 'jump', title: 'Jump.Finance' },
  { id: 'ai-t-fusion', title: 'AI и T‑Fusion' },
  { id: 'final-result', title: 'Результат' },
  { id: 'reflection', title: 'Что я вынесла' },
];

const EXAMPLE_IMAGE_NAMES = [
  '01 example',
  '02 example',
  '03 example',
  '04 example',
  '05 example',
  '06 example',
  '07 example',
  '08 example',
  '09 example',
];

type VisualsAiImageProps = {
  name: string;
  alt: string;
};

const VisualsAiImage = ({ name, alt }: VisualsAiImageProps) => (
  <CaseImage src={`${CASE_IMAGE_PATH}/${name}.jpg`} alt={alt} />
);

type ExternalPillProps = {
  href: string;
  children: React.ReactNode;
};

const ExternalPill = ({ href, children }: ExternalPillProps) => (
  <a className="case-cover__pill" href={href} target="_blank" rel="noreferrer">
    <span>{children}</span>
  </a>
);

export const VisualsAiCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case visuals-ai-case">
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
            title="3D- и AI‑визуалы для Т‑Банка, Долями и Росбанка"
            projectHref="https://www.tbank.ru/cards/debit-cards/"
            projectLabel="tbank.ru/cards/debit-cards"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.jpg`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.jpg`}
            stats={[
              {
                text: 'Систематизировала редизайн B2B‑веба. Помогала провести переезд Росбанка',
              },
              {
                text: 'Ревьюила визуалы, работала с гайдами, брендом, SEO и AI‑пайплайнами',
              },
            ]}
          />
        </div>
      </div>

      <div className="case-study-layout">
        <CaseSidebar items={CASE_SECTIONS} />
        <div className="case-study-content">
          <CaseHeading id="brief">Кратко</CaseHeading>
          <CaseText>
            <p>
              Как я уже рассказывала{' '}
              <Link className="visuals-ai-case__inline-link" to="/cases/promo-debit">
                в кейсе про 3D
              </Link>
              , одна из моих первых работ попала на главную tbank.ru. Я только начинала работать
              с 3D, поэтому увидеть свой вклад на самом видном месте продукта было невероятно
              волнительно.
            </p>
            <p>
              Дальше интереснее: я лидила B2B‑публичный веб, делала и ревьюила 3D‑графику,
              участвовала в миграции Росбанка и помогала внедрять AI‑пайплайны в команды 3D.
            </p>
            <ExternalPill href="https://web.archive.org/web/20240626035721/https://www.tbank.ru/">
              Моя 3D на tbank.ru
            </ExternalPill>
          </CaseText>
          <VisualsAiImage
            name="card-01-tbank-main"
            alt="3D‑визуал на главной странице tbank.ru"
          />

          <CaseHeading id="dolyame">Долями</CaseHeading>
          <CaseText>
            <p>
              В начале своего пути в Т я создала 3D‑иллюстрации категорий Долями — сервиса
              для оплаты покупок частями.
            </p>
            <p>
              Задача была не в том, чтобы сделать набор отдельных иконок. Нужно было собрать
              систему, которая хорошо работает в вебе и мобайле, помогает навигироваться
              и может расширяться новыми объектами.
            </p>
            <ExternalPill href="https://dolyame.ru/">dolyame.ru</ExternalPill>
          </CaseText>
          <VisualsAiImage name="card-02-dolyame" alt="3D‑иллюстрации категорий Долями" />

          <CaseHeading id="b2b-redesign">Система редизайна для Т‑Бизнеса</CaseHeading>
          <CaseText>
            <p>
              Т‑Банк — онлайн‑банк, большая экосистема. Когда я стала лидом неавторизованного веба B2B‑направления
              Т‑Банка, платформа переживала редизайн: Т‑Бизнес переходил на новую палитру.
            </p>
            <p>
              В проде уже жили тысячи публичных страниц. Многие из них оставались серыми,
              в общем стиле Т‑Банка, а не в новом бежевом стиле Т‑Бизнеса.
            </p>
          </CaseText>
          <VisualsAiImage
            name="card-03-b2b-before"
            alt="Быстрая замена 3D‑визуалов до системного редизайна"
          />

          <CaseSubheading id="system">Система</CaseSubheading>
          <CaseTextListLike>
            <p>
              Нужна была система: какие страницы важнее, что обновлять первым, что можно отложить,
              а что лучше удалить или объединить, чтобы не тратить ресурс на неактуальные страницы.
            </p>
            <p>Собрала централизованную таблицу, где фиксировалось:</p>
            <ul>
              <li>трафик страницы;</li>
              <li>продуктовый сегмент;</li>
              <li>статус по новым гайдам;</li>
              <li>нужна ли переработка 3D;</li>
              <li>насколько страница важна для обновления;</li>
              <li>кто отвечает за дальнейшие изменения.</li>
            </ul>
          </CaseTextListLike>
          <CaseText>
            <p>Одна из самых популярных страниц — Регистрация ИП. Так я с командой её обновила:</p>
            <ExternalPill href="https://www.tbank.ru/business/registration-ip/">
              tbank.ru/business/registration-ip
            </ExternalPill>
          </CaseText>
          <VisualsAiImage
            name="card-04-registration-ip"
            alt="Редизайн страницы регистрации ИП в Т‑Бизнесе"
          />
          <CaseText>
            <p>
              Главная сложность была не в самом редизайне, а в том, что{' '}
              <span className="visuals-ai-case__marker">
                команда продолжала запускать продуктовые и маркетинговые задачи
              </span>
              , а параллельно нужно было приводить большую витрину B2B‑веба к новому стилю
              Т‑Бизнеса.
            </p>
          </CaseText>
          <VisualsAiImage
            name="card-05-b2b-result"
            alt="Итог системного редизайна Т‑Бизнеса"
          />
          <CaseBanner>
            В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
          </CaseBanner>

          <CaseSubheading id="collaboration">Кросскомандное взаимодействие</CaseSubheading>
          <CaseText>
            <p>Переход Т‑Бизнеса в новый стиль был не только задачей внутри веба.</p>
            <p>
              Мне и моей команде нужно было много работать кросс‑командно: с бренд‑дизайном,
              3D‑командами, продуктами и другими специалистами в зоне публичного веба.
            </p>
          </CaseText>
          <VisualsAiImage
            name="card-06-cross-team"
            alt="Кросскомандная работа над стилем 3D для Т‑Бизнеса"
          />

          <CaseHeading id="examples">Ещё красивые примеры</CaseHeading>
          <CaseText>
            <p>
              В текущем облике публичного веба Т-Бизнеса есть большой вклад моей команды. Я участвовала в создании части страниц сама, а остальные сопровождала как лид и ревьюер.
            </p>
            <ExternalPill href="https://www.tbank.ru/business/">tbank.ru/business</ExternalPill>
          </CaseText>
          <VisualsAiImage
            name="card-07-business-examples"
            alt="Примеры визуалов на страницах Т‑Бизнеса"
          />
          <VisualsAiImage
            name="card-08-navigation-result"
            alt="Рост кликов по навигации после обновления 3D‑иконок"
          />
          <CaseText className="visuals-ai-case__spaced-text">
            <p>Эту страничку и 3D для крупной рекламной кампании создавала я:</p>
            <ExternalPill href="https://www.tbank.ru/corporate/account/offer/">
              tbank.ru/corporate/account/offer
            </ExternalPill>
          </CaseText>
          <VisualsAiImage
            name="card-09-corporate-offer"
            alt="3D‑визуалы для крупной рекламной кампании Т‑Бизнеса"
          />
          <CaseText className="visuals-ai-case__spaced-text">
            <p>Ещё мои работы и визуалы:</p>
          </CaseText>
          <VisualsAiImage
            name="card-10-credit-currency"
            alt="Визуалы для страниц кредитов и валюты Т‑Бизнеса"
          />
          <CaseText className="visuals-ai-case__spaced-text">
            <p>Работы и визуалы моей команды:</p>
          </CaseText>
          <div className="visuals-ai-case__examples-stack">
            {EXAMPLE_IMAGE_NAMES.map((name, index) => (
              <VisualsAiImage
                key={name}
                name={name}
                alt={`Пример 3D‑визуала Т‑Бизнеса ${index + 1}`}
              />
            ))}
          </div>
          <VisualsAiImage
            name="card-16-business-card-before-after"
            alt="До и после обновления страницы бизнес‑карты"
          />
          <VisualsAiImage
            name="card-17-redesign-result"
            alt="Итог редизайна Т‑Бизнеса меньше чем за год"
          />

          <CaseHeading id="rosbank">Росбанк: миграция на новую платформу</CaseHeading>
          <CaseText>
            <p>
              После объединения публичные страницы Росбанка нужно было перенести с прежней платформы
              в новую систему. На старте нужно было пересобрать структуру страниц,
              обновить бренд‑составляющую, адаптировать визуалы и встроить продукты Росбанка
              в новую систему.
            </p>
            <p>
              Я участвовала как лид: ревьюила решения, помогала выстраивать структуру, визуалы
              и консистентность.
            </p>
            <ExternalPill href="https://www.rosbank.ru/">rosbank.ru</ExternalPill>
          </CaseText>
          <VisualsAiImage
            name="card-18-rosbank"
            alt="Миграция публичного веба Росбанка на новую платформу"
          />
          <VisualsAiImage
            name="card-19-rosbank-result"
            alt="Итог миграции Росбанка меньше чем за полгода"
          />

          <CaseHeading id="partners">Т‑Партнеры</CaseHeading>
          <CaseText>
            <p>Также на дизайн-поддержке моей команды был сервис партнёрской программы Т‑Партнёры.</p>
            <p>
              Когда сервис появился в вебе, я проектировала структуру страниц и первые карты сайта
              согласовывала с оунерами. 3D, форму и страницы, приложенные ниже, собирала тоже я.
            </p>
            <ExternalPill href="https://partners.tbank.ru/">partners.tbank.ru</ExternalPill>
          </CaseText>
          <VisualsAiImage name="card-20-partners" alt="Страницы сервиса Т‑Партнеры" />

          <CaseHeading id="time">Мессенджер Time</CaseHeading>
          <CaseText>
            <p>
              Ещё на дизайн-поддержке моей команды был мессенджер Тайм и страницы Технологий для бизнеса
              от Т‑Банка.
            </p>
            <div className="visuals-ai-case__pill-row">
              <ExternalPill href="https://time-messenger.ru/">time-messenger.ru</ExternalPill>
              <ExternalPill href="https://www.tbank.ru/software/voicekit/">
                tbank.ru/software/voicekit
              </ExternalPill>
            </div>
          </CaseText>
          <VisualsAiImage name="card-21-time" alt="Страницы мессенджера Time" />

          <CaseHeading id="jump">Jump.Finance — выплаты для B2B</CaseHeading>
          <CaseText>
            <p>
              В параллель с Т‑Бизнесом я работала над сервисом для расчётов и документооборота
              с физлицами Jump.Finance и системой управления такси Jump.Taxi.
            </p>
            <p>Публичные страницы и 3D-визуалы для этих сервисов создавались внутри моей команды. Часть материалов я проектировала самостоятельно, остальные сопровождала как лид и ревьюер.</p>
            <div className="visuals-ai-case__pill-row">
              <ExternalPill href="https://jump.finance/">jump.finance</ExternalPill>
              <ExternalPill href="https://jump.taxi/">jump.taxi</ExternalPill>
            </div>
          </CaseText>
          <VisualsAiImage name="card-22-jump" alt="Страницы Jump.Finance и Jump.Taxi" />

          <CaseHeading id="ai-t-fusion">AI и T‑Fusion</CaseHeading>
          <CaseText>
            <p>
              Я ротировалась в команду T-Fusion, которая развивала инструменты генерации изображений для рабочих задач дизайнеров.
            </p>
            <p>
              Я была лидом со стороны дизайна. Моя задача была не «генерировать ради генерации»,
              а искать, где{' '}
              <span className="visuals-ai-case__marker">
                AI действительно помогает командам быстрее работать с визуалом
              </span>
              .
            </p>
          </CaseText>
          <CaseTextListLike>
            <p>Что я делала:</p>
            <ul>
              <li>готовила визуальные материалы для экспериментов и участвовала в адаптации генеративных моделей под разные стилистические задачи</li>
              <li>участвовала в экспериментах с LoRA</li>
              <li>тестировала генерации под разные визуальные направления</li>
              <li>плотно работала с разработчиками</li>
              <li>проводила демо и интенсивы для дизайнеров</li>
              <li>показывала, как AI можно встроить в рабочий процесс без потери качества.</li>
            </ul>
          </CaseTextListLike>

          <CaseHeading id="final-result">Результат</CaseHeading>
          <CaseTextListLike>
            <p>Что получилось:</p>
            <ul>
              <li>появился единый подход к приоритизации редизайна страниц</li>
              <li>упростилось планирование редизайна и производства 3D-визуалов</li>
              <li>новый визуальный стиль стал последовательно применяться в публичном вебе</li>
              <li>3D-ассеты стали переиспользоваться в разных продуктовых задачах</li>
              <li>AI-инструменты помогли быстрее исследовать визуальные направления</li>
            </ul>
          </CaseTextListLike>
          <div className="visuals-ai-case__result-banner">
            <CaseBanner>
              В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
            </CaseBanner>
          </div>

          <CaseHeading id="reflection">Что я вынесла</CaseHeading>
          <CaseText>
            <p>Этот кейс не про то, что я делала красивые 3D‑картинки.</p>
            <p>
              Он про то, как визуальное направление становится частью продуктовой системы.
              Когда у тебя тысячи страниц, ограниченный ресурс и новый бренд, дизайн‑лиду важно
              не только рисовать и ревьюить, но и выстраивать процесс: понимать трафик,
              договариваться с командами, чистить лишнее, влиять на гайды и помогать команде
              запускать изменения без хаоса.
            </p>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

type CaseTextListLikeProps = {
  children: React.ReactNode;
};

const CaseTextListLike = ({ children }: CaseTextListLikeProps) => (
  <section className="case-block case-text case-text-list" data-reveal>
    {children}
  </section>
);

export default VisualsAiCasePage;
