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
import './BlackFormCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/black-form');

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'client', title: 'Клиент и контекст' },
  { id: 'problem', title: 'Проблема и цель' },
  { id: 'solutions', title: 'UX/UI‑решения' },
  { id: 'design-select', title: '1. Селект дизайна', level: 1 },
  { id: 'inputs', title: '2. Инпуты в форме', level: 1 },
  { id: 'benefits-in-form', title: '3. УТП в форме', level: 1 },
  { id: 'new-ui', title: '4. Новый UI', level: 1 },
  { id: 'cross-sell', title: '5. Кроссейл', level: 1 },
  { id: 'result', title: 'Результат' },
  { id: 'postreview', title: 'Постревью' },
  { id: 'adaptations', title: 'Адаптации' },
  { id: 'reflection', title: 'Рефлексия' },
];

type BlackFormImageProps = {
  name: string;
  alt: string;
};

const BlackFormImage = ({ name, alt }: BlackFormImageProps) => (
  <CaseImage
    src={`${CASE_IMAGE_PATH}/${name}.jpg`}
    mobileSrc={`${CASE_IMAGE_PATH}/${name}-mobile.jpg`}
    alt={alt}
  />
);

export const BlackFormCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case black-form-case">
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
            title="Революция формы карты Black: от гипотез до роста конверсии"
            projectHref="https://www.tbank.ru/cards/debit-cards/tinkoff-black/"
            projectLabel="tbank.ru/cards/tinkoff-black"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.jpg`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover-bg-mobile.jpg`}
            stats={[
              { text: 'Конверсия в заявку выросла. A/B‑тест утвердил новый концепт формы ' },
              { text: 'UI масштабировали дальше\nФорма стала базой для других продуктов' },
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
              Black — массовая дебетовая карта Т-Банка и для многих клиентов первый продукт банка. Поэтому опыт оформления влияет на первое впечатление от сервиса и дальнейшее знакомство с экосистемой.
            </p>
            <p>
              Я&nbsp;подключилась к&nbsp;улучшению формы Black после&nbsp;серии экспериментов. Я&nbsp;собрала новый концепт, который
              прошёл A/B-тестирование и&nbsp;стал основой обновлённой формы.
            </p>
          </CaseText>
          <BlackFormImage name="01-entry" alt="Black как точка входа в экосистему Т‑Банка" />
          <CaseText>
            <p>
              Моя&nbsp;задача была проверить, как&nbsp;форма может лучше продавать ценность
              Black&nbsp;— как&nbsp;можно раньше вовлечь пользователя и&nbsp;не&nbsp;сломать
              конверсию во&nbsp;всю&nbsp;воронку.
            </p>
            <p>Вышло так:</p>
          </CaseText>
          <BlackFormImage
            name="02-result"
            alt="Статзначимый рост CR из уникального посетителя в заявку, утилизацию и aha‑момент"
          />
          <CaseBanner>
            CR — conversion rate, конверсия. Aha-момент — значимое действие, которое показывает, что пользователь начал получать ценность от продукта.
          </CaseBanner>

          <CaseHeading
            id="client"
            actionHref="https://www.tbank.ru/cards/debit-cards/tinkoff-black/"
            actionLabel="tbank.ru/cards/tinkoff-black"
          >
            <span className="case-heading__desktop-title">Клиент и&nbsp;контекст</span>
            <span className="case-heading__mobile-title">Клиент</span>
          </CaseHeading>
          <CaseText>
            <p>
              Т‑Банк&nbsp;— онлайн‑банк, где&nbsp;для&nbsp;многих клиентов первый продукт&nbsp;—
              дебетовая карта Black. И&nbsp;форма оформления карты&nbsp;— важная часть воронки,
              которую&nbsp;команда регулярно развивает.
            </p>
            <p>
              Форма Black уже&nbsp;работала, но&nbsp;команда продолжала искать конфигурацию, которая
              улучшит раннюю воронку и&nbsp;не&nbsp;навредит дальнейшему сценарию.
              Я&nbsp;подключилась после&nbsp;серии A/B‑тестов и&nbsp;работала над&nbsp;новой
              итерацией формы.
            </p>
          </CaseText>
          <BlackFormImage
            name="03-form"
            alt="Форма Black нуждалась не только в визуальном обновлении, но и в новой продуктовой логике"
          />

          <CaseHeading id="problem">Проблема и цель</CaseHeading>
          <CaseText>
            <p>
              Форма Black не&nbsp;всегда доносила ценность карты прямо в&nbsp;заявке: дизайн, кэшбэк
              и&nbsp;УТП&nbsp;в&nbsp;основном оставались на&nbsp;лендинге.
            </p>
            <p>
              Мы&nbsp;хотели протестировать, сможет&nbsp;ли&nbsp;новый концепт формы
              сильнее вовлечь пользователя и&nbsp;поднять ключевые заявочные метрики относительно
              старой версии. При&nbsp;этом важно было сохранить фичи, которые уже&nbsp;работали,
              и&nbsp;собрать UI, который можно масштабировать на&nbsp;другие карточные продукты
              в&nbsp;вебе.
            </p>
          </CaseText>
          <CaseBanner>
            В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
          </CaseBanner>

          <CaseHeading id="solutions">Ключевые UX/UI‑решения</CaseHeading>
          <CaseSubheading id="design-select">1. Делаем акцент на селекте дизайна</CaseSubheading>
          <CaseText>
            <p>
              В новом концепте я сделала акцент на двух заметных факторах выбора — {' '}
              <span className="black-form-case__marker">
                дизайне карты и кэшбэке.
              </span>{' '}
              Поэтому первый шаг&nbsp;формы должен был&nbsp;помочь пользователю настроить карту
              под&nbsp;себя.
            </p>
            <p>
              Со&nbsp;старым селектом была проблема: он&nbsp;нормально вмещал меньше шести
              дизайнов.
            </p>
          </CaseText>
          <BlackFormImage
            name="04-design-select"
            alt="Старый селект дизайна карты не вмещал большое количество акционных дизайнов"
          />
          <CaseText>
            <p>
              И&nbsp;в&nbsp;целом превью были мелкими&nbsp;— сравнивать неудобно. Я&nbsp;переработала селект дизайна:
            </p>
          </CaseText>
          <BlackFormImage
            name="05-old-container"
            alt="Новый селект дизайна в старом контейнере формы"
          />
          
          <CaseText className="black-form-case__new-ui-note">
            <p>
              Затем перенесли в&nbsp;новый UI: выбранная карта переехала влево, а&nbsp;в&nbsp;форме
              появилось больше воздуха для&nbsp;настроек, кэшбэка и&nbsp;персональных данных.
            </p>
          </CaseText>
          
          <BlackFormImage
            name="08-new-ui-long"
            alt="Новый UI формы Black с настройками, кэшбэком и персональными данными"
          />
          <CaseText>
            <p>
              <span className="black-form-case__marker">
                До&nbsp;редизайна интерфейс просто скейлился
              </span>{' '}
              на&nbsp;адаптивах и&nbsp;не&nbsp;всегда выглядел аккуратно. Были "крайние" два&nbsp;состояния: десктоп и&nbsp;мобайл.
              Я&nbsp;проработала поведение на&nbsp;промежуточных брейкпойнтах у&nbsp;новых
              компонентов и&nbsp;провела дизайн‑код‑ревью:
            </p>
          </CaseText>
          <BlackFormImage name="09-breakpoints" alt="Промежуточные брейкпойнты формы Black" />

          <CaseSubheading id="inputs">2. Номер телефона узнаём сразу</CaseSubheading>
          <CaseText>
            <p>
              Обычно чем&nbsp;меньше форма
              выглядит, тем&nbsp;проще пользователю сделать первый клик и&nbsp;не&nbsp;пугаться
              длинного заполнения.
            </p>
            <p>
              Но&nbsp;если у формы не было персональных данных, то появлялся&nbsp;минус: пользователь настраивал карту, но&nbsp;не&nbsp;оставлял
              данные, по&nbsp;которым можно сохранить заявку.
            </p>
            <p>
              Поэтому в&nbsp;новом концепте оставили первый шаг&nbsp;визуально лёгким,
              но&nbsp;оставили ключевые инпуты. И&nbsp;
              <span className="black-form-case__marker">
                если в&nbsp;форме указали только телефон, это&nbsp;можно считать сохранённым началом оформления.
              </span>{' '}
              &rarr; И можно продолжить сценарий позже, не заставляя пользователя сразу заполнять длинную форму.
            </p>
          </CaseText>
          <BlackFormImage
            name="10-phone-first"
            alt="Первый шаг формы с номером телефона и короткой заявкой"
          />

          <CaseSubheading id="benefits-in-form">
            3. Показываем сменяемые УТП внутри формы
          </CaseSubheading>
          <BlackFormImage
            name="11-benefits-before"
            alt="Преимущества были только в верхней части страницы до формы"
          />
          <section className="case-block case-text case-text-list" data-reveal>
            <p>
              УТП карты&nbsp;переехали прямо в&nbsp;форму &rarr; они&nbsp;менялись
              в&nbsp;зависимости от&nbsp;этапа. Например, показывали так:
            </p>
            <ul>
              <li>комиссия 0% для переводов в СНГ — на этапе ввода данных для нерезидентов</li>
              <li>0 ₽ за доставку — на этапе ввода адреса</li>
              <li>выгодную ставку по накопительному счету показывали, пока данные грузятся</li>
            </ul>
            <p>
              Так мы экономили место и при этом{' '}
              <span className="black-form-case__marker">
                релевантно поддерживали мотивацию внутри заявки
              </span>
              .
            </p>
          </section>
          <BlackFormImage name="12-benefits-in-form" alt="Сменяемые УТП внутри формы Black" />

          <CaseSubheading id="new-ui">4. Новый UI и актуализация флоу</CaseSubheading>
          <CaseText>
            <p>
              Я&nbsp;актуализировала все&nbsp;макеты: шаги, состояния, ошибки, валидации, мобильные
              версии и&nbsp;служебные экраны.
            </p>
          </CaseText>
          <BlackFormImage
            name="13-flow-states"
            alt="Шаги, состояния, ошибки, валидации и служебные экраны формы Black"
          />
          <CaseText>
            <p>
              Отдельно доработала тексты ошибок. Они&nbsp;должны были не&nbsp;просто сообщать,
              что&nbsp;поле заполнено неправильно, а&nbsp;помогать исправить ошибку.
            </p>
          </CaseText>
          <BlackFormImage
            name="14-error-texts"
            alt="Тексты ошибок, которые помогают исправить поле"
          />

          <CaseSubheading id="cross-sell">5. Кроссейл</CaseSubheading>
          <CaseText>
            <p>
              Также я&nbsp;разрабатывала сценарии кроссейла.
            </p>
          </CaseText>
          <BlackFormImage
            name="15-cross-sell"
            alt="Идея кроссейла внутри сценария оформления карты Black"
          />

          <CaseHeading id="result">Результат</CaseHeading>
          <CaseText>
            <p>
              Мы оценивали новый концепт по&nbsp;ключевым этапам пользовательского пути и&nbsp;итоговому результату оформления.
            </p>
            <p>
              Новая версия показала статзначимый рост ключевых заявочных метрик.
            </p>
          </CaseText>
          <BlackFormImage
            name="16-result-growth"
            alt="Статзначимый рост в короткую заявку, полную заявку, утилизацию и aha‑момент"
          />
          <CaseBanner>
            CR — conversion rate, конверсия. aha‑момент — внутри определяемая метрика,
            по которой запечатлили момент, когда клиент понимает/осознает ценность продукта.
          </CaseBanner>
          <BlackFormImage
            name="full-form"
            alt="Форма тактильной карты с вариантом заказать звонок"
          />
          <BlackFormImage
            name="full-form-mob"
            alt="Форма тактильной карты с вариантом заказать звонок"
          />                    

          <CaseHeading id="postreview">Постревью</CaseHeading>
          <CaseSubheading>Масштабирование</CaseSubheading>
          <CaseText>
            <p>
              После запуска подход использовали и в других карточных сценариях. Например, часть принципов легла в основу формы детской карты Junior:
            </p>
          </CaseText>
          <BlackFormImage name="17-junior-scale" alt="Масштабирование формы на карту Джуниор" />
          <CaseText>
            <p>
              Над&nbsp;картой Джуниор я&nbsp;также&nbsp;детально работала&nbsp;— подробнее
              в&nbsp;кейсе{' '}
              <Link className="black-form-case__inline-link" to="/cases/junior">
                «Как&nbsp;оформление карты Junior стало&nbsp;семейным сценарием»
              </Link>
              .
            </p>
          </CaseText>
          <CaseSubheading>Перенос фичей</CaseSubheading>
          <CaseText>
            <p>
              После&nbsp;обновления UI было важно не&nbsp;потерять решения, которые команда
              уже&nbsp;тестировала раньше. Я&nbsp;переносила в&nbsp;новый флоу подбора кэшбэка,
              кросс‑сейла и&nbsp;другие элементы, которые показывали положительную динамику
              на&nbsp;ранних версиях формы.
            </p>
            <p>
              Задача была не&nbsp;просто «перетащить старое», а&nbsp;встроить эти&nbsp;фичи
              в&nbsp;новую логику формы,&nbsp;
              чтобы&nbsp;они&nbsp;выглядели частью сценария.
              Также я встроила сценарии для клиентов с повторными заявками&nbsp;— подробнее об&nbsp;этом
              в&nbsp;кейсе{' '}
              <Link className="black-form-case__inline-link" to="/cases/duplicates">
                Как&nbsp;UX‑решение сократило повторные заявки
              </Link>
              .
            </p>
          </CaseText>
          <BlackFormImage
            name="18-feature-transfer"
            alt="Перенос протестированных фичей в новый флоу формы Black"
          />

          <CaseHeading id="adaptations">Адаптация формы под разные сценарии</CaseHeading>
          <CaseText>
            <p>
              Помимо основного флоу, я&nbsp;прорабатывала адаптации для&nbsp;отдельных&nbsp;ЦА. Были
              негромкие изменения, но&nbsp;важные: форма должна работать понятно
              в&nbsp;чувствительных случаях.
            </p>
          </CaseText>
          <CaseSubheading>Локализации для нерезидентов</CaseSubheading>
          <CaseText>
            <p>
              Для&nbsp;нерезидентов 
              <span className="black-form-case__marker">
                переводила форму на&nbsp;5&nbsp;языков:
              </span>
              вместе
              с&nbsp;локализаторами проверяла не&nbsp;только смысл, но&nbsp;и&nbsp;то,
              как&nbsp;тексты работают в&nbsp;интерфейсе&nbsp;— длину строк, подписи, ошибки
              и&nbsp;кнопки.
            </p>
          </CaseText>
          <BlackFormImage name="19-localization" alt="Локализованная форма для нерезидентов" />
          <CaseSubheading>Отключение кэшбэка для исламской карты</CaseSubheading>
          <CaseText>
            <p>
              Для&nbsp;части аудитории использование кэшбэка может быть нежелательным
              по&nbsp;религиозным причинам. Поэтому в&nbsp;форме с&nbsp;исламской картой нужно было
              не&nbsp;просто показать стандартный выбор категорий, а&nbsp;дать понятный способ
              отключить кэшбэк и&nbsp;продолжить оформление без&nbsp;ощущения, что&nbsp;пользователь
              нарушает свои принципы.
            </p>
          </CaseText>
          <BlackFormImage name="20-islamic-card" alt="Отключение кэшбэка для исламской карты" />

          <CaseSubheading id="tactile">Тактильная карта для слабовидящих</CaseSubheading>
          <CaseText>
            <p>
              Для&nbsp;тактильной карты адаптировала страницу и&nbsp;форму под&nbsp;слабовидящих
              и&nbsp;незрячих пользователей. В&nbsp;сценарии появился вариант заказать звонок,
              чтобы&nbsp;упростить прохождение заявки тем, кому неудобно оформлять карту полностью
              в&nbsp;вебе. 3D и&nbsp;страницу собирала сама.
            </p>
          </CaseText>
          <BlackFormImage
            name="21-tactile"
            alt="Страница тактильной карты с вариантом заказать звонок"
          />
          <BlackFormImage
            name="22-tactile-form"
            alt="Форма тактильной карты с вариантом заказать звонок"
          />

          <CaseHeading id="reflection">Рефлексия</CaseHeading>
          <CaseText>
            <p>
              В&nbsp;этом проекте было сложно не&nbsp;столько нарисовать новую форму, сколько
              собрать старые тесты, новые гипотезы и&nbsp;ограничения продукта в&nbsp;один понятный
              флоу.
            </p>
            <p>
              Black часто становится первым знакомством клиента с&nbsp;Т‑Банком, поэтому
              ответственность чувствовалась сильнее обычного. Мне&nbsp;очень помогала плотная работа
              с&nbsp;продактом: мы&nbsp;вместе сверяли приоритеты и&nbsp;влияние решений
              на&nbsp;воронку.
            </p>
            <p>
              Для&nbsp;меня это&nbsp;кейс про&nbsp;продуктовый дизайн в&nbsp;действии: когда форма,
              инпуты и&nbsp;состояния напрямую влияют на&nbsp;конверсию и&nbsp;дальнейшее
              использование продукта.
            </p>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};
