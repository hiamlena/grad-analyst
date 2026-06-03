"use client";

import { FormEvent, useMemo, useState } from "react";

type Screen = "dashboard" | "plot" | "documents" | "report";

const demoLogin = "demo";
const demoPassword = "demo123";

const navItems: { key: Screen; label: string }[] = [
  { key: "dashboard", label: "Обзор" },
  { key: "plot", label: "Участок" },
  { key: "documents", label: "Документы" },
  { key: "report", label: "Отчёт" },
];

const docs = [
  { name: "ГПЗУ", status: "загружен", loaded: true, note: "параметры застройки" },
  { name: "Выписка ЕГРН", status: "загружен", loaded: true, note: "площадь, ВРИ, право" },
  { name: "Схема участка", status: "загружен", loaded: true, note: "форма, подъезд, размещение" },
  { name: "ПЗЗ / регламент", status: "нужен", loaded: false, note: "для проверки зоны" },
  { name: "ЗОУИТ", status: "нужен при наличии", loaded: false, note: "ограничения и охранные зоны" },
];

const riskItems = [
  "Территориальная зона требует проверки по актуальному ПЗЗ",
  "Нужно подтвердить ВРИ и предельные параметры застройки",
  "Необходимо проверить ЗОУИТ и инженерные ограничения",
  "Финальный вывод невозможен без полного комплекта документов",
];

