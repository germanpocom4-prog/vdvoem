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
    <div className="rounded-2xl bg-bg border border-border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
            Таймер
          </div>
          <div
            className={`font-display text-3xl tabular-nums transition ${
              isAlmostDone ? "text-wine animate-pulse" : "text-amber"
            }`}
          >
            {mm}:{ss}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggle}
            disabled={isDone}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              isDone
                ? "bg-card border border-border text-gray-500 cursor-not-allowed"
                : running
                ? "bg-wine/20 border border-wine text-wine hover:bg-wine/30"
                : "bg-amber text-bg hover:bg-amber/90"
            }`}
          >
            {running ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={reset}
            className="w-12 h-12 rounded-full bg-card border border-border text-gray-400 flex items-center justify-center hover:text-white transition"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className="mt-3 h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-amber transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isDone && (
        <div className="mt-3 text-sm text-amber font-semibold text-center">
          ⏰ Время вышло!
        </div>
      )}
    </div>
  );
}