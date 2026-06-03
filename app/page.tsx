"use client";

import { FormEvent, useState } from "react";

type Screen = "dashboard" | "plot" | "documents" | "report";

const demoLogin = "demo";
const demoPassword = "demo123";

const docs = [
  { name: "ПЗЗ / градостроительный регламент", status: "требуется", loaded: false },
  { name: "ГПЗУ", status: "загружен демо-файл", loaded: true },
  { name: "Выписка ЕГРН", status: "загружен демо-файл", loaded: true },
  { name: "Сведения о ЗОУИТ", status: "если есть", loaded: false },
  { name: "Схема участка", status: "загружен демо-файл", loaded: true },
];

const reportItems = [
  "Предварительный вывод: возможно при условиях",
  "Нужно проверить территориальную зону и ВРИ по актуальному ПЗЗ",
  "Требуется загрузить градостроительный регламент",
  "Риски: ЗОУИТ, отступы, подъезд, инженерные сети",
  "Рекомендация: запросить ГПЗУ и актуальную выписку ЕГРН",
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [plotCreated, setPlotCreated] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);

  function openDemoCabinet() {
    setLogin(demoLogin);
    setPassword(demoPassword);
    setError("");
    setIsLoggedIn(true);
    setScreen("dashboard");
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (login.trim() === demoLogin && password.trim() === demoPassword) {
      openDemoCabinet();
      return;
    }

    setError("Неверный логин или пароль для демо-входа");
  }

  function handleCreatePlot() {
    setPlotCreated(true);
    setScreen("documents");
  }

  function handleStartAnalysis() {
    setAnalysisStarted(true);
    setScreen("report");
  }

  if (!isLoggedIn) {
    return (
      <main className="login-screen">
        <section className="login-card">
          <span className="eyebrow">Демо-доступ</span>
          <h1>Вход в закрытый кабинет</h1>
          <p>
            Кликабельный MVP-прототип сервиса для предпроектного анализа земельных участков.
            Реальная авторизация и хранение документов подключаются на backend-этапе.
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
            <button className="button secondary demo-button" type="button" onClick={openDemoCabinet}>
              Войти в демо без ввода
            </button>
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
          <button className="logo logo-button" type="button" onClick={() => setScreen("dashboard")}>
            ГрадоАналитик
          </button>
          <nav className="nav" aria-label="Основная навигация">
            <button type="button" onClick={() => setScreen("dashboard")}>Кабинет</button>
            <button type="button" onClick={() => setScreen("plot")}>Новый анализ</button>
            <button type="button" onClick={() => setScreen("documents")}>Документы</button>
            <button type="button" onClick={() => setScreen("report")}>Отчёт</button>
          </nav>
          <button className="logout-button" type="button" onClick={() => setIsLoggedIn(false)}>
            Выйти
          </button>
        </div>
      </header>

      {screen === "dashboard" ? (
        <section className="hero compact-hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">Закрытый MVP-кабинет</span>
              <h1>Предпроектный анализ земельного участка</h1>
              <p>
                Пользователь создаёт участок, загружает документы и получает предварительный вывод:
                можно строить, нельзя, возможно при условиях или данных недостаточно.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => setScreen("plot")}>Создать анализ</button>
                <button className="button secondary" type="button" onClick={() => setScreen("report")}>Смотреть пример отчёта</button>
              </div>
            </div>

            <aside className="summary-card">
              <p className="card-label">Статус кабинета</p>
              <h2>Демо-прототип</h2>
              <ul>
                <li>вход в кабинет есть</li>
                <li>кнопки переключают экраны</li>
                <li>backend-каркас уже запущен</li>
              </ul>
            </aside>
          </div>
        </section>
      ) : null}

      {screen === "plot" ? (
        <section className="section muted-section">
          <div className="container app-grid">
            <div>
              <span className="eyebrow">Шаг 1</span>
              <h2>Карточка участка</h2>
              <p className="section-text">
                Введите основные данные. В рабочей версии они сохраняются в базе и связываются с документами участка.
              </p>
            </div>

            <form className="request-form app-form">
              <label>
                Кадастровый номер
                <input type="text" defaultValue="23:00:0000000:000" />
              </label>
              <label>
                Адрес
                <input type="text" defaultValue="Краснодарский край, демонстрационный участок" />
              </label>
              <label>
                Площадь
                <input type="text" defaultValue="1200 кв. м" />
              </label>
              <label>
                Что планируется построить
                <input type="text" defaultValue="Небольшой коммерческий объект" />
              </label>
              <label>
                Режим анализа
                <select defaultValue="object">
                  <option value="object">Я знаю, что хочу построить</option>
                  <option value="best">Подобрать лучший вариант</option>
                </select>
              </label>
              <button type="button" onClick={handleCreatePlot}>Сохранить участок и перейти к документам</button>
              <small className="form-note">
                {plotCreated ? "Участок сохранён в демо-сценарии." : "Это кликабельный макет: данные пока не пишутся в базу."}
              </small>
            </form>
          </div>
        </section>
      ) : null}

      {screen === "documents" ? (
        <section className="section">
          <div className="container split-section">
            <div>
              <span className="eyebrow">Шаг 2</span>
              <h2>Документы для анализа</h2>
              <p className="section-text">
                В рабочей версии файлы будут храниться на закрытом сервере. В демо показан сценарий загрузки и проверки комплекта.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={handleStartAnalysis}>Запустить анализ</button>
                <button className="button secondary" type="button" onClick={() => setScreen("plot")}>Назад к участку</button>
              </div>
            </div>

            <div className="table-card">
              {docs.map((doc) => (
                <div className="doc-row" key={doc.name}>
                  <div>
                    <strong>{doc.name}</strong>
                    <span>{doc.status}</span>
                  </div>
                  <button type="button" className={doc.loaded ? "mock-button success" : "mock-button"}>
                    {doc.loaded ? "Загружено" : "Макет загрузки"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {screen === "report" ? (
        <section className="section dark-section">
          <div className="container results-grid">
            <div>
              <span className="eyebrow light">Шаг 3</span>
              <h2>Предварительный отчёт</h2>
              <p>
                {analysisStarted
                  ? "Демо-анализ завершён. Ниже показан пример структуры отчёта."
                  : "Это пример результата, который получит пользователь после загрузки документов и запуска анализа."}
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => setScreen("plot")}>Создать новый анализ</button>
                <button className="button secondary" type="button" onClick={() => setScreen("documents")}>Вернуться к документам</button>
              </div>
            </div>
            <div className="result-panel">
              {reportItems.map((item) => (
                <div className="result-item" key={item}>✓ {item}</div>
              ))}
              <div className="sketch-card">
                <strong>Предварительный 2D-эскиз</strong>
                <div className="sketch-box">
                  <span className="plot-area">участок</span>
                  <span className="building-area">объект</span>
                  <span className="parking-area">парковка</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section warning-section">
        <div className="container warning-box">
          <span className="eyebrow">Ограничение демо</span>
          <h2>Реальные документы в публичную версию не загружаются</h2>
          <p>
            Сейчас это кликабельный прототип. Для рабочей версии нужен закрытый сервер, авторизация,
            backend-хранилище файлов и база данных.
          </p>
        </div>
      </section>
    </main>
  );
}
