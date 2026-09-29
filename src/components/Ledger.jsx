// Definition list with dotted leaders. items: [{ k, v, hidden? }]. Rows whose value is null/undefined/false are skipped.
export default function Ledger({ items = [], className = '', ...rest }) {
  return (
    <dl className={`ledger${className ? ` ${className}` : ''}`} {...rest}>
      {items
        .filter((it) => it && it.v != null && it.v !== false && it.v !== '')
        .map((it) => (
          <div className="ledger__row" key={it.k}>
            <dt className="ledger__k">{it.k}</dt>
            <dd className="ledger__v">{it.v}</dd>
          </div>
        ))}
    </dl>
  );
}
