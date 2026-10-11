import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";

export default function RouletteButton({ onClick, loading, hasIdea }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-cherry px-6 py-4 text-lg font-semibold text-white shadow-lift transition-colors hover:bg-[#c42740] disabled:opacity-80"
    >
      <Shuffle size={20} />
      {loading ? "Тасуем…" : hasIdea ? "Вытянуть другую" : "Вытянуть карту"}
    </motion.button>
  );
}
