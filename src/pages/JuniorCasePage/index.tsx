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
  CaseTextList,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './JuniorCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/junior');

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'client', title: 'Клиент' },
  { id: 'problem', title: 'Проблема' },
  { id: 'solutions', title: 'Решения' },
  { id: 'role-audience', title: '1. Разделение ЦА', level: 1 },
  { id: 'child-participation', title: '2. Участие ребенка', level: 1, desktopOnly: true },
  { id: 'phone-hints', title: '3. Подсказки', level: 1 },
  { id: 'cross-sell', title: '4. Кроссейл', level: 1 },
  { id: 'new-ui', title: '5. Новый UI', level: 1 },
  { id: 'role', title: 'Моя роль' },
  { id: 'result', title: 'Результат' },
  { id: 'reflection', title: 'Рефлексия' },
];

type JuniorImageProps = {
  name: string;
  alt: string;
  mobile?: boolean;
};

const JuniorImage = ({ name, alt, mobile = true }: JuniorImageProps) => (
  <CaseImage
    src={`${CASE_IMAGE_PATH}/${name}.jpg`}
    mobileSrc={mobile ? `${CASE_IMAGE_PATH}/${name}-mobile.jpg` : undefined}
    alt={alt}
  />
);

export const JuniorCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case junior-case">
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
            title="Как оформление карты Junior стало семейным сценарием"
            projectHref="https://www.tbank.ru/cards/debit-cards/tinkoff-black/junior/"
            projectLabel="tbank.ru/cards/junior"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.jpg`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover-bg-mobile.jpg`}
            stats={[
              {
                text: 'Ребёнок стал участником оформления: выбирает дизайн и передаёт заявку родителю',
              },
              {
                text: 'Серия UX‑тестов для одной ЦА: закрыла спорные места в семейном сценарии Junior',
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
              Junior — карта Т‑Банка для детей до 14 лет. Т‑Банк — онлайн‑банк. Сценарий оформления
              карты семейный. Карту хочет ребёнок, оформляет родитель, а онлайн‑форма должна быть
              понятной для обоих.
            </p>
            <p>
              Я работала над серией UX‑тестов вокруг Junior: разделила страницу по ролям «я родитель
              / я ребёнок», дала ребёнку возможность выбрать дизайн и передать оформление взрослому,
              проработала подсказки про номер телефона ребёнка и сценарии, где номера ещё нет.
            </p>
            <p>
              Это были разные тесты, но с одной целью: убрать трение в оформлении Junior и сделать
              путь понятнее для семьи без просадки основных продуктовых метрик.
            </p>
          </CaseText>
          <CaseBanner>
            В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.
          </CaseBanner>

          <CaseHeading
            id="client"
            actionHref="https://www.tbank.ru/cards/debit-cards/tinkoff-black/junior/"
            actionLabel="tbank.ru/cards/junior"
          >
            <span className="case-heading__desktop-title">Клиент и&nbsp;контекст</span>
            <span className="case-heading__mobile-title">Контекст</span>
          </CaseHeading>
          <CaseTextList
            intro="Junior — дебетовая карта Т‑Банка для детей до 14 лет. По смыслу она близка к взрослой дебетовой карте Black, но ребёнок не может оформить её сам: заявку заполняет родитель. И в этом главная особенность продукта: у него две аудитории:"
            items={[
              'родителю важны безопасность, контроль, финансовая грамотность, понятные условия и спокойное оформление',
              'ребёнку важны дизайн карты, ощущение самостоятельности, приложение, первые деньги и возможность сказать: «это моя карта»',
            ]}
            outro={(
              <>
                При этом страница и форма долго работали скорее как обычное банковское оформление
                для взрослого. А Junior так не работает. Здесь{' '}
                <span className="junior-case__marker">решение часто принимают двое</span>:
                ребёнок хочет карту, а родитель помогает довести оформление до конца.
              </>
            )}
          />
          <JuniorImage name="01-family-flow" alt="Ребёнок хочет карту, родитель оформляет" />

          <CaseHeading id="problem">Проблема и гипотезы</CaseHeading>
          <CaseTextList
            intro="На первый взгляд сценарий простой — берёшь и заказываешь карту на сайте. Но на деле было несколько мест, где пользователь мог застрять:"
            items={[
              'ребёнок может захотеть карту сам, но не может завершить оформление без родителя',
              'дизайн карты важен для ребёнка, но он его сам не выбирает',
              'родителю нужно заполнить данные и ребёнка, и свои данные в одной форме',
              'номер телефона ребёнка вызывал вопросы',
              'нет кроссейла, так как сама карта — это единственный основной детский продукт',
            ]}
            outro="Доводы выше собраны из общения с поддержкой + построены на UX‑экспертизе и собственных гипотезах."
          />
          <JuniorImage name="02-family-questions" alt="Вопросы родителей при оформлении Junior" />
          <CaseTextList
            intro="Поэтому я проверяла не одну большую фичу, а несколько гипотез вокруг одного семейного сценария:"
            items={[
              'если разделить страницу по ролям, ребёнок и родитель быстрее увидят релевантную для себя информацию',
              'если дать ребёнку выбрать дизайн и передать заявку взрослому, мы не оборвём его путь на моменте «позови родителя»',
              'если объяснить, зачем нужен номер ребёнка, у родителей будет меньше сомнений',
              'если предложить сим‑карту прямо в заявке, родителю не придётся уходить из сценария и искать, где взять симку ребёнку',
              'если кросс‑сейл встроить в правильный момент, он может быть полезным, а не просто лишним баннером',
            ]}
            outro="То есть это был не один баг и не одна кнопка. Это была серия мест, где семейный сценарий можно улучшить."
          />

          <CaseHeading id="solutions">Решения</CaseHeading>
          <CaseSubheading id="role-audience">1. Разделить страницу по ролям</CaseSubheading>
          <CaseText>
            <p>
              Я продумала реализацию страницы Junior в двух контекстах: «я родитель» и «я ребёнок».
              Точка входа оставалась единой, а детская страница не индексировалась —
              так мы не создавали SEO‑дубль. Вот как вышло (3D‑шки тоже делала я):
            </p>
          </CaseText>
          <JuniorImage name="03-role-pages" alt="Страницы Junior для родителя и ребёнка" />
          <CaseText>
            <p>
              Для родителя мы показываем пользу через безопасность, контроль, финансовую
              грамотность. Для ребёнка — через дизайн, самостоятельность, приложение и ощущение,
              что карта действительно его.
            </p>
          </CaseText>
          <JuniorImage name="04-role-utp" alt="УТП Junior для родителя и ребёнка" />
          <CaseText>
            <p>
              Так страница стала говорить с двумя аудиториями по‑разному, но в рамках одного
              продуктового сценария.
            </p>
          </CaseText>
          <JuniorImage name="05-role-result" alt="A/B‑тест без негативного влияния на метрики" />
          <CaseBanner>В кейсе показаны публичные интерфейсы и обобщённое описание моей роли. Точные метрики, внутренние данные и детали эксперимента не раскрываются.</CaseBanner>

          <div className="junior-case__desktop-only">
            <CaseSubheading id="child-participation">
              2. Дать ребёнку выбрать дизайн и передать оформление родителю
            </CaseSubheading>
            <CaseText>
              <p>
                Дизайн карты — один из сильных мотивов в выборе карт. И для ребёнка это не просто
                визуальная деталь, а <span className="junior-case__marker">причина захотеть именно эту карту.</span>
              </p>
              <p>
                Но оформить карту сам ребёнок не может, поэтому я спроектировала сценарий,
                где он делает свою часть: выбирает дизайн и отправляет ссылку взрослому, а родитель
                завершает заявку.
              </p>
            </CaseText>
            <JuniorImage
              name="06-design-share"
              alt="Выбор дизайна и передача ссылки родителю"
              mobile={false}
            />
            <CaseText>
              <p>
                Кнопка «Скопировать ссылку» здесь была не отдельной фичей, а инструментом
                для сценария — сохранить участие ребёнка там, где нужен родитель.
              </p>
              <p>
                Помимо дизайна, я самостоятельно реализовала кнопку копирования ссылки для экспериментальной версии. Это позволило быстрее подготовить сценарий к тестированию вместе с командой.
              </p>
            </CaseText>
            <JuniorImage
              name="07-design-result"
              alt="A/B‑тест отправки ссылки родителю"
              mobile={false}
            />
          </div>

          <CaseSubheading id="phone-hints">
            3. Объяснить, зачем нужен номер телефона ребёнка
          </CaseSubheading>
          <CaseText>
            <p>
              В форме Junior есть данные ребёнка и родителя. А номер телефона ребёнка — обязательное
              поле. Для родителя иногда это может быть странно: «Я уже указал свой номер, зачем ещё номер
              ребёнка?»
            </p>
            <p>
              Может быть, кто‑то может попробовать ввести один и тот же родительский номер в оба поля, а есть риск, что кто‑то остановится,
              потому что у ребёнка ещё нет своей сим‑карты.
            </p>
            <p>
              Мы добавили подсказку прямо в форме:
            </p>
          </CaseText>
          <JuniorImage name="08-phone-hint" alt="Подсказка, зачем нужен номер телефона ребёнка" />
          <CaseText>
            <p>
              Решение простое, почти в лоб, но именно в таких местах оно работает для быстрого
              теста: не заставлять человека догадываться, а объяснить причину там, где появился
              вопрос, и проверить, заметят ли решение → а нагрузка на поддержку
              может уменьшиться.
            </p>
          </CaseText>
          <div className="junior-case__desktop-only">
            <JuniorImage
              name="09-phone-result"
              alt="A/B‑тест подсказки про телефон ребёнка"
              mobile={false}
            />
          </div>

          <CaseSubheading id="cross-sell">
            4. Закрыть сценарий, если сим‑карты у ребёнка нет
          </CaseSubheading>
          <CaseText>
            <p>
              Ещё один частый случай: не у каждого ребенка есть своя симка. Если в этот момент просто
              требовать номер, родитель может уйти из формы и не вернуться.
            </p>
            <p>
              Для родителя нужно решить проблему в моменте: нужен номер ребёнка — вот он.
            </p>
            <p>
              Для бизнеса это может стать <span className="junior-case__marker">кросс‑сейлом</span>,
              который появляется не сам по себе, а в релевантном месте.
            </p>
          </CaseText>
          <JuniorImage
            name="10-sim-card"
            alt="Предложение сим‑карты в сценарии оформления Junior"
          />

          <CaseSubheading id="new-ui">
            5. Стабилизировать повторные заявки для Junior и обновить UI
          </CaseSubheading>
          <CaseText>
            <p>
              Отдельно мы адаптировали уже запущенный сценарий работы с повторными заявками,{' '}
              <Link className="junior-case__inline-link" to="/cases/duplicates">
                описанный в отдельном кейсе
              </Link>
              . Также обновили UI формы —{' '}
              <Link className="junior-case__inline-link" to="/cases/black">
                детали в этом кейсе.
              </Link>
            </p>
            <p>
              Здесь это не главный фокус, но важная часть системы: если пользователь уже есть в базе
              или приходит повторно, продукт должен корректно определить его статус и не вести
              по лишним шагам.
            </p>
            <p>Так Junior стал частью общей логики, а не отдельным исключением.</p>
          </CaseText>
          <JuniorImage name="11-junior-ui" alt="Обновленный UI формы Junior" />

          <CaseHeading id="role">Моя роль</CaseHeading>
          <CaseTextList
            intro="В рамках проекта я:"
            items={[
              'разобрала оформление Junior как семейный сценарий, а не просто форму заявки',
              'работала над делением страницы по ролям «родитель» и «ребёнок» → спроектировала общий путь оформления для ролей',
              'писала тексты и подсказки, которые объясняют логику в моменте',
              'участвовала в тестах сим‑карты и дополнительных предложений для родителя',
              'реализовала кнопку копирования ссылки, чтобы быстрее проверить сценарий',
            ]}
            outro="Особое внимание я уделяла тому, чтобы продукт не говорил с семьёй как с одним абстрактным пользователем. У ребёнка и родителя разные мотивы, разные вопросы и разная роль в оформлении — и это должно быть видно в интерфейсе."
          />
          <div className="junior-case__desktop-only">
            <JuniorImage
              name="12-role-summary"
              alt="Иллюстрация роли дизайнера в семейном сценарии Junior"
              mobile={false}
            />
          </div>

          <CaseHeading id="result">Результат</CaseHeading>
          <CaseTextList
            intro={(
              <>
                После тестирования решения вошли в продукт и дополнили основной сценарий оформления Junior. Подробнее о каждом из них рассказано выше. При этом у продукта появились дополнительные полезные
                действия:
              </>
            )}
            items={[
              'ребёнок мог выбрать дизайн и передать заявку родителю',
              'родитель лучше понимал, зачем нужен номер ребёнка',
              'сценарий с отсутствующей сим‑картой получил решение прямо внутри формы',
              'логика повторных заявок стала стабильнее и для Junior.',
            ]}
            outro={
              <>
                В результате путь стал ближе к реальной семейной ситуации: ребёнок участвует в выборе, родитель понимает дальнейшие действия, а продукт не теряет контекст между ними.
              </>
            }
          />

          <CaseHeading id="reflection">Что было важным в этом проекте</CaseHeading>
          <CaseText>
            <p>
              Для меня этот кейс — про то, что продуктовый дизайн начинается не с кнопки,
              а с понимания сценария.
            </p>
            <p>
              Junior — не просто детская карта. Это <span className="junior-case__marker">продукт для семьи</span>:
              ребёнок хочет карту, родитель оформляет, банк должен объяснить правила
              и не потерять никого на полпути.
            </p>
            <p>
              Мне было важно дать ребёнку участвовать там, где он может, и помочь родителю там,
              где без него нельзя. И классно, когда несколько простых решений собираются
              в нормальный человеческий сценарий.
            </p>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};
