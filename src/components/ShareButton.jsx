import { useState } from "react";
import html2canvas from "html2canvas";
import { Share2, Loader2 } from "lucide-react";
import { getCategory } from "../data/categories";

export default function ShareButton({ idea }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);

    const cat = getCategory(idea.category);
    const stripe = cat?.color || "#E8DFD0";

    // Временная карточка 1080x1080 в стиле «бутик-отеля»
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1080px";
    container.style.height = "1080px";
    container.style.background = "#F5F0E8";
    container.style.color = "#2A2520";
    container.style.padding = "96px 96px 96px 120px";
    container.style.boxSizing = "border-box";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "space-between";
    container.style.fontFamily = 'Inter, system-ui, sans-serif';

    container.innerHTML = `
      <div style="position:absolute;left:0;top:0;bottom:0;width:16px;background:${stripe};"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:46px;font-weight:700;">
          Вдвоём<span style="color:#C68A3E;">.</span>
        </div>
        <div style="font-size:28px;color:#6B625A;">
          ${cat?.emoji || ""} ${cat?.name || "Идея для пары"}
        </div>
      </div>

      <div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:92px;font-weight:600;line-height:1.12;margin-bottom:44px;">
          ${idea.title}
        </div>
        <div style="font-size:38px;line-height:1.6;color:#6B625A;max-width:860px;">
          ${idea.description}
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;border-top:2px solid #E8DFD0;padding-top:40px;font-size:26px;color:#6B625A;">
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
      className="btn-quiet grid w-12 shrink-0 place-items-center"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Share2 size={18} />
      )}
    </button>
  );
}
