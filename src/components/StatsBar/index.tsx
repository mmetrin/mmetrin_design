import './StatsBar.css';

const STATS = [
  { title: 'Программист', description: 'IT‑образование с отличием, использую AI‑инструменты' },
  { title: 'Художник', description: '8 лет худ. школы с отличием и есть насмотренность' },
  { title: 'Много отзывов', description: 'от коллег, заказчиков, и руководителей' },
  { title: '6 лет разного опыта', description: 'продукт (лид в Т‑Банке), стартап, фриланс, консалтинг' },
];

const StatCell = ({ title, description }: { title: string; description: string }) => (
  <div className="stats-bar__cell">
    <div className="stats-bar__icon">
      <div className="stats-bar__icon-shape" />
    </div>
    <div className="stats-bar__text">
      <span className="stats-bar__title">{title}</span>
      <span className="stats-bar__description">{description}</span>
    </div>
  </div>
);

export const StatsBar = () => (
  <div className="stats-bar">
    <div className="stats-bar__inner">
      {STATS.map(({ title, description }) => (
        <StatCell key={title} title={title} description={description} />
      ))}
    </div>
  </div>
);
