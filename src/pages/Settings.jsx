import { useAppStore } from "../store/useAppStore";
import PageTitle from "../components/PageTitle";
import HeartMark from "../components/HeartMark";

export default function Settings() {
  const { resetAll, streak, history } = useAppStore();

  return (
    <div className="space-y-8 py-8 md:py-12">
      <PageTitle title="Настройки" />

      <div className="max-w-2xl space-y-5">
        <div className="space-y-4 rounded-tile border border-line bg-paper p-6">
          <div>
            <div className="mb-1 font-semibold">О приложении</div>
            <p className="text-sm text-ink-soft">
              Вдвоём — приложение для пар. Рулетка идей, квесты на вечер,
              категории для любого настроения. Всё хранится только в твоём
              браузере.
            </p>
          </div>

          <div className="space-y-1 border-t border-line pt-4 text-sm text-ink-soft">
            <div>
              Стрик: <span className="font-semibold text-ink">{streak}</span>
            </div>
            <div>
              Сделано:{" "}
              <span className="font-semibold text-ink">{history.length}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Сбросить всю историю, стрик и избранное?")) {
              resetAll();
              alert("Сброшено");
            }
          }}
          className="w-full rounded-2xl border-2 border-cherry py-3 font-semibold text-cherry transition-colors hover:bg-cherry hover:text-white"
        >
          Сбросить все данные
        </button>

        <div className="flex items-center justify-center gap-1.5 pt-4 text-sm text-ink-soft">
          Сделано с <HeartMark className="h-4 w-4 text-cherry" />
        </div>
      </div>
    </div>
  );
}
