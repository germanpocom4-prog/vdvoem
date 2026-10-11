// Цветная полоса слева, 3px. Родитель должен быть relative overflow-hidden
export default function Stripe({ color }) {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px]"
      style={{ background: color || "#E8DFD0" }}
    />
  );
}
