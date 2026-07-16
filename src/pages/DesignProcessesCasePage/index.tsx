import { useRef } from 'react';
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
import './DesignProcessesCasePage.css';

const CASE_IMAGE_PATH = publicPath('/images/cases/design-processes');

const CASE_SECTIONS = [
  { id: 'brief', title: 'Кратко' },
  { id: 'context', title: 'Контекст' },
  { id: 'problem', title: 'Проблема' },
  { id: 'actions', title: 'Решения' },
  { id: 'role', title: 'Моя роль' },
  { id: 'result', title: 'Результат' },
  { id: 'reflection', title: 'Рефлексия' },
];

type DesignProcessesImageProps = {
  name: string;
  alt: string;
  extension?: 'jpg' | 'png';
};

const DesignProcessesImage = ({ name, alt, extension = 'jpg' }: DesignProcessesImageProps) => (
  <CaseImage src={`${CASE_IMAGE_PATH}/${name}.${extension}`} alt={alt} />
);

export const DesignProcessesCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case visuals-ai-case design-processes-case">
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
            title="Как я выстроила дизайн‑процессы для большого B2B‑веба"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.jpg`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover-bg.jpg`}
            stats={[
              {
                text: 'Lead time плановых задач заметно снизился, а прохождение дизайн-этапа стало предсказуемее',
              },
              {
                text: 'Редизайн и дизайн‑регресс стали управляемым процессом, а не набором разрозненных правок',
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
              Я была дизайн‑лидом B2B веб‑привлечения в Т‑Банке. Вместе с проджект‑менеджером
              я систематизировала процесс на этапе дизайна: правила работы, старт задач,
              коммуникацию с заказчиками и дизайн‑регресс.
            </p>
            <p>За полгода lead time на этапе дизайна снизился:</p>
          </CaseText>
          <DesignProcessesImage
            name="new"
            extension="png"
            alt="Изменение lead time на этапе дизайна за полгода"
          />
          <CaseBanner>
            В кейсе используются обобщённые схемы процессов и реконструированные примеры материалов. Реальные рабочие доски, документы, названия задач, сведения о сотрудниках и точные внутренние показатели не раскрываются.
          </CaseBanner>

          <CaseHeading id="context">Контекст</CaseHeading>
          <CaseText>
            <p>
              Т‑Банк — онлайн‑банк для частных клиентов и бизнеса. Я лидила дизайн‑команду
              в B2B‑контуре веб‑привлечения: мы работали со страницами, формами, SEO,
              редизайнами, 3D‑графикой и срочными задачами на проде.
            </p>
            <p>
              В процесс были вовлечены продукт, маркетинг, редакция, SEO, разработка, Бренд,
              3D и подрядчики. Без прозрачных правил команда быстро теряла время на уточнения,
              согласования и ручное сопровождение задач.
            </p>
          </CaseText>
          <DesignProcessesImage
            name="card-01-context"
            alt="Контекст B2B‑команды веб‑привлечения и зона ответственности"
          />

          <CaseHeading id="problem">Проблема и подход</CaseHeading>
          <CaseText>
            <p>
              Из-за большого количества заказчиков и параллельных потоков значительная часть процесса зависела от ручных коммуникаций. Вводные приходили в разном формате, а часть правил не была зафиксирована единообразно. Кроме продуктовых задач, команде нужно было системно работать с накопленным UX-долгом.
            </p>
            <p>
              Я решила улучшать не только интерфейсы, но и систему вокруг них: сделать процесс
              прозрачнее, снизить зависимость от ручных объяснений и превратить дизайн‑регресс
              в управляемый бэклог совместно с проджектом.
            </p>
          </CaseText>
          <DesignProcessesImage
            name="card-02-problem"
            alt="Схема проблем процесса и перехода к систематизации"
          />

          <CaseHeading id="actions">Что я сделала</CaseHeading>

          <CaseSubheading id="process">1. Настроила процесс работы с задачами</CaseSubheading>
          <CaseText>
            <p>
              Вместе с проджект-менеджером и delivery-специалистами мы описали единые правила прохождения дизайн-этапа: состояния задач, принципы приоритизации, ограничения незавершённой работы и условия перехода между этапами.
            </p>
            <p>
              Для крупных задач мы готовили шаблон таймлайна, чтобы оценивать сроки точнее.
              Задачи стали проходить дизайн предсказуемее, а нагрузка стала понятнее.
            </p>
          </CaseText>
          <DesignProcessesImage
            name="card-03-process"
            alt="Систематизация работы с задачами и wiki‑процесс"
          />

          <CaseSubheading id="start">2. Упростила старт задач</CaseSubheading>
          <CaseText>
            <p>
              Я переработала FAQ по дизайн‑этапу: сделала инструкции понятнее для заказчиков.
              Отдельно собрала Figma‑пространство для подрядчиков и файлы‑помощники для других
              команд.
            </p>
            <p>
              Стало меньше ручных объяснений, а участники быстрее понимали процесс.
            </p>
          </CaseText>
          <DesignProcessesImage
            name="card-04-start"
            alt="Материалы для старта задач и пространство для подрядчиков"
          />

          <CaseSubheading id="team">3. Развивала команду</CaseSubheading>
          <CaseText>
            <p>
              Под моим руководством за полгода 2 дизайнера прошли грейдап, ещё 1 готовился
              к следующему уровню. Я помогала с менторством, аттестациями, сбором кейсов
              и самопрезентацией.
            </p>
            <p>
              Также я набирала участника на летнюю стажировку, а после забрала стажёра
              в свою команду. Поддерживала команду в публичных выступлениях: один из дизайнеров
              презентовал результаты редизайна SME на общебанковском демо, другой рассказывал
              про миграцию Росбанка.
            </p>
          </CaseText>
          <DesignProcessesImage
            name="card-05-team"
            alt="Развитие команды и публичные результаты дизайнеров"
          />

          <CaseSubheading id="sync">4. Синхронизировала процесс с маркетингом и редакцией</CaseSubheading>
          <CaseText>
            <p>
              С шеф‑редактором я провела синк для маркетинга: объяснила, как устроен
              дизайн‑процесс, где теряется время и почему важны полные вводные.
            </p>
            <p>
              С редакцией мы отдельно разобрали работу с текстами и ввели раннюю проверку
              копирайта — я назначила дежурных дизайнеров для регулярных проверок. Спорные
              места стали всплывать раньше, а не на поздних этапах, когда правки дороже.
            </p>
          </CaseText>

          <CaseSubheading id="regress">5. Систематизировала редизайн и дизайн‑регресс</CaseSubheading>
          <CaseText>
            <p>
              Я с командой провела аудит страниц и собрала таблицу со статусами: что уже
              соответствует гайдам, что нужно обновить и что важнее брать в работу.
            </p>
            <p>
              Также дизайнер моей команды глобально ревьюила формы и все страницы:
              UX‑паттерны, лигалы, плейсхолдеры, тексты и result‑экраны. Редизайн
              и дизайн‑регресс стали управляемым бэклогом, а не набором комментариев.
              Такие улучшения мы отражали в Jira, а не тихо делали в параллель основным задачам.
            </p>
          </CaseText>

          <CaseHeading id="role">Моя роль</CaseHeading>
          <CaseText>
            <p>
              Я отвечала за дизайн‑лидерство в команде: процессы, приоритизацию, ревью, доки,
              дизайн‑бэклог, коммуникацию со смежными командами и развитие дизайнеров.
            </p>
            <p>
              В моей зоне были не только макеты, но и система вокруг них: регламенты,
              Figma‑зона для подрядчиков, синки с маркетингом, редакцией, SEO, Брендом
              и 3D, а также поддержка команды в грейдапах, демо и аттестациях.
            </p>
            <p>
              Параллельно я оставалась hands‑on дизайнером: работала с UX форм и страниц,
              подключалась к спецпроектам, промостраницам, SEO‑страницам и инициативам
              вроде воркшопов по AI‑инструментам.
            </p>
          </CaseText>

          <CaseHeading id="result">Результат</CaseHeading>
          <CaseTextListLike>
            <p>Изменился сам процесс:</p>
            <ul>
              <li>стало меньше ручных объяснений и повторяющихся пингов;</li>
              <li>заказчикам и подрядчикам стало проще стартовать;</li>
              <li>дизайн‑регресс и редизайн страниц стали системными и учитывались в Jira;</li>
              <li>команда стала лучше защищать качество форм, текстов и UX‑паттернов.</li>
            </ul>
            <p>Lead time плановых задач заметно снизился, а прохождение дизайн-этапа стало предсказуемее.</p>
          </CaseTextListLike>
          <DesignProcessesImage
            name="card-06-result"
            alt="Финальные метрики по lead time после изменений процесса"
          />
          <CaseTextListLike>
            <p>А еще:</p>
            <ul>
              <li>2 моих дизайнера прошли грейдап, ещё 1 готовился к следующему уровню;</li>
              <li>команда выступала на общебанковском демо;</li>
              <li>процессы с маркетингом, редакцией, SEO и подрядчиками стали прозрачнее.</li>
            </ul>
          </CaseTextListLike>

          <CaseHeading id="reflection">Рефлексия</CaseHeading>
          <CaseText>
            <p>
              Для меня этот кейс не только про скорость. Он про то, как дизайн может влиять
              на систему работы вокруг продукта, и про то, как я, будучи лидом, могла работать
              в плотной ежедневной связке с проджект‑специалистами и впитывать их опыт.
            </p>
            <p>
              Я не просто улучшала макеты, а помогала команде меньше терять время, раньше
              замечать проблемы и доводить решения до продакшена в сложном потоке задач.
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

export default DesignProcessesCasePage;