const reportSections = [
  { title: "Вывод", value: "Возможно при условиях", tone: "accent" },
  { title: "Уверенность", value: "Средняя", tone: "warning" },
  { title: "Не хватает", value: "ПЗЗ и ЗОУИТ", tone: "neutral" },
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
        <section className="login-card clean-login">
          <div className="login-brand">
            <span className="logo-mark">ГА</span>
            <div>
              <strong>ГрадоАналитик</strong>
              <small>демо-кабинет</small>
            </div>
          </div>

          <h1>Предпроектный анализ участка</h1>
          <p>Закрытый кабинет: участок, документы, предварительный вывод, риски и 2D-схема.</p>

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
            <button type="submit">Войти</button>
            <button className="button secondary demo-button" type="button" onClick={openDemoCabinet}>
              Открыть демо
            </button>
            <small className="form-note">demo / demo123</small>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell clean-shell">
      <header className="site-header clean-header">
        <div className="container header-inner">
          <button className="logo logo-button" type="button" onClick={() => setScreen("dashboard")}>
            ГрадоАналитик
          </button>
          <nav className="nav clean-nav" aria-label="Основная навигация">
            {navItems.map((item) => (
              <button className={navClass(item.key)} type="button" onClick={() => setScreen(item.key)} key={item.key}>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <button className="logout-button" type="button" onClick={() => setIsLoggedIn(false)}>
            Выйти
          </button>
        </div>
      </header>

      <section className="demo-strip">
        <div className="container demo-strip-inner">
          <strong>Демо-режим</strong>
          <span>Файлы и ИИ пока не подключены. Показан пользовательский сценарий MVP.</span>
        </div>
      </section>

      {screen === "dashboard" ? (
        <section className="section clean-dashboard">
          <div className="container dashboard-layout">
            <div className="dashboard-main">
              <span className="eyebrow">Текущий анализ</span>
              <h1>Краснодарский край, демонстрационный участок</h1>
              <p>
                Предварительный статус: <strong>возможно при условиях</strong>. Для уверенного вывода не хватает ПЗЗ и сведений о ЗОУИТ.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => setScreen("plot")}>Заполнить участок</button>
                <button className="button secondary" type="button" onClick={() => setScreen("report")}>Открыть отчёт</button>
              </div>
            </div>

            <aside className="summary-card dashboard-card action-card">
              <p className="card-label">Состояние</p>
              <div className="status-list">
                <div className="status-row">
                  <span>Участок</span>
                  <strong>{plotCreated ? "готов" : "демо"}</strong>
                  <small>основные данные заполнены примером</small>
                </div>
                <div className="status-row">
                  <span>Документы</span>
                  <strong>{loadedDocs}/{docs.length}</strong>
                  <small>часть документов отсутствует</small>
                </div>
                <div className="status-row">
                  <span>Отчёт</span>
                  <strong>{analysisStarted ? "сформирован" : "пример"}</strong>
                  <small>предварительный вывод без юридической силы</small>
                </div>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {screen === "plot" ? (
        <section className="section muted-section compact-section">
          <div className="container app-grid">
            <div className="stage-card accent-stage">
              <span className="eyebrow">Участок</span>
              <h2>Исходные данные</h2>
              <p className="section-text">Минимум данных, чтобы связать документы и будущий отчёт.</p>
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
              <button type="button" onClick={handleCreatePlot}>Дальше к документам</button>
              <small className="form-note">{plotCreated ? "Участок сохранён в демо." : "Демо: данные не сохраняются на сервер."}</small>
            </form>
          </div>
        </section>
      ) : null}

      {screen === "documents" ? (
        <section className="section compact-section">
          <div className="container split-section">
            <div className="stage-card">
              <span className="eyebrow">Документы</span>
              <h2>Пакет для анализа</h2>
              <p className="section-text">Чем полнее комплект, тем выше уверенность предварительного вывода.</p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={handleStartAnalysis}>Запустить анализ</button>
                <button className="button secondary" type="button" onClick={() => setScreen("plot")}>Назад</button>
              </div>
            </div>

            <div className="table-card">
              <div className="card-topline">
                <div>
                  <p className="card-label">Документы</p>
                  <h3>{loadedDocs} из {docs.length}</h3>
                </div>
                <span className="quality-badge">демо</span>
              </div>

              {docs.map((doc) => (
                <div className="doc-row" key={doc.name}>
                  <div>
                    <strong>{doc.name}</strong>
                    <span>{doc.note}</span>
                  </div>
                  <button type="button" className={doc.loaded ? "mock-button success" : "mock-button"}>
                    {doc.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {screen === "report" ? (
        <section className="section dark-section compact-section">
          <div className="container results-grid">
            <div>
              <span className="eyebrow light">Отчёт</span>
              <h2>Предварительный вывод</h2>
              <p>
                {analysisStarted
                  ? "Демо-анализ завершён. Показана структура результата."
                  : "Пример отчёта по демонстрационному участку."}
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => setScreen("plot")}>Новый анализ</button>
                <button className="button secondary dark-secondary" type="button" onClick={() => setScreen("documents")}>Документы</button>
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
                <h3>Риски</h3>
                {riskItems.map((item) => (
                  <div className="result-item" key={item}>✓ {item}</div>
                ))}
              </div>

              <div className="source-card">
                <h3>Недостающие данные</h3>
                <p>Данных недостаточно. Для уверенного вывода нужно загрузить: ПЗЗ, сведения о ЗОУИТ, актуальную выписку ЕГРН и схему инженерных сетей.</p>
              </div>

              <div className="sketch-card planning-card">
                <div className="card-topline">
                  <div>
                    <strong>2D-эскиз</strong>
                    <span>предварительная компоновка участка</span>
                  </div>
                  <span className="quality-badge">layout</span>
                </div>

                <div className="planning-board" aria-label="Предварительная схема размещения объекта на участке">
                  <div className="board-toolbar">
                    <span>Схема 1:500</span>
                    <strong>Коммерческий объект · 1200 м²</strong>
                  </div>

                  <div className="site-plan">
                    <span className="north-arrow">N</span>
                    <span className="dimension dimension-top">40 м</span>
                    <span className="dimension dimension-left">30 м</span>
                    <div className="setback-line">отступ 3 м</div>
                    <div className="road-zone">подъездная дорога</div>
                    <div className="entry-gate">въезд</div>
                    <div className="main-building"><strong>Объект</strong><span>18×10 м</span></div>
                    <div className="parking-zone"><strong>P</strong><span>6 м/м</span></div>
                    <div className="tech-zone">тех. зона</div>
                    <div className="green-zone">озеленение</div>
                  </div>

                  <div className="plan-legend">
                    <span><i className="legend-building" /> объект</span>
                    <span><i className="legend-parking" /> парковка</span>
                    <span><i className="legend-tech" /> техзона</span>
                    <span><i className="legend-green" /> зелёная зона</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
