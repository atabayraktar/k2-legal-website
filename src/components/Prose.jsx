import { renderPending } from '../lib/text.js';

// Long-form legal text, measure <= 70ch. The caller supplies the container/grid.
// sections: [{ id, h2, paragraphs, list?, ordered? }]
export default function Prose({ sections, updated, label }) {
  return (
    <div className="prose">
      {updated && (
        <p className="prose__updated">
          {label ? `${label}: ` : ''}
          {renderPending(updated)}
        </p>
      )}
      {sections.map((s) => {
        const List = s.ordered ? 'ol' : 'ul';
        return (
          <section className="prose__section" key={s.id} aria-labelledby={`prose-${s.id}`}>
            <h2 className="prose__h2" id={`prose-${s.id}`}>
              {s.h2}
            </h2>
            {s.paragraphs?.map((p, i) => (
              <p key={i}>{renderPending(p)}</p>
            ))}
            {s.list && (
              <List className="prose__list">
                {s.list.map((li, i) => (
                  <li key={i}>{renderPending(li)}</li>
                ))}
              </List>
            )}
          </section>
        );
      })}
    </div>
  );
}
