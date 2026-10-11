import { NavLink } from "react-router-dom";
import { Home, Grid3x3, Film, Trophy, BarChart3, Settings } from "lucide-react";

const links = [
  { to: "/", icon: Home, label: "Главная" },
  { to: "/ideas", icon: Grid3x3, label: "Идеи" },
  { to: "/movies", icon: Film, label: "Кино" },
  { to: "/quests", icon: Trophy, label: "Квесты" },
  { to: "/progress", icon: BarChart3, label: "Прогресс" },
  { to: "/settings", icon: Settings, label: "Настройки" },
];

function Logo() {
  return (
    <NavLink to="/" className="font-display text-[22px] font-bold text-ink">
      Вдвоём<span className="text-accent">.</span>
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <>
      {/* Мобильная шапка: только логотип */}
      <header className="px-5 pt-6 md:hidden">
        <Logo />
      </header>

      {/* Desktop */}
      <nav className="fixed left-0 right-0 top-0 z-40 hidden border-b border-line bg-page/90 backdrop-blur-md md:flex">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-8">
          <Logo />
          <div className="flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `border-b pb-0.5 text-sm transition-colors duration-300 ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-transparent text-muted hover:text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-page/95 md:hidden">
        <div className="flex justify-around px-1 py-2.5">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-2 py-1 text-[11px] transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-muted"
                  }`
                }
              >
                <Icon size={18} />
                <span>{l.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
