import { motion } from "framer-motion";

// Плавное появление с каскадом: элементы списка выходят по очереди
export default function Reveal({ i = 0, className = "h-full", children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(i, 12) * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
