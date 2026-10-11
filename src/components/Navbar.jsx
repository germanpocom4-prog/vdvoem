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

export default function Navbar() {
  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-bg/80 border-b border-border">
        <div className="max-w-5xl mx-auto w-full px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-display text-xl tracking-tight">
            Вдвоём<span className="text-amber">.</span>
          </NavLink>
          <div className="flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-amber/10 text-amber"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-bg/90 border-t border-border">
        <div className="flex justify-around py-2">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] ${
                    isActive ? "text-amber" : "text-gray-500"
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