import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

// minutes — сколько минут отсчитывать
export default function Timer({ minutes = 30 }) {
  const total = minutes * 60; // в секундах
  const [secondsLeft, setSecondsLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, secondsLeft]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSecondsLeft(total);
  };

  const toggle = () => setRunning((r) => !r);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const progress = ((total - secondsLeft) / total) * 100;

  const isDone = secondsLeft === 0;
  const isAlmostDone = secondsLeft <= 60 && secondsLeft > 0;

  return (
    <div className="rounded-2xl bg-paper p-4 text-ink">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 text-sm font-medium text-ink-soft">Таймер</div>
          <div
            className={`font-display text-4xl leading-none tabular-nums ${
              isAlmostDone ? "animate-pulse text-cherry" : "text-ink"
            }`}
          >
            {mm}:{ss}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggle}
            disabled={isDone}
            aria-label={running ? "Пауза" : "Старт"}
            className={`grid h-12 w-12 place-items-center rounded-full transition-colors ${
              isDone
                ? "cursor-not-allowed bg-line text-ink-soft"
                : running
                ? "bg-cherry text-white hover:bg-[#c42740]"
                : "bg-ink text-white hover:bg-black"
            }`}
          >
            {running ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Сбросить таймер"
            className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full bg-ink transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isDone && (
        <div
          role="status"
          className="mt-3 text-center text-sm font-semibold text-cherry"
        >
          Время вышло!
        </div>
      )}
    </div>
  );
}
