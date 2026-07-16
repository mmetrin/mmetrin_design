import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CaseBanner,
  CaseCover,
  CaseHeading,
  CaseImage,
  CaseSidebar,
  CaseText,
  CaseTextList,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './DuplicateApplicationsCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/duplicate-applications');
const COVER_ASSET_VERSION = '20260706-0210';

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'client', title: 'Клиент' },
  { id: 'context', title: 'Контекст' },
  { id: 'problem', title: 'Проблема' },
  { id: 'research', title: 'Исследование' },
  { id: 'solution', title: 'Решение' },
  { id: 'role', title: 'Моя роль' },
  { id: 'extra-complexity', title: 'Сложности' },
  { id: 'ab-result', title: 'Результат' },
  { id: 'important', title: 'Рефлексия' },
];

export const DuplicateApplicationsCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef, { maxOffset: 30, scale: 1.07 });

  return (
    <article className="duplicate-applications-case">
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
            title="Как UX‑решение сократило повторные заявки"
            projectHref="https://www.tbank.ru/cards/debit-cards/"
            projectLabel="tbank.ru/cards/debit-cards"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.png?v=${COVER_ASSET_VERSION}`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover-bg-mobile.png?v=${COVER_ASSET_VERSION}`}
            stats={[
              { text: 'Решение подтвердило гипотезу без ухудшения ключевых метрик' },
              { text: 'Снизила объём ручной обработки заявок. Сократила дубли и повторные обращения' },
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
              Я спроектировала сценарии для клиентов с повторными заявками на банковский продукт.
              Сначала разобралась, почему появляются дубли, а затем с аналитиками и разработчиками
              помогла изменить логику: система стала раньше понимать статус клиента и вести его
              в подходящий сценарий.
            </p>
            <p>
              Грубо говоря, ручная обработка таких заявок сократилась почти полностью, повторных обращений
              стало меньше, а ключевые продуктовые метрики остались стабильными.
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/01-summary-result.png`}
            mobileSrc={`${CASE_IMAGE_PATH}/01-summary-result-mobile.jpg`}
            alt="Сравнение ожиданий по MDE и результата по снижению дублей"
          />
          <CaseBanner>
            Тесты проводились на карточных продуктах Т‑Банка для детской и взрослой
            аудитории. CR — conversion rate, конверсия.
          </CaseBanner>

          <CaseHeading
            id="client"
            actionHref="https://www.tbank.ru/cards/debit-cards/"
            actionLabel="tbank.ru/cards/debit-cards"
          >
            Клиент
          </CaseHeading>
          <CaseText>
            <p>
              Т‑Банк — онлайн‑банк, поэтому заявка на сайте часто становится первым шагом клиента
              в продукт и важной точкой входа для бизнеса. На этом пути появлялись{' '}
              <span className="duplicate-applications-case__marker">
                дубли → усложняли пользовательский путь
              </span>{' '}
              и создавали дополнительную операционную нагрузку.
            </p>
            <p>
              Мне нужно было найти неочевидные места в сценарии и провести каждого пользователя
              в подходящий ему путь — без лишних шагов и ручной обработки.
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/02-client-flow.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/02-client-flow-mobile.jpg`}
            alt="Схема валидации данных, определения статуса и выбора подходящего сценария"
          />

          <CaseHeading id="context">Контекст</CaseHeading>
          <CaseText>
            <p>
              В процессе оформления банковских продуктов часть пользователей повторно оставляла
              заявки на один и тот же продукт. Причины разные. Кто‑то хотел оформить карту
              родственнику, а кто‑то уже пользовался картой и на самом деле нуждался не в новой
              заявке, а в другом сценарии. Из‑за этого{' '}
              <span className="duplicate-applications-case__marker">
                система не всегда понимала, кто перед ней
              </span>
              : новый клиент или, например, наш Иван Иванович, который уже есть в базе,
              но успел поменять фамилию:
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/03-duplicate-customer.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/03-duplicate-customer-mobile.jpg`}
            alt="Пример клиента, который уже есть в базе, но создаёт заявку‑дубль с другим ФИО"
          />
          <CaseText>
            <p>
              В итоге «такой Иван» мог пройти всё оформление заново, создать заявку‑дубль и попасть
              на дополнительную проверку, хотя его задачу можно было решить быстрее: связать данные
              и сразу дать подходящий сценарий.
            </p>
          </CaseText>

          <CaseHeading id="problem">Почему это проблема</CaseHeading>
          <CaseTextList
            intro="Дубли создавали нагрузку сразу в нескольких местах:"
            items={[
              'пользователь проходил лишние шаги',
              'спорные заявки уходили в ручную обработку',
              'путь до оформления становился длиннее',
            ]}
            outro="Особенно сложным был сценарий с разными номерами телефона. Например, Иван уже есть в базе, но в новой заявке указывает другой номер:"
          />
          <CaseImage
            src={`${CASE_IMAGE_PATH}/04-phone-mismatch.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/04-phone-mismatch-mobile.jpg`}
            alt="Пример повторной заявки с другим номером телефона"
          />
          <CaseText>
            <p>
              Системе нужно понять, какой номер актуален → такие случаи могли требовать дополнительной ручной проверки, а я хотела закрыть их более точной логикой и понятным интерфейсом.
            </p>
          </CaseText>
          <CaseBanner>
            В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
          </CaseBanner>

          <CaseHeading id="research">Исследование</CaseHeading>
          <CaseText>
            <p>
              Я начала с анализа данных и флоу: где появляются дубли, на каком этапе человек
              возвращается к оформлению и что происходит с первой заявкой. Мне было важно понять
              не только где ломается сценарий, но и{' '}
              <span className="duplicate-applications-case__marker">
                зачем пользователь вообще приходит повторно
              </span>
              .
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/05-research-map.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/05-research-map-mobile.jpg`}
            alt="Схема исследовательских вопросов о дубликатах заявок"
          />
          <CaseTextList
            intro="В исследовании я:"
            items={[
              'разобрала основные сценарии повторных заявок',
              'проверила продуктовые и UX‑гипотезы',
              'нашла места, где пользователь не понимал свой статус или следующий шаг',
              'разделила повторные обращения по причинам',
            ]}
            outro="Часть первоначальных гипотез не подтвердилась. Проблема оказалась в том, что существующий путь не всегда соответствовал реальной задаче клиента, потому они шли по привычному оформлению дебетовки, хотя цели у них другие:"
          />
          <CaseImage
            src={`${CASE_IMAGE_PATH}/06-user-intents.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/06-user-intents-mobile.jpg`}
            alt="Примеры причин повторных заявок клиентов"
          />

          <CaseHeading id="solution">Решение</CaseHeading>
          <CaseText>
            <p>
              После исследования я разделила клиентов и для каждого сценария спроектировала путь.
              Идея простая: не вести всех по одному и тому же оформлению, а раньше определять
              их статус и показывать релевантное действие. Вместе с аналитиками и разработчиками
              мы проработали логику: система должна была понять, кто перед ней, ещё до того,
              как пользователь создаст лишнюю заявку.
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/07-phone-confirmation.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/07-phone-confirmation-mobile.jpg`}
            alt="Экран подтверждения телефона для уже распознанного клиента"
          />

          <CaseHeading id="role">Моя роль</CaseHeading>
          <section className="case-block case-text case-text-list" data-reveal>
            <p>В рамках проекта я:</p>
            <ul>
              <li>
                интерпретировала результаты исследования и разделила повторные заявки
                на понятные сценарии
              </li>
              <li>
                спроектировала новые пользовательские пути, экраны и состояния для разных групп
                клиентов
              </li>
              <li>
                продумала пограничные случаи: разные номера телефона, изменённые данные, активный
                продукт, повторная заявка спустя время
              </li>
              <li>
                <span className="duplicate-applications-case__marker">
                  учла ограничения сценариев
                </span>
                : не каждый пользователь мог сразу перейти в веб‑личный кабинет или зайти
                в мобильный банк —{' '}
                <span className="duplicate-applications-case__marker">
                  путь зависел от статуса счёта, карты и данных
                </span>
              </li>
              <li>
                написала интерфейсные тексты, участвовала в проработке логики с аналитиками
                и разработчиками, сопровождала реализацию и проверяла решение после запуска
              </li>
            </ul>
            <p>
              Особое внимание я уделила тому, чтобы пользователь понимал свой статус и следующий
              шаг, даже если за экраном скрывалась сложная логика.
            </p>
          </section>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/08-scenario-screens.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/08-scenario-screens-mobile.jpg`}
            alt="Экраны сценариев для разных групп клиентов"
          />
          <CaseText>
            <p>
              Если клиент уже получил продукт давно, я не вела его в повторное оформление.
              Вместо этого показывала релевантные действия: доп. карту для себя или для другого человека.
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/09-additional-card.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/09-additional-card-mobile.jpg`}
            alt="Сценарий оформления дополнительной карты вместо повторной заявки"
          />
          <CaseText>
            <p>Для макетов выше я также делала 3D‑шки сама :)</p>
            <p>
              Это помогло быстрее собрать понятные макеты, показать разные варианты действий
              и не зависеть от отдельного этапа производства визуалов.
            </p>
          </CaseText>

          <CaseHeading id="extra-complexity">Дополнительная сложность</CaseHeading>
          <CaseText>
            <p>
              Отдельно я учла платформенные ограничения: часть{' '}
              <span className="duplicate-applications-case__marker">
                iOS‑клиенты не могут скачать приложение банка
              </span>
              . Поэтому я спроектировала альтернативные пути, чтобы технические ограничения
              не становились проблемой клиента.
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/10-ios-limits.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/10-ios-limits-mobile.jpg`}
            alt="Альтернативные сценарии для клиентов с платформенными ограничениями"
          />

          <CaseHeading id="ab-result">Результат</CaseHeading>
          <CaseText>
            <p>
              A/B‑тест подтвердил гипотезу: случаев ручной обработки снизилось, а ключевые
              продуктовые метрики остались стабильными.
            </p>
          </CaseText>
          <CaseImage
            src={`${CASE_IMAGE_PATH}/11-ab-results.jpg`}
            mobileSrc={`${CASE_IMAGE_PATH}/11-ab-results-mobile.jpg`}
            alt="Результаты A/B‑теста по ключевым сценариям"
          />
          <CaseText>
            <p>
              Решение убрало лишние повторные заявки и снизило операционную нагрузку: командам
              стало меньше спорных кейсов для ручной обработки.
            </p>
            <p>
              Подход оказался применим и к другим продуктовым сценариям, включая оформление детской карты Junior —{' '}
              <Link className="duplicate-applications-case__inline-link" to="/cases/junior">
                детали её улучшения в этом кейсе
              </Link>
              .
            </p>
          </CaseText>
          <CaseBanner>
            В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
          </CaseBanner>

          <CaseHeading id="important">Что было важным в этом проекте</CaseHeading>
          <CaseText>
            <p>
              Для меня этот кейс — про то, что сильный UX не всегда выглядит как большая
              визуальная фича. Иногда это несколько простых экранов, правильная логика и понятные
              тексты.
            </p>
            <p>
              В этом проекте интерфейс не просто помог пользователю быстрее понять, что делать
              дальше. Он заметно снизил операционную нагрузку на команды. А в продукте
              это почти всегда работает просто: если ты срезал косты — значит, уже сэкономил
              деньги компании.
            </p>
            <p>
              Мне нравится такой дизайн: без лишнего шума, но с понятным результатом
              для пользователя и бизнеса.
            </p>
          </CaseText>
        </div>
      </div>
      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};
