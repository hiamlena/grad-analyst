const documents = ["ПЗЗ", "ГПЗУ", "ЕГРН", "ЗОУИТ", "Схема участка", "Топосъёмка", "СП", "СанПиН"];

const serviceCards = [
  {
    title: "Собирает исходные данные",
    text: "Кадастровый номер, адрес, площадь, размеры участка, подъезд и желаемый объект.",
  },
  {
    title: "Работает с документами",
    text: "На следующих этапах сервис будет извлекать текст из ПЗЗ, ГПЗУ, ЕГРН и других файлов.",
  },
  {
    title: "Готовит вывод",
    text: "Можно, нельзя, возможно при условиях или данных недостаточно — с рисками и рекомендациями.",
  },
];

const steps = [
  "Пользователь вводит участок и цель строительства.",
  "Загружает документы по участку.",
  "ИИ ищет релевантные фрагменты в документах.",
  "Сервис формирует предварительный отчёт и 2D-эскиз.",
];

const results = [
  "краткий вывод по участку",
  "проверка желаемого объекта",
  "риски и ограничения",
  "рекомендации",
  "список документов, которые нужно запросить",
  "предварительный 2D-эскиз размещения объекта",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="ГрадоАналитик">
            ГрадоАналитик
          </a>
          <nav className="nav" aria-label="Основная навигация">
            <a href="#service">О сервисе</a>
            <a href="#process">Как работает</a>
            <a href="#documents">Документы</a>
            <a href="#request">Заявка</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">MVP · Краснодарский край · предпроектная оценка</span>
            <h1>ИИ-анализ земельного участка перед строительством</h1>
            <p>
              Сервис помогает быстро понять, что можно разместить на участке, какие есть
              ограничения, какие документы нужны и какие риски стоит проверить до проекта.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#request">Оставить заявку</a>
              <a className="button secondary" href="#results">Что получит пользователь</a>
            </div>
          </div>

          <aside className="summary-card" aria-label="Пример результата анализа">
            <p className="card-label">Пример вывода</p>
            <h2>Возможно при условиях</h2>
            <ul>
              <li>Нужна проверка территориальной зоны.</li>
              <li>Требуется ГПЗУ и сведения о ЗОУИТ.</li>
              <li>Предварительно возможен объект малой коммерции.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="service" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Что делает сервис</span>
            <h2>Понятный предварительный анализ вместо хаоса в документах</h2>
          </div>
          <div className="cards-grid">
            {serviceCards.map((card) => (
              <article className="info-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section muted-section">
        <div className="container split-section">
          <div>
            <span className="eyebrow">Как это работает</span>
            <h2>Сначала MVP без лишней тяжёлой инфраструктуры</h2>
            <p className="section-text">
              На первом этапе не подключаем Росреестр, карту всего края и сложную GIS-систему.
              Пользователь сам вводит данные и загружает документы.
            </p>
          </div>
          <ol className="steps-list">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="documents" className="section">
        <div className="container">
          <div className="section-head narrow">
            <span className="eyebrow">Документы</span>
            <h2>Что пользователь сможет загрузить для анализа</h2>
            <p>
              Если нужных данных нет, сервис должен прямо писать: «Данных недостаточно» и
              перечислять, что нужно запросить.
            </p>
          </div>
          <div className="document-tags">
            {documents.map((document) => (
              <span key={document}>{document}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="section dark-section">
        <div className="container results-grid">
          <div>
            <span className="eyebrow light">Результат</span>
            <h2>Структурированный отчёт без юридических обещаний</h2>
            <p>
              Пользователь получает не фантазию «из головы», а предварительную аналитику с
              опорой на загруженные документы и найденные фрагменты.
            </p>
          </div>
          <div className="result-panel">
            {results.map((result) => (
              <div className="result-item" key={result}>✓ {result}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section warning-section">
        <div className="container warning-box">
          <span className="eyebrow">Юридическое ограничение</span>
          <h2>Это не официальное заключение</h2>
          <p>
            Сервис не является органом власти, ГПЗУ, разрешением на строительство, проектной
            документацией или юридическим заключением. Это предварительный аналитический
            помощник для предпроектной оценки участка.
          </p>
        </div>
      </section>

      <section id="request" className="section request-section">
        <div className="container request-grid">
          <div>
            <span className="eyebrow">Заявка</span>
            <h2>Оставьте данные участка для предварительной оценки</h2>
            <p>
              Сейчас это визуальный макет формы. На следующем этапе подключим сохранение заявки
              или отправку в Telegram/email.
            </p>
          </div>

          <form className="request-form">
            <label>
              Имя
              <input type="text" placeholder="Елена" />
            </label>
            <label>
              Телефон
              <input type="tel" placeholder="+7 900 000-00-00" />
            </label>
            <label>
              Кадастровый номер
              <input type="text" placeholder="23:00:0000000:000" />
            </label>
            <label>
              Адрес участка
              <input type="text" placeholder="Краснодарский край, ..." />
            </label>
            <label>
              Площадь участка
              <input type="text" placeholder="Например: 12 соток" />
            </label>
            <label>
              Что хотите построить
              <textarea placeholder="Например: магазин, склад, дом, автомойка" />
            </label>
            <button type="button">Оставить заявку</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <strong>ГрадоАналитик</strong>
          <span>© 2026 · MVP предпроектного анализа земельных участков</span>
        </div>
      </footer>
    </main>
  );
}
