import { AnimatePresence, motion } from "framer-motion";
import IdeaCard from "./IdeaCard";
import HeartMark from "./HeartMark";

const flip = {
  initial: { rotateY: -90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
  transition: { duration: 0.22, ease: "easeOut" },
};

// Колода рубашкой вверх: три карты стопкой, верхняя тасуется при выборе
function DeckStack({ loading, onDraw }) {
  return (
    <button
      type="button"
      onClick={onDraw}
      disabled={loading}
      aria-label="Вытянуть карту"
      className="relative mx-auto block aspect-[5/6] w-full max-w-[17rem] disabled:cursor-wait md:max-w-none"
    >
      <div
        className="card-back absolute inset-0 rounded-card border border-white/40 shadow-lift"
        style={{ transform: "rotate(-5deg) translate(-10px, 6px)" }}
      />
      <div
        className="card-back absolute inset-0 rounded-card border border-white/40 shadow-lift"
        style={{ transform: "rotate(3deg) translate(8px, 3px)" }}
      />
      <motion.div
        className="card-back absolute inset-0 rounded-card shadow-card"
        animate={
          loading
            ? { x: [0, -8, 8, -5, 5, 0], rotate: [0, -3, 3, -2, 2, 0] }
            : { x: 0, rotate: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-3 rounded-[18px] border-2 border-white/70" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-cherry shadow-lift">
            <HeartMark className="h-9 w-9" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-8 text-center text-sm font-medium text-white">
          Нажми, чтобы вытянуть
        </div>
      </motion.div>
    </button>
  );
}

export default function Deck({ idea, loading, onDraw, onComplete }) {
  const showCard = idea && !loading;

  return (
    <div style={{ perspective: 1400 }} className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {showCard ? (
          <motion.div key={idea.id} {...flip}>
            <IdeaCard idea={idea} onComplete={onComplete} />
          </motion.div>
        ) : (
          <motion.div key="deck" {...flip}>
            <DeckStack loading={loading} onDraw={onDraw} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
