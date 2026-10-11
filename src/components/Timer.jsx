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
    <div className="rounded-xl border border-line p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 text-sm text-muted">Таймер</div>
          <div
            className={`font-display text-3xl font-semibold leading-none tabular-nums transition-colors duration-500 ${
              isAlmostDone ? "text-wine" : "text-ink"
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
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 ${
              isDone
                ? "cursor-not-allowed border-line text-muted opacity-60"
                : running
                ? "border-wine text-wine"
                : "border-accent bg-accent text-ivory hover:bg-accent-strong"
            }`}
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Сбросить таймер"
            className="btn-quiet grid h-11 w-11 place-items-center !rounded-full"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full bg-accent transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isDone && (
        <div role="status" className="mt-3 text-center text-sm font-medium text-accent">
          Время вышло!
        </div>
      )}
    </div>
  );
}
