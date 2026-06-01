const stats = [
  { label: "Участков", value: "0", note: "можно создать первый" },
  { label: "Активный ПЗЗ", value: "нет", note: "загрузить редакцию" },
  { label: "Документов", value: "0", note: "ожидают загрузки" },
  { label: "Отчётов", value: "0", note: "история будет здесь" },
];

const currentFeatures = [
  "готов интерфейс закрытого кабинета",
  "показана логика участков и документов",
  "показана версия ПЗЗ: архив / активная редакция",
  "показана структура отчёта и 2D-эскиза",
];

const nextFeatures = [
  "авторизация для одного пользователя",
  "реальная загрузка PDF/DOCX/JPG/PNG",
  "извлечение текста из документов",
  "ИИ-анализ по активным источникам",
  "сохранение отчётов и истории анализов",
];

const plotFields = ["Кадастровый номер", "Адрес", "Площадь", "Размеры участка", "Сторона подъезда", "Что планируется построить"];

const plotDocs = [
  { name: "ГПЗУ", status: "не загружен", action: "Макет загрузки" },
  { name: "Выписка ЕГРН", status: "не загружена", action: "Макет загрузки" },
  { name: "Сведения о ЗОУИТ", status: "не загружены", action: "Макет загрузки" },
  { name: "Схема участка", status: "не загружена", action: "Макет загрузки" },
  { name: "Топосъёмка", status: "не загружена", action: "Макет загрузки" },
];

const normDocs = [
  { name: "ПЗЗ", version: "редакция не выбрана", state: "требуется загрузка" },
  { name: "Градостроительный регламент", version: "нет активной версии", state: "требуется загрузка" },
  { name: "Карта зонирования", version: "нет файла", state: "желательно загрузить" },
  { name: "Местные нормативы", version: "нет файла", state: "по необходимости" },
  { name: "СП / СанПиН", version: "нет набора", state: "по необходимости" },
];

const activeSources = [
  "Активный ПЗЗ или градостроительный регламент",
  "ГПЗУ по конкретному участку",
  "Выписка ЕГРН",
  "Сведения о ЗОУИТ, если есть",
  "Схема участка или топосъёмка",
];

