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
  { name: "ПЗЗ / регламент", status: "нужен", loaded: false, note: "для проверки территориальной зоны" },
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

const sourceItems = [
  { title: "ЕГРН", text: "площадь, ВРИ, кадастровый номер" },
  { title: "ГПЗУ", text: "параметры застройки, отступы, ограничения" },
  { title: "ПЗЗ", text: "требуется загрузить для проверки зоны" },
];

function PlanSvg() {
  return (
    <svg className="plan-svg" viewBox="0 0 760 430" role="img" aria-label="Схема участка с объектом, парковкой, въездом и отступами">
      <defs><pattern id="planGrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dbeafe" strokeWidth="1" /></pattern><linearGradient id="buildingFill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f1c76a" /><stop offset="1" stopColor="#d8a94f" /></linearGradient><filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.13" /></filter></defs>
      <rect x="0" y="0" width="760" height="430" rx="28" fill="#f8fafc" /><rect x="28" y="34" width="704" height="328" rx="24" fill="url(#planGrid)" stroke="#1e3a8a" strokeWidth="2" /><rect x="70" y="72" width="620" height="246" rx="18" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="8 8" opacity="0.5" /><rect x="28" y="314" width="704" height="48" rx="0" fill="#cbd5e1" /><path d="M28 338 H732" stroke="#94a3b8" strokeWidth="2" strokeDasharray="16 12" opacity="0.7" /><text x="380" y="345" textAnchor="middle" className="svg-road">ПОДЪЕЗДНАЯ ДОРОГА</text><rect x="98" y="270" width="98" height="48" rx="12" fill="#fff7ed" stroke="#f59e0b" strokeWidth="3" /><text x="147" y="300" textAnchor="middle" className="svg-entry">ВЪЕЗД</text><rect x="158" y="150" width="178" height="104" rx="18" fill="url(#buildingFill)" stroke="#b7791f" strokeWidth="1" filter="url(#softShadow)" /><text x="247" y="197" textAnchor="middle" className="svg-building-title">ОБЪЕКТ</text><text x="247" y="221" textAnchor="middle" className="svg-building-note">18×10 м</text><rect x="560" y="200" width="118" height="74" rx="16" fill="#e0f2fe" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 6" /><text x="619" y="234" textAnchor="middle" className="svg-parking-title">P</text><text x="619" y="255" textAnchor="middle" className="svg-parking-note">6 м/м</text><rect x="560" y="116" width="116" height="56" rx="16" fill="#e2e8f0" stroke="#94a3b8" /><text x="618" y="150" textAnchor="middle" className="svg-tech">ТЕХ. ЗОНА</text><rect x="82" y="174" width="92" height="92" rx="18" fill="#bbf7d0" opacity="0.9" /><circle cx="106" cy="198" r="8" fill="#86efac" /><circle cx="132" cy="222" r="7" fill="#86efac" /><text x="128" y="234" textAnchor="middle" className="svg-green">ЗЕЛЕНЬ</text><text x="380" y="66" textAnchor="middle" className="svg-dimension">40 м</text><text x="84" y="96" className="svg-setback">отступ 3 м</text><circle cx="698" cy="72" r="22" fill="#0b1f49" /><text x="698" y="79" textAnchor="middle" className="svg-north">N</text>
    </svg>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [plotCreated, setPlotCreated] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const loadedDocs = useMemo(() => docs.filter((doc) => doc.loaded).length, []);

  function openDemoCabinet() { setLogin(demoLogin); setPassword(demoPassword); setError(""); setIsLoggedIn(true); setScreen("dashboard"); }
  function handleLogin(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (login.trim() === demoLogin && password.trim() === demoPassword) { openDemoCabinet(); return; } setError("Доступ не подтверждён. Используйте демо-вход для просмотра кабинета."); }
  function handleCreatePlot() { setPlotCreated(true); setScreen("documents"); }
  function handleStartAnalysis() { setAnalysisStarted(true); setScreen("report"); }
  function navClass(key: Screen) { return screen === key ? "active" : ""; }

  if (!isLoggedIn) {
    return (<main className="login-screen"><section className="login-card clean-login"><div className="login-brand"><span className="logo-mark">ГА</span><div><strong>ГрадоАналитик</strong><small>закрытый аналитический кабинет</small></div></div><h1>Предпроектный анализ участка</h1><p>Закрытый кабинет: участок, документы, предварительный вывод, риски, источники и схема размещения.</p><form className="request-form login-form compact-login-form" onSubmit={handleLogin}><button className="button primary demo-main-button" type="button" onClick={openDemoCabinet}>Войти в демо-кабинет</button><details className="manual-login"><summary>Вход по выданному доступу</summary><label>Логин<input value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" /></label><label>Пароль<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" /></label><button type="submit">Войти</button></details>{error ? <p className="error-message">{error}</p> : null}<small className="form-note">Тестовый режим для демонстрации кабинета. Доступы согласовываются отдельно.</small></form></section></main>);
  }

  return (
    <main className="app-shell clean-shell">
      <header className="site-header clean-header"><div className="container header-inner"><button className="logo logo-button" type="button" onClick={() => setScreen("dashboard")}>ГрадоАналитик</button><nav className="nav clean-nav" aria-label="Основная навигация">{navItems.map((item) => (<button className={navClass(item.key)} type="button" onClick={() => setScreen(item.key)} key={item.key}><span>{item.label}</span></button>))}</nav><button className="logout-button" type="button" onClick={() => setIsLoggedIn(false)}>Выйти</button></div></header>
      {screen === "dashboard" ? (<section className="section clean-dashboard"><div className="container"><div className="dashboard-main premium-hero"><span className="eyebrow">Текущий анализ</span><h1>Краснодарский край, демонстрационный участок</h1><p>Статус: <strong>возможно при условиях</strong>. Для уверенного вывода нужны ПЗЗ и сведения о ЗОУИТ.</p><div className="premium-metrics"><div><span>Участок</span><strong>{plotCreated ? "готов" : "демо"}</strong></div><div><span>Документы</span><strong>{loadedDocs}/{docs.length}</strong></div><div><span>Отчёт</span><strong>{analysisStarted ? "готов" : "пример"}</strong></div></div><div className="hero-actions"><button className="button primary" type="button" onClick={() => setScreen("plot")}>Продолжить анализ</button><button className="button secondary" type="button" onClick={() => setScreen("report")}>Открыть отчёт</button></div></div></div></section>) : null}
      {screen === "plot" ? (<section className="section muted-section compact-section"><div className="container app-grid"><div className="stage-card accent-stage"><span className="eyebrow">Участок</span><h2>Исходные данные</h2><p className="section-text">Минимум данных, чтобы связать документы и будущий отчёт.</p></div><form className="request-form app-form"><label>Кадастровый номер<input type="text" defaultValue="23:00:0000000:000" /></label><label>Адрес<input type="text" defaultValue="Краснодарский край, демонстрационный участок" /></label><div className="form-grid"><label>Площадь<input type="text" defaultValue="1200 кв. м" /></label><label>Подъезд<select defaultValue="south"><option value="south">с южной стороны</option><option value="north">с северной стороны</option><option value="east">с восточной стороны</option><option value="west">с западной стороны</option></select></label></div><label>Что планируется построить<input type="text" defaultValue="Небольшой коммерческий объект" /></label><label>Режим анализа<select defaultValue="object"><option value="object">Я знаю, что хочу построить</option><option value="best">Подобрать лучший вариант</option></select></label><button type="button" onClick={handleCreatePlot}>Дальше к документам</button><small className="form-note">{plotCreated ? "Участок сохранён в демо." : "Демо: данные не сохраняются на сервер."}</small></form></div></section>) : null}
      {screen === "documents" ? (<section className="section compact-section"><div className="container split-section"><div className="stage-card"><span className="eyebrow">Документы</span><h2>Пакет для анализа</h2><p className="section-text">Чем полнее комплект, тем выше уверенность предварительного вывода.</p><div className="hero-actions"><button className="button primary" type="button" onClick={handleStartAnalysis}>Запустить анализ</button><button className="button secondary" type="button" onClick={() => setScreen("plot")}>Назад</button></div></div><div className="table-card"><div className="card-topline"><div><p className="card-label">Документы</p><h3>{loadedDocs} из {docs.length}</h3></div><span className="quality-badge">демо</span></div>{docs.map((doc) => (<div className="doc-row" key={doc.name}><div><strong>{doc.name}</strong><span>{doc.note}</span></div><button type="button" className={doc.loaded ? "mock-button success" : "mock-button"}>{doc.status}</button></div>))}</div></div></section>) : null}
      {screen === "report" ? (<section className="section dark-section compact-section"><div className="container results-grid"><div><span className="eyebrow light">Отчёт</span><h2>Экспертное резюме</h2><p>{analysisStarted ? "Демо-анализ завершён. Показана структура будущего результата." : "Пример предварительного отчёта по демонстрационному участку."}</p><div className="hero-actions"><button className="button primary" type="button" onClick={() => setScreen("documents")}>Вернуться к документам</button><button className="button secondary dark-secondary" type="button" onClick={() => setScreen("plot")}>Новый анализ</button></div></div><div className="result-panel"><div className="report-summary-grid">{reportSections.map((item) => (<article className={`report-kpi ${item.tone}`} key={item.title}><span>{item.title}</span><strong>{item.value}</strong></article>))}</div><div className="result-block"><h3>Риски</h3>{riskItems.map((item) => (<div className="result-item" key={item}>✓ {item}</div>))}</div><div className="source-card"><h3>Недостающие данные</h3><p>Данных недостаточно. Для уверенного вывода нужно загрузить: ПЗЗ, сведения о ЗОУИТ, актуальную выписку ЕГРН и схему инженерных сетей.</p></div><div className="source-card sources-card"><h3>Источники анализа</h3>{sourceItems.map((source) => (<div className="source-row" key={source.title}><strong>{source.title}</strong><span>{source.text}</span></div>))}</div><div className="sketch-card planning-card"><div className="card-topline"><div><strong>Предварительная схема размещения</strong><span>векторная схема будущего layout_json</span></div><span className="quality-badge">svg</span></div><div className="planning-board svg-board" aria-label="Предварительная схема размещения объекта на участке"><div className="board-toolbar"><span>Схема 1:500</span><strong>Коммерческий объект · 1200 м²</strong></div><PlanSvg /><div className="plan-legend"><span><i className="legend-building" /> объект</span><span><i className="legend-parking" /> парковка</span><span><i className="legend-tech" /> техзона</span><span><i className="legend-green" /> зелёная зона</span></div></div></div></div></div></section>) : null}
    </main>
  );
}
