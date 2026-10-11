import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// Лёгкая бумажная текстура: fractalNoise, opacity 0.02
const PAPER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  // Раздел 18+ — «ночная комната», остальной сайт светлый
  const night = pathname.startsWith("/category/adult");

  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", night ? "#1A1410" : "#F5F0E8");
  }, [night]);

  return (
    <div className="min-h-screen pb-28 md:pb-16 md:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
        style={{ backgroundImage: PAPER, opacity: 0.02 }}
      />
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 md:px-8">
        {/* Переход между страницами: fade 300ms */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