const reportItems = [
  "краткий вывод: можно / нельзя / возможно при условиях / данных недостаточно",
  "территориальная зона и ВРИ",
  "параметры застройки и ограничения",
  "риски и рекомендации",
  "что запросить дальше",
  "источники и фрагменты документов",
  "предварительный 2D-эскиз размещения",
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
            <a href="#workspace">Кабинет</a>
            <a href="#roadmap">Этапы</a>
            <a href="#documents">Документы</a>
            <a href="#analysis">Анализ</a>
            <a href="#reports">Отчёты</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Закрытый кабинет · один пользователь · MVP-прототип</span>
            <h1>Закрытый кабинет для предпроектного анализа участков</h1>
            <p>
              Рабочий инструмент для одного заказчика: создание участков, загрузка документов,
              хранение версий ПЗЗ, запуск предварительного анализа и сохранение отчётов.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#analysis">Новый анализ участка</a>
              <a className="button secondary" href="#roadmap">Что уже готово</a>
            </div>
          </div>

          <aside className="summary-card dashboard-card" aria-label="Статус рабочего кабинета">
            <p className="card-label">Статус кабинета</p>
            <h2>MVP-прототип</h2>
            <div className="status-list">
              {stats.map((item) => (
                <div className="status-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <small>{item.note}</small>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="workspace" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Рабочая панель</span>
            <h2>Не лендинг, а кабинет для постоянной работы</h2>
            <p>
              Здесь заказчик ведёт участки, обновляет документы и запускает анализ по актуальным
              источникам. Публичная версия используется только как прототип интерфейса.
            </p>
          </div>

          <div className="cards-grid workspace-grid">
            <article className="info-card feature-card">
              <h3>Участки</h3>
              <p>Карточки земельных участков с кадастровым номером, адресом, площадью и целью строительства.</p>
            </article>
            <article className="info-card feature-card">
              <h3>Документы</h3>
              <p>ПЗЗ, ГПЗУ, ЕГРН, ЗОУИТ, схемы и топосъёмка с загрузкой новых версий.</p>
            </article>
            <article className="info-card feature-card">
              <h3>Отчёты</h3>
              <p>История предварительных выводов, рисков, рекомендаций, источников и 2D-эскизов.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="roadmap" className="section muted-section">
        <div className="container two-columns">
          <div className="table-card stage-card">
            <span className="eyebrow">Текущая версия</span>
            <h2>Что уже показано в прототипе</h2>
            <div className="result-panel light-panel">
              {currentFeatures.map((feature) => (
                <div className="result-item" key={feature}>✓ {feature}</div>
              ))}
            </div>
          </div>

          <div className="table-card stage-card accent-stage">
            <span className="eyebrow">Следующий этап</span>
            <h2>Что подключается после согласования</h2>
            <div className="result-panel light-panel">
              {nextFeatures.map((feature) => (
                <div className="result-item" key={feature}>→ {feature}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="analysis" className="section">
        <div className="container app-grid">
          <div>
            <span className="eyebrow">Новый анализ</span>
            <h2>Карточка участка</h2>
            <p className="section-text">
              Первый рабочий сценарий: ввести участок, выбрать режим анализа, подключить активные документы и запустить проверку.
            </p>
          </div>

          <form className="request-form app-form">
            {plotFields.map((field) => (
              <label key={field}>
                {field}
                <input type="text" placeholder={field === "Кадастровый номер" ? "23:00:0000000:000" : "Заполнить"} />
              </label>
            ))}
            <label>
              Режим анализа
              <select defaultValue="object">
                <option value="object">Я знаю, что хочу построить</option>
                <option value="best">Подобрать лучший вариант</option>
              </select>
            </label>
            <button type="button">Запустить предварительный анализ</button>
            <small className="form-note">Пока кнопка показывает будущий сценарий. Реальный запуск анализа подключается на backend-этапе.</small>
          </form>
        </div>
      </section>

      <section id="documents" className="section muted-section">
        <div className="container">
          <div className="section-head narrow">
            <span className="eyebrow">Библиотека документов</span>
            <h2>Документы можно обновлять постоянно</h2>
            <p>
              Если ПЗЗ обновился — загружается новая версия. Старая остаётся в архиве, а для следующего анализа используется активная редакция.
            </p>
          </div>

          <div className="two-columns">
            <div className="table-card">
              <h3>Документы участка</h3>
              {plotDocs.map((doc) => (
                <div className="doc-row" key={doc.name}>
                  <div>
                    <strong>{doc.name}</strong>
                    <span>{doc.status}</span>
                  </div>
                  <button type="button" className="mock-button">{doc.action}</button>
                </div>
              ))}
            </div>

            <div className="table-card">
              <h3>Нормативная база</h3>
              {normDocs.map((doc) => (
                <div className="doc-row" key={doc.name}>
                  <div>
                    <strong>{doc.name}</strong>
                    <span>{doc.version}</span>
                  </div>
                  <small>{doc.state}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="version-card">
            <div>
              <span className="eyebrow">Версии</span>
              <h3>Пример логики для ПЗЗ</h3>
              <p>ПЗЗ редакция 2025 — архив · ПЗЗ редакция 2026 — активная · следующий анализ берёт только активную версию.</p>
            </div>
            <button type="button" className="mock-button">Макет добавления новой версии</button>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container results-grid">
          <div>
            <span className="eyebrow light">Активные источники</span>
            <h2>ИИ анализирует не «из головы», а по выбранным документам</h2>
            <p>
              Перед запуском система собирает активные источники. Если нужного документа нет, отчёт обязан написать: данных недостаточно.
            </p>
          </div>
          <div className="result-panel">
            {activeSources.map((source) => (
              <div className="result-item" key={source}>✓ {source}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="reports" className="section">
        <div className="container report-layout">
          <div>
            <span className="eyebrow">Отчёт</span>
            <h2>Что получит единственный пользователь</h2>
            <div className="result-panel light-panel">
              {reportItems.map((item) => (
                <div className="result-item" key={item}>✓ {item}</div>
              ))}
            </div>
          </div>

          <div className="sketch-card">
            <h3>Предварительный 2D-эскиз</h3>
            <div className="plot-sketch">
              <span className="plot-label">участок</span>
              <div className="building">объект</div>
              <div className="parking">парковка</div>
              <div className="entry">въезд</div>
            </div>
            <p>Пока это визуальная заглушка. Позже схема будет строиться из layout_json.</p>
          </div>
        </div>
      </section>

      <section className="section warning-section">
        <div className="container warning-box">
          <span className="eyebrow">Ограничение публичного прототипа</span>
          <h2>Не загружать реальные документы в публичную MVP-страницу</h2>
          <p>
            GitHub Pages используется только для показа интерфейса. Для настоящих ГПЗУ, ЕГРН и ПЗЗ нужен закрытый сервер, авторизация и backend-хранилище.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <strong>ГрадоАналитик</strong>
          <span>© 2026 · закрытый MVP для одного пользователя</span>
        </div>
      </footer>
    </main>
  );
}
