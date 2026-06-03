"use client";

import { FormEvent, useMemo, useState } from "react";

type Screen = "dashboard" | "plot" | "documents" | "report";

const demoLogin = "demo";
const demoPassword = "demo123";

const steps: { key: Screen; label: string; caption: string }[] = [
  { key: "dashboard", label: "Кабинет", caption: "обзор" },
  { key: "plot", label: "Участок", caption: "данные" },
  { key: "documents", label: "Документы", caption: "комплект" },
  { key: "report", label: "Отчёт", caption: "вывод" },
];

const docs = [
  { name: "ГПЗУ", status: "загружен демо-файл", loaded: true, note: "ключевой документ для параметров застройки" },
  { name: "Выписка ЕГРН", status: "загружен демо-файл", loaded: true, note: "площадь, категория, ВРИ, право" },
  { name: "Схема участка", status: "загружен демо-файл", loaded: true, note: "форма участка, подъезд, размещение объекта" },
  { name: "ПЗЗ / градостроительный регламент", status: "требуется", loaded: false, note: "без него нельзя уверенно подтвердить зону" },
  { name: "Сведения о ЗОУИТ", status: "если есть", loaded: false, note: "санитарные, охранные и иные ограничения" },
];

const riskItems = [
  "Территориальная зона требует проверки по актуальному ПЗЗ",
  "Нужно подтвердить ВРИ и предельные параметры застройки",
  "Необходимо проверить ЗОУИТ и инженерные ограничения",
  "Финальный вывод невозможен без полного комплекта документов",
];

