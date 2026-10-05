import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import Redact from './Redact';
import { fmt } from '../lib/format.js';
import { pagePath } from '../lib/routes-util.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', consent: false, _gotcha: '' };
const REQUIRED = { name: true, email: true, message: true };
const ORDER = ['name', 'email', 'message', 'consent'];

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = true;
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = true;
  if (v.message.trim().length < 5) e.message = true;
  if (!v.consent) e.consent = true;
  return e;
}

// Contact form: a heading with instructions, three labelled groups (numbered fieldsets, each square fills when its required
// fields are valid), helper text under every label, a confidentiality notice, the KVKK checkbox and one submit.
// No server: submit opens WhatsApp (wa.me) in a new tab with the message pre-filled; the visitor sends it there.
// Result block (aria-live) covers invalid / whatsapp. Field fill: none; hairline boxes only.
// t = tr.contact. States: idle | invalid | whatsapp.
export default function ContactForm({ t, site, headingId }) {
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState('idle');
  const [invalid, setInvalid] = useState([]);
  const refs = { name: useRef(null), email: useRef(null), phone: useRef(null), subject: useRef(null), message: useRef(null), consent: useRef(null) };
  const now = validate(values);

  const setField = (k, val) => {
    const next = { ...values, [k]: val };
    setValues(next);
    // errors appear only after a submit attempt; once shown they update live as the field is fixed
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
    if (state === 'invalid') setState('idle');
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setInvalid([]);
    setState('idle');
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true, consent: true });
    const bad = ORDER.filter((k) => errs[k]);
    if (bad.length) {
      // The result block (polite live region) lists what is missing; focus moves to the first invalid field.
      setInvalid(bad);
      setState('invalid');
      refs[bad[0]].current?.focus();
      return;
    }
    if (values._gotcha) {
      setState('whatsapp'); // bots get a silent fake success
      return;
    }
    const text = [
      `Ad Soyad: ${values.name.trim()}`,
      values.email.trim() && `E-posta: ${values.email.trim()}`,
      values.phone.trim() && `Telefon: ${values.phone.trim()}`,
      values.subject.trim() && `Konu: ${values.subject.trim()}`,
      '',
      values.message.trim(),
    ]
      .filter((l) => l !== false && l !== '')
      .join('\n');
    window.open(`${site.contact.whatsapp.url}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setValues(EMPTY);
    setTouched({});
    setState('whatsapp');
  };

  const c = t.consent;
  const at = c.label.indexOf(c.linkText);
  const consentLabel =
    at < 0 ? (
      c.label
    ) : (
      <>
        {c.label.slice(0, at)}
        <Link className="cf__link" href={pagePath('privacy')}>
          {c.linkText}
        </Link>
        {c.label.slice(at + c.linkText.length)}
      </>
    );

  const field = (k, { type = 'text', area = false, autoComplete }) => {
    const Tag = area ? 'textarea' : 'input';
    const f = t.fields[k];
    const req = REQUIRED[k] === true;
    const err = errors[k];
    const described = [f.hint ? id(`${k}-hint`) : null, err ? id(`${k}-err`) : null].filter(Boolean).join(' ');
    return (
      <div className={`cf__row${err ? ' has-error' : ''}`} key={k}>
        <div className="cf__label-line">
          <label className="cf__label" htmlFor={id(k)}>
            {f.label}
          </label>
          <span className="cf__tag">{req ? t.required : t.optional}</span>
        </div>
        {f.hint ? (
          <p className="cf__hint" id={id(`${k}-hint`)}>
            {f.hint}
          </p>
        ) : null}
        <Tag
          ref={refs[k]}
          id={id(k)}
          name={k}
          className={area ? 'cf__input cf__textarea' : 'cf__input'}
          type={area ? undefined : type}
          rows={area ? 6 : undefined}
          autoComplete={autoComplete}
          value={values[k]}
          required={req}
          aria-required={req || undefined}
          aria-invalid={err ? 'true' : undefined}
          aria-describedby={described || undefined}
          onChange={(e) => setField(k, e.target.value)}
        />
        {err ? (
          <p className="cf__error" id={id(`${k}-err`)}>
            <span className="cf__error-k">{t.errorPrefix}</span> {f.error}
          </p>
        ) : null}
      </div>
    );
  };

  const fieldProps = {
    name: { autoComplete: 'name' },
    email: { type: 'email', autoComplete: 'email' },
    phone: { type: 'tel', autoComplete: 'tel' },
    subject: {},
    message: { area: true },
  };
  // a group is done when every required field in it is valid (optional-only groups never fill)
  const groupDone = (g) => {
    const req = g.fields.filter((k) => REQUIRED[k]);
    return req.length > 0 && req.every((k) => !now[k]);
  };

  const res = t.result[state];
  const showResult = Boolean(res) && state !== 'idle';
  const hideForm = state === 'whatsapp';
  const resultText = res ? fmt(res.text, { email: site.contact.email, n: invalid.length }) : '';

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-labelledby={headingId}>
      <header className="cf__head">
        <h3 className="cf__title" id={headingId}>
          {t.formTitle}
        </h3>
        <p className="cf__lead">{t.formLead}</p>
      </header>

      <div className="cf__result-wrap" role="status" aria-live="polite">
        {showResult ? (
          <div className={`cf__result cf__result--${state}`}>
            <p className="cf__result-title">{res.title}</p>
            <p className="cf__result-text">{resultText}</p>
            {state === 'invalid' ? (
              <ul className="cf__result-list">
                {invalid.map((k) => (
                  <li key={k}>
                    <button type="button" className="cf__result-link" onClick={() => refs[k].current?.focus()}>
                      {k === 'consent' ? t.consentTitle : t.fields[k].label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {state === 'whatsapp' ? (
              <button type="button" className="cf__result-link cf__result-again" onClick={reset}>
                {res.again}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="cf__body" hidden={hideForm}>
        {t.groups.map((g, gi) => (
          <fieldset className="cf__group" key={g.id}>
            <legend className="cf__legend">
              <span className={`cf__step${groupDone(g) ? ' is-done' : ''}`} aria-hidden="true">
                {gi + 1}
              </span>
              <span className="cf__legend-t">{g.title}</span>
              {groupDone(g) ? <span className="cf__sr">({t.groupDone})</span> : null}
            </legend>
            <div className={`cf__fields${g.fields.length > 1 && g.id === 'reach' ? ' cf__fields--pair' : ''}`}>
              {g.fields.map((k) => field(k, fieldProps[k]))}
            </div>
          </fieldset>
        ))}

        <div className="cf__notice" role="note">
          <div className="cf__notice-top">
            <span className="cf__notice-mark" aria-hidden="true" />
            <p className="cf__notice-title">{t.warning.title}</p>
            <Redact w={10} className="cf__redact" />
          </div>
          <p className="cf__notice-text">{t.warning.text}</p>
        </div>

        <div className="cf__hp" aria-hidden="true">
          <label htmlFor={id('hp')}>{t.honeypotLabel}</label>
          <input id={id('hp')} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={(e) => setField('_gotcha', e.target.value)} />
        </div>

        <div className={`cf__consent${errors.consent ? ' has-error' : ''}`}>
          <div className="cf__consent-line">
            <input
              ref={refs.consent}
              id={id('consent')}
              className="cf__check"
              type="checkbox"
              checked={values.consent}
              required
              aria-required="true"
              aria-invalid={errors.consent ? 'true' : undefined}
              aria-describedby={errors.consent ? id('consent-err') : undefined}
              onChange={(e) => setField('consent', e.target.checked)}
            />
            <label htmlFor={id('consent')} className="cf__consent-label">
              {consentLabel} <span className="cf__tag cf__tag--inline">{t.required}</span>
            </label>
          </div>
          {errors.consent ? (
            <p className="cf__error" id={id('consent-err')}>
              <span className="cf__error-k">{t.errorPrefix}</span> {c.error}
            </p>
          ) : null}
        </div>

        <div className="cf__actions">
          <Button variant="wax" type="submit" className="cf__submit">
            {t.submit}
          </Button>
        </div>
      </div>
    </form>
  );
}
