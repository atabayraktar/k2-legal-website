import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Arrow } from './Button';
import WhatsAppIcon from './WhatsAppIcon';
import { site } from '../content/site.js';
import q from '../content/tr/quick.js';

const STORE = 'k2-quick';
const DESKTOP = '(min-width: 1024px)';

const store = {
  get() {
    try {
      return window.sessionStorage.getItem(STORE);
    } catch {
      return null;
    }
  },
  set(v) {
    try {
      window.sessionStorage.setItem(STORE, v);
    } catch {
      /* private mode: panel simply reopens next page */
    }
  },
};

// "Hızlı bilgi": scripted question flow dressed as a chat (square, paper, typewriter). Not a real bot: the visitor's
// choices are turned into a pre-filled WhatsApp message and nothing leaves the page until they press the link.
// Flow: topic -> up to two multi-select questions -> optional note -> summary + send. Open by default on desktop only.
export default function QuickInfo({ open, onOpen, onClose, fabRef }) {
  const uid = useId();
  const [topic, setTopic] = useState(null); // area id | 'own' | 'general'
  const [qi, setQi] = useState(0); // question index within the area
  const [answers, setAnswers] = useState({}); // question id -> string[]
  const [picked, setPicked] = useState([]); // current question's selection
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [phase, setPhase] = useState('topic'); // topic | question | note | summary
  const bodyRef = useRef(null);
  const panelRef = useRef(null);
  const noteRef = useRef(null);
  const nameRef = useRef(null);
  // ad + soyad: en az iki sözcük, her biri en az 2 harf
  const nameOk = name.trim().split(/\s+/).filter((w) => w.length >= 2).length >= 2;

  const area = q.areas.find((a) => a.id === topic) ?? null;
  const question = area?.questions[qi] ?? null;
  const topicLabel = area?.label ?? (topic === 'own' ? q.own.label : topic === 'general' ? q.other.label : '');

  const reset = () => {
    setTopic(null);
    setQi(0);
    setAnswers({});
    setPicked([]);
    setNote('');
    setPhase('topic');
  };

  const chooseTopic = (id) => {
    setTopic(id);
    setQi(0);
    setPicked([]);
    setPhase(q.areas.some((a) => a.id === id) ? 'question' : 'note');
  };

  const toggle = (opt) => setPicked((p) => (p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]));

  const commitQuestion = () => {
    const next = { ...answers, [question.id]: picked };
    setAnswers(next);
    setPicked([]);
    if (qi + 1 < area.questions.length) setQi(qi + 1);
    else setPhase('note');
  };

  const skipQuestion = () => {
    setPicked([]);
    if (qi + 1 < area.questions.length) setQi(qi + 1);
    else setPhase('note');
  };

  const back = () => {
    if (phase === 'summary') return setPhase('note');
    if (phase === 'note') {
      if (!area) return reset();
      setQi(area.questions.length - 1);
      setPicked(answers[area.questions[area.questions.length - 1].id] ?? []);
      return setPhase('question');
    }
    if (phase === 'question') {
      if (qi === 0) return reset();
      setQi(qi - 1);
      setPicked(answers[area.questions[qi - 1].id] ?? []);
    }
    return undefined;
  };

  const message = useMemo(() => {
    const lines = [q.greeting, ''];
    if (name.trim()) lines.push(`${q.nameLine}: ${name.trim()}`);
    if (topicLabel && topic !== 'own') lines.push(`${q.topicLabel}: ${topicLabel}`);
    area?.questions.forEach((qu) => {
      const a = answers[qu.id];
      if (a?.length) lines.push(`${qu.label}: ${a.join(', ')}`);
    });
    if (note.trim()) lines.push('', topic === 'own' ? note.trim() : `${q.noteLine}: ${note.trim()}`);
    return lines.join('\n');
  }, [topic, topicLabel, area, answers, note, name]);

  const href = `${site.contact.whatsapp.url}?text=${encodeURIComponent(message)}`;

  // Keep the newest message in view; move focus into a new text field.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
    if (phase === 'note') nameRef.current?.focus({ preventScroll: true });
  }, [phase, qi, open]);

  // Esc closes and returns focus to the launcher.
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      fabRef?.current?.focus();
    }
  };

  // Transcript: answered steps as bot/user pairs, then the live step.
  const turns = [{ from: 'bot', text: q.topicAsk }];
  if (topic) turns.push({ from: 'user', text: topicLabel });
  if (area) {
    area.questions.forEach((qu, i) => {
      const reached = phase === 'question' ? i <= qi : true;
      if (!reached) return;
      turns.push({ from: 'bot', text: qu.ask });
      const a = answers[qu.id];
      if (a !== undefined && !(phase === 'question' && i === qi)) {
        turns.push({ from: 'user', text: a.length ? a.join(' · ') : '—' });
      }
    });
  }
  if (phase === 'note' || phase === 'summary') {
    turns.push({ from: 'bot', text: topic === 'own' ? q.ownAsk : q.noteAsk });
    if (phase === 'summary') turns.push({ from: 'user', text: [name.trim(), note.trim()].filter(Boolean).join(' · ') });
  }
  if (phase === 'summary') turns.push({ from: 'bot', text: q.summaryAsk });

  const titleId = `${uid}-t`;
  const restartBtn = (
    <button type="button" className="quick__tool" onClick={reset}>
      {q.restart}
    </button>
  );

  return (
    <>
      <div className={`quick__scrim${open ? ' is-open' : ''}`} onClick={() => { onClose(); fabRef?.current?.focus(); }} aria-hidden="true" />
    <div
      ref={panelRef}
      id={`${uid}-panel`}
      className={`quick${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-hidden={open ? undefined : 'true'}
      inert={!open}
      onKeyDown={onKeyDown}
    >
      <header className="quick__head">
        <img className="quick__logo" src="/logos/k2-horizontal-light.svg" width="446" height="100" alt="" />
        <h2 className="quick__title" id={titleId}>
          {q.title}
        </h2>
        <div className="quick__head-a">
          <button type="button" className="quick__x" onClick={() => { onClose(); fabRef?.current?.focus(); }} aria-label={q.close}>
            <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" focusable="false">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
          </button>
        </div>
      </header>

      <div className="quick__body" ref={bodyRef} data-lenis-prevent>
        <ol className="quick__log" aria-live="polite">
          {turns.map((t, i) => (
            <li key={`${i}-${t.text}`} className={`quick__msg quick__msg--${t.from}`}>
              {t.text}
            </li>
          ))}
        </ol>

        <div className="quick__ctrl">
          {phase === 'topic' ? (
            <div className="quick__chips" role="group" aria-label={q.topicAsk}>
              {q.areas.map((a) => (
                <button type="button" className="quick__chip" key={a.id} onClick={() => chooseTopic(a.id)}>
                  {a.label}
                </button>
              ))}
              <button type="button" className="quick__chip quick__chip--ghost" onClick={() => chooseTopic('general')}>
                {q.other.label}
              </button>
              <button type="button" className="quick__chip quick__chip--ghost" onClick={() => chooseTopic('own')}>
                {q.own.label}
              </button>
            </div>
          ) : null}

          {phase === 'question' && question ? (
            <>
              <p className="quick__hint">{q.multiHint}</p>
              <div className="quick__chips" role="group" aria-label={question.ask}>
                {question.options.map((o) => (
                  <button
                    type="button"
                    className={`quick__chip${picked.includes(o) ? ' is-on' : ''}`}
                    key={o}
                    aria-pressed={picked.includes(o)}
                    onClick={() => toggle(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <div className="quick__nav">
                <button type="button" className="quick__tool" onClick={back}>
                  {q.back}
                </button>
                <button type="button" className="quick__tool" onClick={skipQuestion}>
                  {q.skip}
                </button>
                {restartBtn}
                <button type="button" className="quick__go" disabled={picked.length === 0} onClick={commitQuestion}>
                  <span>{q.next}</span>
                  <Arrow className="quick__go-arrow" />
                </button>
              </div>
            </>
          ) : null}

          {phase === 'note' ? (
            <>
              <label className="quick__label" htmlFor={`${uid}-name`}>
                {q.nameLabel} <span className="quick__req">{q.required}</span>
              </label>
              <input
                ref={nameRef}
                id={`${uid}-name`}
                className="quick__input quick__input--line"
                type="text"
                autoComplete="name"
                maxLength={80}
                value={name}
                required
                aria-required="true"
                placeholder={q.namePlaceholder}
                aria-describedby={name.trim() && !nameOk ? `${uid}-name-hint` : undefined}
                onChange={(e) => setName(e.target.value)}
              />
              {name.trim() && !nameOk ? (
                <p className="quick__hint" id={`${uid}-name-hint`}>
                  {q.nameHint}
                </p>
              ) : null}
              <label className="quick__label" htmlFor={`${uid}-note`}>
                {q.noteLabel}
              </label>
              <textarea
                ref={noteRef}
                id={`${uid}-note`}
                className="quick__input"
                rows={4}
                maxLength={600}
                value={note}
                placeholder={q.notePlaceholder}
                aria-describedby={`${uid}-warn`}
                onChange={(e) => setNote(e.target.value)}
              />
              <p className="quick__warn" id={`${uid}-warn`}>
                {q.noteWarn}
              </p>
              <div className="quick__nav">
                <button type="button" className="quick__tool" onClick={back}>
                  {q.back}
                </button>
                {topic !== 'own' ? (
                  <button type="button" className="quick__tool" disabled={!nameOk} onClick={() => { setNote(''); setPhase('summary'); }}>
                    {q.skip}
                  </button>
                ) : null}
                {restartBtn}
                <button
                  type="button"
                  className="quick__go"
                  disabled={!nameOk || (topic === 'own' && note.trim().length < 3)}
                  onClick={() => setPhase('summary')}
                >
                  <span>{q.next}</span>
                  <Arrow className="quick__go-arrow" />
                </button>
              </div>
            </>
          ) : null}

          {phase === 'summary' ? (
            <>
              <p className="quick__label">{q.summaryLabel}</p>
              <pre className="quick__preview">{message}</pre>
              <div className="quick__nav">
                <button type="button" className="quick__tool" onClick={back}>
                  {q.back}
                </button>
                {restartBtn}
                <a className="quick__send" href={href} target="_blank" rel="noopener noreferrer" aria-label={q.sendLabel}>
                  <WhatsAppIcon />
                  <span>{q.send}</span>
                  <Arrow className="quick__go-arrow" />
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
    </>
  );
}

// Open state lives in FloatingActions; this hook decides the initial state (desktop: open once per session, unless closed).
export function useQuickInitial() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (store.get() === 'closed') return undefined;
    if (!window.matchMedia(DESKTOP).matches) return undefined;
    const t = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(t);
  }, []);
  const set = (v) => {
    setOpen(v);
    if (!v) store.set('closed');
  };
  return [open, set];
}
