"use client";

import { FormEvent, useState } from "react";

const demoLogin = "demo";
const demoPassword = "demo123";

const steps = [
  {
    title: "Участок",
    text: "Кадастровый номер, адрес, площадь и цель строительства.",
  },
  {
    title: "Документы",
    text: "ПЗЗ, ГПЗУ, ЕГРН, ЗОУИТ, схема участка и топосъёмка.",
  },
  {
    title: "Отчёт",
    text: "Вывод, ограничения, риски, рекомендации, источники и 2D-эскиз.",
  },
];

const plotFields = ["Кадастровый номер", "Адрес", "Площадь", "Что планируется построить"];

const documents = [
  { name: "ПЗЗ / градостроительный регламент", status: "требуется" },
  { name: "ГПЗУ", status: "требуется" },
  { name: "Выписка ЕГРН", status: "требуется" },
  { name: "Сведения о ЗОУИТ", status: "если есть" },
  { name: "Схема участка / топосъёмка", status: "желательно" },
];

const reportItems = [
  "можно / нельзя / возможно при условиях / данных недостаточно",
  "территориальная зона и ВРИ",
  "параметры застройки и ограничения",
  "риски и рекомендации",
  "источники документов",
  "предварительный 2D-эскиз",
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (login === demoLogin && password === demoPassword) {
      setIsLoggedIn(true);
      setError("");
      return;
    }

    setError("Неверный логин или пароль для демо-входа");
  }

  if (!isLoggedIn) {
    return (
      <main className="login-screen">
        <section className="login-card">
          <span className="eyebrow">Демо-доступ</span>
          <h1>Вход в закрытый кабинет</h1>
          <p>
            Прототип сервиса для предпроектного анализа земельных участков. Реальная авторизация и хранение документов подключаются на backend-этапе.
          </p>

          <form className="request-form login-form" onSubmit={handleLogin}>
            <label>
              Логин
              <input value={login} onChange={(event) => setLogin(event.target.value)} placeholder="demo" />
            </label>
            <label>
              Пароль
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="demo123"
                type="password"
              />
            </label>
            {error ? <p className="error-message">{error}</p> : null}
            <button type="submit">Войти в кабинет</button>
            <small className="form-note">Тестовый доступ: demo / demo123</small>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="ГрадоАналитик">
            ГрадоАналитик
          </a>
          <nav className="nav" aria-label="Основная навигация">
            <a href="#how">Как работает</a>
            <a href="#plot">Участок</a>
            <a href="#documents">Документы</a>
            <a href="#report">Отчёт</a>
          </nav>
          <button className="logout-button" type="button" onClick={() => setIsLoggedIn(false)}>
            Выйти
          </button>
        </div>
      </header>

      <section id="top" className="hero compact-hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Закрытый MVP-кабинет</span>
            <h1>Предпроектный анализ земельного участка</h1>
            <p>
              Пользователь создаёт участок, загружает документы и получает предварительный вывод: можно строить, нельзя, возможно при условиях или данных недостаточно.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#plot">Создать анализ</a>
              <a className="button secondary" href="#report">Смотреть результат</a>
            </div>
          </div>

          <aside className="summary-card">
            <p className="card-label">Статус</p>
            <h2>Демо-прототип</h2>
            <ul>
              <li>интерфейс кабинета готов</li>
              <li>backend-каркас запущен</li>
              <li>загрузка документов — следующий этап</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Сценарий работы</span>
            <h2>Как работает сервис</h2>
            <p>В интерфейсе оставлены только ключевые действия, которые нужны заказчику для понимания продукта.</p>
          </div>

          <div className="cards-grid">
            {steps.map((step) => (
              <article className="info-card feature-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plot" className="section muted-section">
        <div className="container app-grid">
          <div>
            <span className="eyebrow">Новый анализ</span>
            <h2>Карточка участка</h2>
            <p className="section-text">
              В рабочей версии эти данные сохраняются в базе и связываются с документами участка.
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
            <small className="form-note">Пока это макет сценария. Реальный запуск подключается после backend-хранилища документов.</small>
          </form>
        </div>
      </section>

      <section id="documents" className="section">
        <div className="container split-section">
          <div>
            <span className="eyebrow">Документы</span>
            <h2>Что нужно загрузить</h2>
            <p className="section-text">
              ИИ не делает вывод «из головы». Анализ строится только по загруженным и выбранным источникам.
            </p>
          </div>

          <div className="table-card">
            {documents.map((doc) => (
              <div className="doc-row" key={doc.name}>
                <div>
                  <strong>{doc.name}</strong>
                  <span>статус: {doc.status}</span>
                </div>
                <button type="button" className="mock-button">Макет загрузки</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="section dark-section">
        <div className="container results-grid">
          <div>
            <span className="eyebrow light">Результат</span>
            <h2>Предварительный отчёт</h2>
            <p>
              После анализа пользователь получает структурированный вывод с рисками, рекомендациями и ссылками на источники.
            </p>
          </div>
          <div className="result-panel">
            {reportItems.map((item) => (
              <div className="result-item" key={item}>✓ {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section warning-section">
        <div className="container warning-box">
          <span className="eyebrow">Ограничение демо</span>
          <h2>Реальные документы в публичную версию не загружаются</h2>
          <p>
            Для рабочей версии нужен закрытый сервер, авторизация, backend-хранилище файлов и база данных. Этот сайт показывает интерфейс и сценарий MVP.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>ГрадоАналитик</span>
          <span>© 2026 · демонстрационный MVP</span>
        </div>
      </footer>
    </main>
  );
}
