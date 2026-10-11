import { useState } from "react";
import html2canvas from "html2canvas";
import { Share2, Loader2 } from "lucide-react";

export default function ShareButton({ idea }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);

    // Создаём временный div с красивой карточкой 1080x1080
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1080px";
    container.style.height = "1080px";
    container.style.background =
      "linear-gradient(135deg, #0a0a0f 0%, #16161f 50%, #1a1015 100%)";
    container.style.padding = "80px";
    container.style.boxSizing = "border-box";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "space-between";
    container.style.fontFamily = "Inter, system-ui, sans-serif";
    container.style.color = "#fff";
    container.style.position = "fixed";

    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:42px;font-weight:700;letter-spacing:-1px;">
          Вдвоём<span style="color:#f59e0b;">.</span>
        </div>
        <div style="font-size:22px;color:#f59e0b;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
          Идея для пары
        </div>
      </div>

      <div>
        <div style="font-size:28px;color:#f59e0b;margin-bottom:32px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
          ${getEmoji(idea.category)} ${getCategoryName(idea.category)}
        </div>
        <div style="font-size:86px;font-weight:800;line-height:1.05;letter-spacing:-2px;margin-bottom:40px;">
          ${idea.title}
        </div>
        <div style="font-size:38px;color:#c0c0d0;line-height:1.4;max-width:900px;">
          ${idea.description}
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #26263a;padding-top:40px;">
        <div style="font-size:26px;color:#707080;">
          vdvoem-black.vercel.app
        </div>
        <div style="font-size:26px;color:#707080;">
          ${new Date().toLocaleDateString("ru-RU")}
        </div>
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
      document.body.removeChild(container);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="px-4 rounded-2xl border border-border text-gray-400 hover:text-amber hover:border-amber/50 transition flex items-center justify-center gap-2"
      title="Поделиться картинкой"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Share2 size={18} />
      )}
    </button>
  );
}

// Хелперы
function getCategoryName(id) {
  const map = {
    funny: "Весёлые",
    romantic: "Романтика",
    adult: "18+",
    drinks: "Выпивка",
    hardcore: "Сложные",
    distance: "На расстоянии",
    makeup: "Помириться",
  };
  return map[id] || "Идея";
}

function getEmoji(id) {
  const map = {
    funny: "🎉",
    romantic: "💕",
    adult: "🔥",
    drinks: "🍸",
    hardcore: "🏆",
    distance: "🌍",
    makeup: "🕊️",
  };
  return map[id] || "✨";
}