import Reveal from './Reveal';

export default function Process({ t }) {
  return (
    <section id="process" className="process" data-theme="dark" aria-labelledby="process-title">
      <div className="container process__head">
        <Reveal as="p" className="eyebrow">
          {t.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} id="process-title" className="process__title">
          {t.title}
        </Reveal>
      </div>
      <div className="container">
        <ol className="process__steps">
          {t.steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i} className="process__step">
              <span className="process__num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="process__step-title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
