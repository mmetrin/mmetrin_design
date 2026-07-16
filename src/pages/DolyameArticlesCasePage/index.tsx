import { useRef } from 'react';
import {
  CaseBanner,
  CaseCover,
  CaseHeading,
  CaseImage,
  CaseSidebar,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './DolyameArticlesCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/dolyame-articles');

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'client', title: 'Клиент и контекст' },
  { id: 'hypotheses', title: 'Гипотезы' },
  { id: 'solution', title: 'Решение' },
  { id: 'result', title: 'Результат' },
  { id: 'dolyame', title: '3Дшки категорий' },
  { id: 'role', title: 'Моя роль' },
];

type DolyameArticlesImageProps = {
  name: string;
  alt: string;
};

const DolyameArticlesImage = ({ name, alt }: DolyameArticlesImageProps) => (
  <CaseImage src={`${CASE_IMAGE_PATH}/${name}.jpg`} alt={alt} />
);

const VisualsAiImage = ({ name, alt }: DolyameArticlesImageProps) => (
  <CaseImage src={publicPath(`/images/cases/visuals-ai/${name}.jpg`)} alt={alt} />
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

export const DolyameArticlesCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case dolyame-articles-case">
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
            title="Долями. Раздел статей и 3D"
            projectHref="https://dolyame.ru/"
            projectLabel="dolyame.ru"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.jpg`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.jpg`}
            stats={[
              {
                text: 'Запустила формат для быстрого выпуска статей. Без постоянного участия дизайнера и разработки',
              },
              {
                text: 'Погрузилась в незнакомую для себя продуктовую область в краткие сроки. Удалось повысить трафик и SEO‑выдачу',
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
              В Долями нужно было запустить новый раздел статей для B2B‑аудитории. Это была
              не просто контентная страница, а продуктовый инструмент: статьи должны были
              <span className="dolyame-articles-case__marker">
                привлекать SEO‑трафик, объяснять сложные части сервиса
              </span>
              , снижать количество повторяющихся вопросов в поддержку и помогать партнёрам
              лучше понимать продукт.
            </p>
            <p>
              Я спроектировала универсальный шаблон статьи и новые контентные блоки с учётом
              существующей админки, сетки и технических ограничений. Дополнительно улучшила UX
              нескольких блоков, которые изначально не входили в задачу, но влияли на качество
              сценария.
            </p>
            <p>
              После запуска раздела общий трафик B2B‑страниц Долями вырос двузначно,
              а отдельные материалы заняли сильные позиции в поисковой выдаче по целевым
              запросам.
            </p>
          </CaseText>
          <DolyameArticlesImage
            name="01-traffic-result"
            alt="Статзначимый рост трафика и топ‑1 выдачи после выпуска статей Долями"
          />
          <CaseText>
            <p>
              Сейчас выпущено уже более 4х статей, но я делюсь статистикой на момент работы
              в команде Долями.
            </p>
          </CaseText>

          <CaseHeading id="client">Клиент и контекст</CaseHeading>
          <CaseText>
            <p>Долями — BNPL‑сервис для оплаты покупок частями.</p>
          </CaseText>
          <DolyameArticlesImage
            name="add_pic"
            alt="Долями как BNPL‑сервис для оплаты покупок частями"
          />
          <CaseText>
            <p>
              Для B2B‑направления важно не только привлекать новых партнёров, но и понятно
              объяснять, как работает продукт: какие есть условия, как подключиться,
              что меняется в сервисе и почему это важно для бизнеса.
            </p>
            <p>
              До запуска раздела статей у команды не было удобного масштабируемого формата
              для таких материалов. Каждый{' '}
              <span className="dolyame-articles-case__marker">
                новый контентный сценарий мог превращаться в задачу для дизайнера и разработки.
              </span>{' '}
              Это замедляло публикации и усложняло поддержку.
            </p>
            <p>
              Нужен был шаблон, который решал бы сразу несколько задач: приводил трафик,
              помогал найти ответы и повышал узнаваемость.
            </p>
          </CaseText>

          <CaseHeading id="hypotheses">Гипотезы</CaseHeading>
          <section className="case-block case-text case-text-list" data-reveal>
            <p>
              Мы с продактом и аналитиком Долями исходили из нескольких продуктовых гипотез:
            </p>
            <ul>
              <li>
                Если сделать{' '}
                <span className="dolyame-articles-case__marker">
                  универсальный шаблон статьи
                </span>
                , команда сможет быстрее публиковать новые материалы без постоянного
                подключения дизайнера.
              </li>
              <li>
                Если заложить понятную структуру, SEO‑поля и сценарий чтения, статьи смогут
                собирать органический трафик по важным для бизнеса запросам.
              </li>
              <li>
                Если использовать статьи как понятный слой объяснения, это поможет партнёрам
                быстрее разбираться в изменениях и снизит часть нагрузки на поддержку.
              </li>
            </ul>
          </section>

          <CaseHeading id="solution">Решение</CaseHeading>
          <CaseText>
            <p>
              Я быстро погрузилась в систему Долями: сетку, существующие блоки, админку
              и технические ограничения. На этой базе собрала универсальный шаблон статей
              и набор переиспользуемых блоков для длинного контента.
            </p>
            <ExternalPill href="https://dolyame.ru/blog/what-is-bnpl/">
              dolyame.ru/blog/what-is-bnpl
            </ExternalPill>
          </CaseText>
          <DolyameArticlesImage
            name="02-article-template"
            alt="Шаблон статьи Долями на десктопе и мобильном устройстве"
          />
          <CaseText>
            <p>
              <span className="dolyame-articles-case__marker">
                По своей инициативе улучшила несколько существующих блоков
              </span>
              , чтобы сценарий был цельнее, — и уложилась в сроки. В частности блок содержания
              на мобилке, его удобство проще оценить на проде в мобильной версии
            </p>
            <ExternalPill href="https://dolyame.ru/blog/dolyame-plus/">
              dolyame.ru/blog/dolyame-plus
            </ExternalPill>
          </CaseText>
          <DolyameArticlesImage
            name="03-mobile-navigation"
            alt="Улучшенный блок содержания статьи Долями в мобильной версии"
          />
          <CaseText>
            <p>
              В шаблоне учла структуру статьи, SEO — и OG‑поля, рубрики, теги, автора,
              адаптацию под мобильные устройства. Отдельно проработала UX чтения: первый экран,
              иерархию, оглавление и навигацию по материалу.
            </p>
            <p>Всё отразила в спецификациях:</p>
          </CaseText>
          <DolyameArticlesImage
            name="04-specifications"
            alt="Спецификации шаблона статьи Долями"
          />

          <CaseHeading id="result">Результат</CaseHeading>
          <CaseText>
            <p>Раздел статей запустили, были опубликованы первые материалы в краткие сроки</p>
          </CaseText>
          <DolyameArticlesImage
            name="05-result"
            alt="Рост трафика B2B‑страниц Долями и топ‑1 в поисковой выдаче"
          />
          <CaseText>
            <p>
              Один из материалов использовали в коммуникации с B2B‑партнёрами во время раскатки
              продуктового изменения. Он помогал объяснить новую механику и снижать напряжение
              вокруг запуска.
            </p>
            <p>
              Статья «Что такое BNPL‑сервис и зачем он бизнесу в России» —{' '}
              <span className="dolyame-articles-case__marker">
                занимает 3‑4 места в Google и Яндекс по поисковым запросам «что такое bnpl»
              </span>
            </p>
            <p>
              Статья «Долями ввёл сервисный сбор для покупателей» —{' '}
              <span className="dolyame-articles-case__marker">
                топ‑1 в поисковой выдаче Яндекс и Google
              </span>{' '}
              по некоторым запросам. Данная статья была важна для поддержания раскатки
              продуктовой фичи и снижения негатива со стороны партнёров.
            </p>
          </CaseText>
          <div className="dolyame-articles-case__result-banner">
            <CaseBanner>
              В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
            </CaseBanner>
          </div>

          <CaseHeading id="dolyame">3Дшки Категорий</CaseHeading>
          <CaseText>
            <p>В начале своего пути в Т я также создала 3D‑иллюстрации категорий Долями.</p>
            <p>
              Задача была не в том, чтобы сделать набор отдельных иконок. Нужно было собрать
              систему, которая хорошо работает в вебе и мобайле, помогает навигироваться
              и может расширяться новыми объектами, при этом соблюдает визуальный стиль.
            </p>
            <ExternalPill href="https://dolyame.ru/">dolyame.ru</ExternalPill>
          </CaseText>
          <VisualsAiImage
            name="card-02-dolyame"
            alt="3D‑иллюстрации категорий Долями"
          />

          <CaseHeading id="role">Моя роль</CaseHeading>
          <CaseText>
            <p>
              Я отвечала за дизайн шаблона и новых блоков: от структуры страницы
              до спецификаций и дизайн‑код‑ревью.
            </p>
            <p>
              На этапе проектирования работала с аналитиком Долями и дизайнером‑коллегой,
              она же готовила 3D‑креативы, на этапе реализации — с разработчиком. Важно было
              сохранить не только визуальное качество, но и логику шаблона в продакшене.
            </p>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default DolyameArticlesCasePage;
