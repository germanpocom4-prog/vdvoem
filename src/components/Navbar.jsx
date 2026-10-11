import { NavLink } from "react-router-dom";
import { Home, Grid3x3, Film, Trophy, BarChart3, Settings } from "lucide-react";
import HeartMark from "./HeartMark";

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
    <NavLink to="/" className="inline-flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-white">
        <HeartMark className="h-4 w-4" />
      </span>
      <span className="font-display text-xl">Вдвоём</span>
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <>
      {/* Мобильная шапка: только логотип, уезжает вместе со страницей */}
      <header className="px-4 pt-5 md:hidden">
        <Logo />
      </header>

      {/* Desktop */}
      <nav className="fixed left-0 right-0 top-0 z-40 hidden border-b border-line bg-table/85 backdrop-blur-md md:flex">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-ink text-white"
                      : "text-ink-soft hover:bg-ink/5 hover:text-ink"
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
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md md:hidden">
        <div className="flex justify-around px-1 py-2">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-1.5 text-[11px] font-medium ${
                    isActive ? "text-ink" : "text-ink-soft"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${
                        isActive ? "bg-ink text-white" : ""
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span>{l.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
