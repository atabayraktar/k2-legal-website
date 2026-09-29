import { createContext, useContext } from 'react';
import Collapse from './Collapse';
import { useAccordion } from '../hooks/useAccordion';

// Single- or multi-open accordion with hash deep links, roving arrow keys and animated panels.
// <Accordion ids={[...]} defaultOpen={[first]}>
//   <AccordionItem id="ceza-hukuku" index="A.01" title="Ceza Hukuku" level={3}>...panel body...</AccordionItem>
// </Accordion>
// Visual design belongs to the consumer: pass className / headClassName and style the BEM hooks (.acc__*).
const Ctx = createContext(null);

export default function Accordion({ ids, multi = false, defaultOpen = [], hash = true, as: Tag = 'div', className = '', children }) {
  const api = useAccordion({ ids, multi, defaultOpen, hash });
  return (
    <Ctx.Provider value={api}>
      <Tag className={`acc${className ? ` ${className}` : ''}`}>{children}</Tag>
    </Ctx.Provider>
  );
}

export function useAccordionApi() {
  return useContext(Ctx);
}

// tab: optional node rendered above the heading (e.g. a <Tab>), inside the item wrapper.
// glyph: false to omit the +/- glyph. glyphs: [closed, open].
export function AccordionItem({
  id,
  title,
  index,
  level = 3,
  tab = null,
  glyph = true,
  glyphs = ['+', '\u2212'],
  className = '',
  headClassName = '',
  panelClassName = '',
  children,
}) {
  const api = useContext(Ctx);
  const open = api.isOpen(id);
  const H = `h${level}`;
  const panel = api.getPanelProps(id);
  return (
    <div className={`acc__item${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}>
      {tab}
      <H id={id} className="acc__heading">
        <button className={`acc__head${headClassName ? ` ${headClassName}` : ''}`} {...api.getButtonProps(id)}>
          {index != null ? <span className="acc__index">{index}</span> : null}
          <span className="acc__title">{title}</span>
          {glyph ? (
            <span className="acc__glyph" aria-hidden="true">
              {open ? glyphs[1] : glyphs[0]}
            </span>
          ) : null}
        </button>
      </H>
      <Collapse {...panel} className={`acc__panel${panelClassName ? ` ${panelClassName}` : ''}`}>
        {children}
      </Collapse>
    </div>
  );
}
