import { useAppStore } from "../store/useAppStore";

export default function Settings() {
  const { resetAll, streak, history } = useAppStore();

  return (
    <div className="py-8 space-y-6">
      <h1 className="font-display text-3xl md:text-4xl">Настройки</h1>

      <div className="rounded-3xl bg-card border border-border p-6 space-y-4">
        <div>
          <div className="font-semibold mb-1">О приложении</div>
          <p className="text-sm text-gray-400">
            Вдвоём — приложение для пар. Рулетка идей, квесты на вечер, категории
            для любого настроения. Всё хранится только в твоём браузере.
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <div className="text-sm text-gray-400">
            Стрик: <span className="text-amber font-semibold">{streak}</span>
          </div>
          <div className="text-sm text-gray-400">
            Сделано: <span className="text-amber font-semibold">{history.length}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          if (confirm("Сбросить всю историю, стрик и избранное?")) {
            resetAll();
            alert("Сброшено");
          }
        }}
        className="w-full py-3 rounded-2xl border border-wine/50 text-wine hover:bg-wine/10 transition"
      >
        Сбросить все данные
      </button>

      <div className="text-center text-xs text-gray-500 pt-4">
        Сделано с 💞
      </div>
    </div>
  );
}