import { useAppStore } from "../store/useAppStore";
import PageTitle from "../components/PageTitle";
import HeartMark from "../components/HeartMark";
import Reveal from "../components/Reveal";

export default function Settings() {
  const { resetAll, streak, history } = useAppStore();

  return (
    <div className="space-y-12 py-16 md:space-y-16 md:py-24">
      <PageTitle title="Настройки" />

      <div className="max-w-2xl space-y-6">
        <Reveal i={0} className="">
          <div className="card space-y-5 p-7 md:p-8">
            <div>
              <div className="mb-2 font-display text-[1.5rem] font-semibold">
                О приложении
              </div>
              <p className="text-[15px] text-muted">
                Вдвоём — приложение для пар. Рулетка идей, квесты на вечер,
                категории для любого настроения. Всё хранится только в твоём
                браузере.
              </p>
            </div>

            <div className="space-y-1 border-t border-line pt-5 text-[15px] text-muted">
              <div>
                Стрик: <span className="font-semibold text-ink">{streak}</span>
              </div>
              <div>
                Сделано:{" "}
                <span className="font-semibold text-ink">{history.length}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal i={1} className="">
          <button
            type="button"
            onClick={() => {
              if (confirm("Сбросить всю историю, стрик и избранное?")) {
                resetAll();
                alert("Сброшено");
              }
            }}
            className="w-full rounded-xl border border-wine py-3.5 font-semibold text-wine transition-colors duration-300 hover:bg-wine hover:text-ivory"
          >
            Сбросить все данные
          </button>
        </Reveal>

        <div className="flex items-center justify-center gap-2 pt-6 text-sm text-muted">
          Сделано с <HeartMark className="h-4 w-4 text-wine" />
        </div>
      </div>
    </div>
  );
}
