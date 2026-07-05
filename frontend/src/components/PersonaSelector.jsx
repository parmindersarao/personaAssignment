export default function PersonaSelector({ personas, selected, onChange }) {
  return (
    <select
      className="persona-select"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {Object.entries(personas).map(([id, p]) => (
        <option key={id} value={id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}