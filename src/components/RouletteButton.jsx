import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function RouletteButton({ onClick, loading }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={loading}
      className="relative w-full max-w-md mx-auto py-8 rounded-3xl font-display text-xl md:text-2xl tracking-tight bg-gradient-to-br from-amber via-amber to-wine text-bg overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative flex items-center justify-center gap-3">
        <Sparkles size={24} />
        {loading ? "Ищу..." : "Крутануть"}
      </span>
    </motion.button>
  );
}