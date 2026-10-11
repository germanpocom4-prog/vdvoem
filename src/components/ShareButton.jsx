import { useState } from "react";
import html2canvas from "html2canvas";
import { Share2, Loader2 } from "lucide-react";
import { getCategory } from "../data/categories";

const HEART_PATH =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.8 1.1 5.4 3 1.6-1.9 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21z";

export default function ShareButton({ idea }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);

    const cat = getCategory(idea.category);
    const fill = cat?.color || "#FFFFFF";
    const fg = cat?.fg || "#1E1633";

    // Временная карточка 1080x1080 в стиле «карты» из колоды
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1080px";
    container.style.height = "1080px";
    container.style.background = fill;
    container.style.color = fg;
    container.style.padding = "80px";
    container.style.boxSizing = "border-box";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "space-between";
    container.style.fontFamily = '"Golos Text", system-ui, sans-serif';

    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="width:64px;height:64px;border-radius:16px;background:#3340E0;display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="#fff"><path d="${HEART_PATH}"/></svg>
          </div>
          <div style="font-family:'Yeseva One',Georgia,serif;font-size:48px;">Вдвоём</div>
        </div>
        <div style="font-size:30px;font-weight:600;">
          ${cat?.emoji || ""} ${cat?.name || "Идея для пары"}
        </div>
      </div>

      <div>
        <div style="font-family:'Yeseva One',Georgia,serif;font-size:100px;line-height:1.05;margin-bottom:44px;">
          ${idea.title}
        </div>
        <div style="font-size:40px;line-height:1.4;max-width:900px;opacity:.92;">
          ${idea.description}
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;border-top:2px solid ${fg};padding-top:40px;font-size:28px;font-weight:500;">
        <div>vdvoem-black.vercel.app</div>
        <div>${new Date().toLocaleDateString("ru-RU")}</div>
      </div>
    `;

    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 1,
        width: 1080,
        height: 1080,
      });

      document.body.removeChild(container);

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      const file = new File([blob], "vdvoem.png", { type: "image/png" });

      // Если браузер поддерживает Web Share API с файлами (iOS, Android)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: idea.title,
            text: `${idea.title} — идея с сайта «Вдвоём»`,
          });
        } catch (err) {
          // Пользователь отменил — ничего не делаем
        }
      } else {
        // Иначе — скачиваем
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `vdvoem-${idea.id}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Ошибка генерации картинки:", err);
      if (container.parentNode) document.body.removeChild(container);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={loading}
      aria-label="Поделиться картинкой"
      title="Поделиться картинкой"
      className="grid w-12 shrink-0 place-items-center rounded-2xl transition-colors hover:bg-white/20"
      style={{ border: "1.5px solid currentColor" }}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Share2 size={18} />
      )}
    </button>
  );
}
