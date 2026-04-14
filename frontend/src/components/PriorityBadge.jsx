//  PriorityBadge.jsx
import { PRIORITY_META } from "../data/constants";

export function PriorityBadge({ priority, dark }) {
  const m = PRIORITY_META[priority];
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${dark ? `${m.darkBg} ${m.color}` : m.lightBg}`}
    >
      {m.label}
    </span>
  );
}
