import { useRef } from 'react';
import {
  CaseCover,
  CaseHeading,
  CaseSidebar,
  CaseText,
} from '../../components/CaseStudy';
import { CaseOutroSection } from '../../components/CaseOutroSection';
import { PortfolioReturnButton } from '../../components/PortfolioReturnButton';
import { useHeroBackgroundParallax, useReveal } from '../../hooks';
import { publicPath } from '../../utils/publicPath';
import './MashaSecretaryCasePage.css';

const CASE_SECTIONS = [
  { id: 'about', title: 'О проекте' },
  { id: 'context', title: 'Контекст' },
  { id: 'problem', title: 'Проблема' },
  { id: 'hypothesis', title: 'Проверка гипотезы' },
  { id: 'work', title: 'Что я делала' },
  { id: 'solution', title: 'Решение' },
  { id: 'result', title: 'Результат этапа' },
];

const CASE_IMAGE_PATH = publicPath('/images/cases/masha-secretary');

type ExternalPillProps = {
  href: string;
  children: string;
};

const ExternalPill = ({ href, children }: ExternalPillProps) => (
  <a className="case-cover__pill" href={href} target="_blank" rel="noreferrer">
    <span>{children}</span>
  </a>
);

export const MashaSecretaryCasePage = () => {
  const bgImgRef = useRef<HTMLImageElement>(null);

  useReveal();

  useHeroBackgroundParallax(bgImgRef);

  return (
    <article className="duplicate-applications-case masha-secretary-case">
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
            title="Телефонный секретарь Маша"
            backgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            mobileBackgroundSrc={`${CASE_IMAGE_PATH}/cover.png`}
            stats={[
              {
                text: 'Спроектировала веб‑версию личного кабинета, чтобы сервис мог работать не только через Telegram‑бота',
              },
              {
                text: 'Перенесла ключевую логику бота в понятную структуру: онбординг, настройки, историю звонков и каналы уведомлений',
              },
            ]}
          />
        </div>
      </div>

      <div className="case-study-layout">
        <CaseSidebar items={CASE_SECTIONS} />
        <div className="case-study-content">
          <CaseHeading id="about">О проекте</CaseHeading>
          <CaseText>
            <p>
              Маша Секретарь — сервис телефонного секретаря, который отвечает на звонки
              с незнакомых номеров вместо пользователя, общается с собеседником и отправляет
              владельцу расшифровку звонка в тексте.
            </p>
            <ExternalPill href="https://www.figma.com/design/0xhPUy0DmW3bEpLuSwQKuQ/Masha-Secretary-%7C-work-by--mmetrin?node-id=0-1&t=DidDr2d60uaMIUNd-1">
              Исходные макеты в Figma
            </ExternalPill>
          </CaseText>

          <CaseHeading id="context">Контекст</CaseHeading>
          <CaseText>
            <p>
              Изначально сервис работал через Telegram‑бота. В нём уже были основные функции:
              расшифровки звонков, история обращений, чёрные и белые списки, определитель
              номера, настройки обработки входящих и уведомления.
            </p>
            <p>
              Лендинг у сервиса уже существовал — моей задачей была не его доработка,
              а проектирование веб‑версии личного кабинета, куда нужно было перенести ключевую
              логику и сценарии из бота.
            </p>
          </CaseText>

          <CaseHeading id="problem">Проблема</CaseHeading>
          <CaseText>
            <p>
              После запуска рекламных кампаний стало видно, что часть пользователей отваливается
              ещё до подключения. Одна из причин — не все пользуются Telegram или хотят
              настраивать сервис через бот.
            </p>
            <p>
              Получалось, что продукт решает понятную задачу, но точка входа ограничивает
              аудиторию. Чтобы масштабировать сервис, нужно было вынести настройку и управление
              в веб: сделать личный кабинет, где пользователь сможет подключить сервис,
              настроить сценарии звонков и выбрать удобный канал уведомлений.
            </p>
          </CaseText>

          <CaseHeading id="hypothesis">Проверка гипотезы</CaseHeading>
          <CaseText>
            <p>Команда проверила интерес к разным способам подключения через рекламную кампанию:</p>
            <p>
              — «Подключить в Telegram» — 100 кликов
              <br />
              — «Подключить в WhatsApp» — 300 кликов
              <br />
              — «Подключить на сайте» — 250 кликов
            </p>
            <p>
              Даже при том, что сервис был описан как Telegram‑бот, пользователи чаще выбирали
              альтернативные способы подключения. Это подтвердило, что веб‑сценарий нужен
              не как дополнительная витрина, а как полноценная точка входа в продукт.
            </p>
          </CaseText>

          <CaseHeading id="work">Что я делала</CaseHeading>
          <CaseText>
            <p>
              Я вникла в существующую логику Telegram‑бота и перенесла её в структуру
              веб‑версии. Нужно было не просто разложить функции по экранам, а понять, как сервис
              работает внутри: какие настройки доступны пользователю, как обрабатываются звонки,
              где хранятся расшифровки, как работают списки контактов и какие сценарии
              подключения могут быть у разных людей.
            </p>
            <p>
              На основе этой логики я спроектировала большую часть личного кабинета: онбординг,
              настройки сервиса, управление каналами уведомлений, историю звонков, расшифровки,
              списки абонентов и другие ключевые разделы.
            </p>
          </CaseText>

          <CaseHeading id="solution">Решение</CaseHeading>
          <CaseText>
            <p>
              Веб‑версия должна была снять зависимость от Telegram на первых шагах. Пользователь
              мог начать настройку на сайте, пройти понятный онбординг, а уже после этого
              выбрать, где ему удобнее получать уведомления: в Telegram, WhatsApp, на электронную
              почту или в CRM.
            </p>
            <p>
              Личный кабинет при этом становился не просто альтернативой боту, а основным местом
              управления сервисом: с историей звонков, расшифровками, настройками и постепенным
              переносом всех функций в веб.
            </p>
          </CaseText>

          <CaseHeading id="result">Результат этапа</CaseHeading>
          <CaseText>
            <p>
              Я спроектировала полноценную веб‑структуру личного кабинета и помогла команде
              проверить, как сервис может работать за пределами Telegram‑бота. Это дало основу
              для тестирования веб‑онбординга, новых сценариев подключения и дальнейшего развития
              онлайн‑версии продукта.
            </p>
          </CaseText>
        </div>
      </div>

      <CaseOutroSection />
      <PortfolioReturnButton visibleAfterPx={2000} />
    </article>
  );
};

export default MashaSecretaryCasePage;
