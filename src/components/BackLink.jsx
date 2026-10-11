import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const cls =
  "inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent";

export default function BackLink({ to, onClick, children }) {
  if (to) {
    return (
      <Link to={to} className={cls}>
        <ArrowLeft size={16} /> {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      <ArrowLeft size={16} /> {children}
    </button>
  );
}
