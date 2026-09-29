import ImageFrame from './ImageFrame';
import Reveal from './Reveal';
import Stamp from './Stamp';

// Calisma Bicimi: four ticket stubs on a descending staircase beside a sticky photograph (stairwell from below).
export default function Process({ t }) {
  const steps = t?.steps ?? [];
  return (
    <section id="calisma-bicimi" className="process" data-theme="light" aria-labelledby="calisma-bicimi-title">
      <div className="container process__grid">
        <div className="process__main">
          <div className="process__head">
            <Stamp size="sm" className="process__stamp">
              {t?.stamp}
            </Stamp>
            <Reveal as="h2" id="calisma-bicimi-title" className="process__title">
              {t?.h2}
            </Reveal>
          </div>

          <ol className="process__steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i} className="process__ticket">
                <div className="process__stub" aria-hidden="true">
                  <span className="process__stage">{t?.stageLabel}</span>
                  <span className="process__n">
                    {s.n}/{steps.length}
                  </span>
                </div>
                <div className="process__body">
                  <h3 className="process__step-title">
                    <span className="process__sr">
                      {t?.stageLabel}&nbsp;{s.n}:&nbsp;
                    </span>
                    {s.title}
                  </h3>
                  <p className="process__text">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="process__aside">
          <ImageFrame name="process-stair" alt="" aspect="4-5" sizes="(min-width: 1024px) 28vw, 90vw" className="process__photo" />
        </div>
      </div>
    </section>
  );
}