const reportSections = [
  { title: "Предварительный вывод", value: "Возможно при условиях", tone: "accent" },
  { title: "Уровень уверенности", value: "Средний — не хватает ПЗЗ и ЗОУИТ", tone: "warning" },
  { title: "Следующий документ", value: "Актуальный градостроительный регламент", tone: "neutral" },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [plotCreated, setPlotCreated] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);

  const loadedDocs = useMemo(() => docs.filter((doc) => doc.loaded).length, []);

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

  function navClass(key: Screen) {
    return screen === key ? "active" : "";
  }

  if (!isLoggedIn) {
    return (
      <main className="login-screen">
        <section className="login-card">
          <div className="login-brand">
            <span className="logo-mark">ГА</span>
            <div>
              <strong>ГрадоАналитик</strong>
              <small>закрытый MVP-кабинет</small>
            </div>
          </div>

          <span className="eyebrow">Демо-доступ для заказчика</span>
          <h1>Вход в закрытый кабинет</h1>
          <p>
            Кликабельный MVP-прототип сервиса для предпроектного анализа земельных участков.
            Сценарий показывает путь от карточки участка до предварительного отчёта и 2D-эскиза.
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
    <main className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <button className="logo logo-button" type="button" onClick={() => setScreen("dashboard")}>
            ГрадоАналитик
          </button>
          <nav className="nav" aria-label="Основная навигация">
            {steps.map((step) => (
              <button className={navClass(step.key)} type="button" onClick={() => setScreen(step.key)} key={step.key}>
                <span>{step.label}</span>
                <small>{step.caption}</small>
              </button>
            ))}
          </nav>
          <button className="logout-button" type="button" onClick={() => setIsLoggedIn(false)}>
            Выйти
          </button>
        </div>
      </header>

      <section className="progress-section">
        <div className="container stepper">
          {steps.map((step, index) => (
            <button className={navClass(step.key)} type="button" onClick={() => setScreen(step.key)} key={step.key}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <small>{step.caption}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      {screen === "dashboard" ? (
        <section className="hero compact-hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow light">Закрытый кабинет · демо-режим</span>
              <h1>Предпроектный анализ участка за один понятный сценарий</h1>
              <p>
                Пользователь создаёт участок, добавляет документы и получает предварительный вывод:
                можно, нельзя, возможно при условиях или данных недостаточно.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => setScreen("plot")}>
                  Создать анализ
                </button>
                <button className="button secondary" type="button" onClick={() => setScreen("report")}>
                  Смотреть пример отчёта
                </button>
              </div>
            </div>

            <aside className="summary-card dashboard-card">
              <p className="card-label">Готовность MVP</p>
              <h2>Кликабельный прототип</h2>
              <div className="status-list">
                <div className="status-row">
                  <span>Сценарий</span>
                  <strong>4 шага</strong>
                  <small>вход, участок, документы, отчёт</small>
                </div>
                <div className="status-row">
                  <span>Документы</span>
                  <strong>{loadedDocs}/{docs.length}</strong>
                  <small>часть комплекта показана в демо</small>
                </div>
                <div className="status-row">
                  <span>Backend</span>
                  <strong>каркас</strong>
                  <small>FastAPI /health уже проверен</small>
                </div>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {screen === "plot" ? (
        <section className="section muted-section">
          <div className="container app-grid">
            <div className="stage-card accent-stage">
              <span className="eyebrow">Шаг 1 · карточка участка</span>
              <h2>Сначала фиксируем исходные данные</h2>
              <p className="section-text">
                В рабочей версии карточка сохраняется в базе, связывается с документами и становится основой отчёта.
              </p>
              <div className="mini-panel">
                <strong>Цель шага</strong>
                <span>дать ИИ контекст: где участок, какая площадь, что хочет построить пользователь.</span>
              </div>
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
              <div className="form-grid">
                <label>
                  Площадь
                  <input type="text" defaultValue="1200 кв. м" />
                </label>
                <label>
                  Подъезд
                  <select defaultValue="south">
                    <option value="south">с южной стороны</option>
                    <option value="north">с северной стороны</option>
                    <option value="east">с восточной стороны</option>
                    <option value="west">с западной стороны</option>
                  </select>
                </label>
              </div>
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
            <div className="stage-card">
              <span className="eyebrow">Шаг 2 · документы</span>
              <h2>Комплект документов определяет качество вывода</h2>
              <p className="section-text">
                В демо показан сценарий загрузки. В рабочей версии каждый файл будет извлекаться, дробиться на фрагменты и использоваться как источник для RAG-ответа.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={handleStartAnalysis}>Запустить анализ</button>
                <button className="button secondary" type="button" onClick={() => setScreen("plot")}>Назад к участку</button>
              </div>
            </div>

            <div className="table-card">
              <div className="card-topline">
                <div>
                  <p className="card-label">Пакет участка</p>
                  <h3>{loadedDocs} документа готовы</h3>
                </div>
                <span className="quality-badge">демо</span>
              </div>

              {docs.map((doc) => (
                <div className="doc-row" key={doc.name}>
                  <div>
                    <strong>{doc.name}</strong>
                    <span>{doc.status}</span>
                    <small>{doc.note}</small>
                  </div>
                  <button type="button" className={doc.loaded ? "mock-button success" : "mock-button"}>
                    {doc.loaded ? "Загружено" : "Нужно добавить"}
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
              <span className="eyebrow light">Шаг 3 · предварительный отчёт</span>
              <h2>Вывод без фантазий: только по документам</h2>
              <p>
                {analysisStarted
                  ? "Демо-анализ завершён. Ниже показана структура результата для заказчика."
                  : "Это пример результата, который получит пользователь после загрузки документов и запуска анализа."}
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => setScreen("plot")}>Создать новый анализ</button>
                <button className="button secondary dark-secondary" type="button" onClick={() => setScreen("documents")}>Вернуться к документам</button>
              </div>
            </div>

            <div className="result-panel">
              <div className="report-summary-grid">
                {reportSections.map((item) => (
                  <article className={`report-kpi ${item.tone}`} key={item.title}>
                    <span>{item.title}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>

              <div className="result-block">
                <h3>Риски и ограничения</h3>
                {riskItems.map((item) => (
                  <div className="result-item" key={item}>✓ {item}</div>
                ))}
              </div>

              <div className="source-card">
                <h3>Недостающие данные</h3>
                <p>Данных недостаточно. Для уверенного вывода нужно загрузить: ПЗЗ, сведения о ЗОУИТ, актуальную выписку ЕГРН и схему инженерных сетей.</p>
              </div>

              <div className="sketch-card">
                <div className="card-topline">
                  <div>
                    <strong>Предварительный 2D-эскиз</strong>
                    <span>пример компоновки участка</span>
                  </div>
                  <span className="quality-badge">SVG-ready</span>
                </div>
                <div className="sketch-box">
                  <span className="plot-area">участок</span>
                  <span className="building-area">объект</span>
                  <span className="parking-area">парковка</span>
                  <span className="entry-area">въезд</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section warning-section">
        <div className="container warning-box">
          <span className="eyebrow">Ограничение демо</span>
          <h2>Это не юридическое заключение и не официальный градостроительный документ</h2>
          <p>
            Сейчас это кликабельный MVP-прототип. Реальная авторизация, загрузка документов, хранение файлов,
            извлечение текста, RAG-поиск и ИИ-анализ подключаются следующим backend-этапом.
          </p>
        </div>
      </section>
    </main>
  );
}
