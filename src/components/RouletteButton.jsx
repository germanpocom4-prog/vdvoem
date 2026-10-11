import { motion } from "framer-motion";

export default function RouletteButton({ onClick, loading, hasIdea }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      disabled={loading}
      className="rounded-xl bg-accent px-8 py-4 text-base font-semibold text-ivory shadow-cta transition-[background-color,box-shadow] duration-300 hover:bg-accent-strong hover:shadow-cta-hover disabled:opacity-80"
    >
      {loading ? "Ищу…" : hasIdea ? "Вытянуть другую" : "Вытянуть карту"}
    </motion.button>
  );
}
