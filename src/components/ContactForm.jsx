import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import Mark from './Mark';
import Redact from './Redact';
import { buildMailto } from '../lib/contact-mailto.js';
import { fmt } from '../lib/format.js';
import { isPending } from '../lib/pending.js';
import { pagePath } from '../lib/routes-util.js';

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', consent: false, _gotcha: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = true;
  if (!EMAIL_RE.test(v.email.trim())) e.email = true;
  if (v.message.trim().length < 5) e.message = true;
  if (!v.consent) e.consent = true;
  return e;
}

// t = contact page content. States: idle | invalid | submitting | success | mailto | error | pending.
export default function ContactForm({ t, site, labelledBy }) {
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState('idle');
  const [invalidCount, setInvalidCount] = useState(0);
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null), consent: useRef(null) };
  const emailPending = isPending(site.contact.email, { required: true });

  const setField = (k, val) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k] || errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
    if (state === 'invalid') setState('idle');
  };
  const blur = (k) => {
    setTouched((p) => ({ ...p, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (state === 'submitting') return;
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true, consent: true });
    const first = ['name', 'email', 'message', 'consent'].find((k) => errs[k]);
    if (first) {
      // Summary goes into the polite live region; focus moves to the first invalid field (its error is read via aria-describedby).
      setInvalidCount(Object.keys(errs).length);
      setState('invalid');
      refs[first].current?.focus();
      return;
    }
    if (values._gotcha) {
      setState('success'); // bots get a silent fake success
      return;
    }
    if (ENDPOINT) {
      setState('submitting');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            subject: values.subject.trim(),
            message: values.message.trim(),
          }),
        });
        setState(res.ok ? 'success' : 'error');
        if (res.ok) {
          setValues(EMPTY);
          setTouched({});
        }
      } catch {
        setState('error');
      }
      return;
    }
    if (emailPending) {
      setState('pending');
      return;
    }
    window.location.href = buildMailto({ to: site.contact.email, ...values });
    setState('mailto');
  };

  const status = t.status[state] ? fmt(t.status[state], { email: site.contact.email, n: invalidCount }) : '';
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

  const field = (k, { type = 'text', area = false, autoComplete, required = false }) => {
    const Tag = area ? 'textarea' : 'input';
    const err = errors[k];
    return (
      <div className={`cf__row${err ? ' has-error' : ''}`}>
        <label className="cf__label" htmlFor={id(k)}>
          <span className="cf__label-t">{t.fields[k].label}</span>
          {required ? (
            <span className="cf__req" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        <Tag
          ref={refs[k]}
          id={id(k)}
          name={k}
          className={area ? 'cf__input cf__textarea' : 'cf__input'}
          type={area ? undefined : type}
          rows={area ? 5 : undefined}
          autoComplete={autoComplete}
          value={values[k]}
          required={required}
          aria-required={required || undefined}
          aria-invalid={err ? 'true' : undefined}
          aria-describedby={err ? id(`${k}-err`) : undefined}
          onChange={(e) => setField(k, e.target.value)}
          onBlur={() => blur(k)}
        />
        {err ? (
          <p className="cf__error" id={id(`${k}-err`)}>
            {t.fields[k].error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-labelledby={labelledBy}>
      {field('name', { autoComplete: 'name', required: true })}
      {field('email', { type: 'email', autoComplete: 'email', required: true })}
      {field('phone', { type: 'tel', autoComplete: 'tel' })}
      {field('subject', {})}
      {field('message', { area: true, required: true })}

      <div className="cf__warning" role="note">
        <div className="cf__warning-top">
          <Mark className="cf__tag">{t.warningTag}</Mark>
          <Redact w={12} className="cf__redact" />
        </div>
        <p className="cf__warning-t">{t.warning}</p>
      </div>

      <div className="cf__hp" aria-hidden="true">
        <label htmlFor={id('hp')}>{t.honeypotLabel}</label>
        <input id={id('hp')} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={(e) => setField('_gotcha', e.target.value)} />
      </div>

      <div className="cf__row cf__consent">
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
            onBlur={() => blur('consent')}
          />
          <label htmlFor={id('consent')} className="cf__consent-label">
            {consentLabel}
          </label>
        </div>
        {errors.consent ? (
          <p className="cf__error" id={id('consent-err')}>
            {c.error}
          </p>
        ) : null}
      </div>

      <div className="cf__actions">
        <Button variant="wax" type="submit" className="cf__submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? t.sending : t.submit}
        </Button>
      </div>
      <p className={`cf__status${state === 'error' || state === 'invalid' ? ' cf__status--error' : ''}`} role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
