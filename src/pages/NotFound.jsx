import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EmptyState from "../components/EmptyState";

const MotionLink = motion(Link);

export default function NotFound() {
  return (
    <div className="py-16 text-center md:py-24">
      <EmptyState
        title="Страница не найдена"
        subtitle="Такой страницы здесь нет. Вернёмся к началу?"
      />
      <MotionLink
        to="/"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-4 inline-block rounded-xl bg-accent px-8 py-3.5 font-semibold text-ivory shadow-cta transition-[background-color,box-shadow] duration-300 hover:bg-accent-strong hover:shadow-cta-hover"
      >
        На главную
      </MotionLink>
    </div>
  );
}
