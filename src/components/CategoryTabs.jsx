const categories = [
  { label: "Topping",    icon: "🍫" },
  { label: "Kopi",       icon: "☕" },
  { label: "Bubuk Kopi", icon: "🫙" },
  { label: "Snack",      icon: "🍿" },
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="category-tabs">
      {categories.map(({ label, icon }) => (
        <button
          key={label}
          className={`cat-tab${active === label ? " active" : ""}`}
          onClick={() => onChange(label)}
        >
          <span className="cat-icon">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
}