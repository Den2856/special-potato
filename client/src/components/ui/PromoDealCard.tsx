// PromoDealCard.tsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type RspImg = { small: string; medium: string; large: string };

type PromoDealCardProps = {
  title: string;
  items: string[];
  priceText: string;        // "$21.99"
  saveText?: string;        // "Save $4"
  ctaText?: string;         // "Order Now" по умолчанию
  to?: string;              // ссылка для кнопки
  imageLeft: RspImg;
  imageRight: RspImg;
  size?: "sm" | "lg";       // вид карточки: как верхние (sm) или нижняя широкая (lg)
  bgClass?: string;         // фон: "bg-fire-red" | "bg-dark" | "bg-brand-yellow"
  theme?: "light" | "dark"; // цвет текста
  className?: string;
};

const PromoDealCard: React.FC<PromoDealCardProps> = ({
  title,
  items,
  priceText,
  saveText,
  ctaText = "Order Now",
  to,
  imageLeft,
  imageRight,
  size = "sm",
  bgClass = "bg-fire-red",
  theme = "dark",
  className = "",
}) => {
  const isLg = size === "lg";
  const textBase = theme === "dark" ? "text-white" : "text-dark";

  // refs для анимации прокрутки
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftImgRef = useRef<HTMLImageElement | null>(null);
  const rightImgRef = useRef<HTMLImageElement | null>(null);

  // плавное обновление по скроллу
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    const update = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // центр карточки vs. центр вьюпорта
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;

      // нормализуем дистанцию до диапазона [0..1]
      const dist = Math.min(Math.abs(cardCenter - viewportCenter), vh / 1.2);
      const progress = 1 - dist / (vh / 1.2); // 0 у краёв, 1 возле центра
      const clamped = Math.max(0, Math.min(1, progress));

      // максимальный добавочный угол
      const MAX_DEG = 14; // можно чуть подправить по вкусу

      const leftDeg = clamped * MAX_DEG;   // левая — по часовой
      const rightDeg = -clamped * MAX_DEG; // правая — против часовой

      if (leftImgRef.current) {
        leftImgRef.current.style.transform = `rotate(${leftDeg}deg)`;
      }
      if (rightImgRef.current) {
        rightImgRef.current.style.transform = `rotate(${rightDeg}deg)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const CTA = to ? (
    <Link
      to={to}
      className="inline-flex h-8 items-center rounded-full bg-white px-3 text-sm font-medium text-dark hover:opacity-90 transition"
    >
      {ctaText}
    </Link>
  ) : (
    <button className="inline-flex h-8 items-center rounded-full bg-white px-3 text-sm font-medium text-dark hover:opacity-90 transition">
      {ctaText}
    </button>
  );

  return (
    <div
      ref={containerRef}
      className={[
        "relative overflow-hidden rounded-3xl",
        bgClass,
        textBase,
        isLg ? "h-[420px] md:h-[460px] max-sm:h-[320px]" : "h-[320px] md:h-[460px]",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      {/* Контент — твои классы не менял */}
      <div className={["relative z-10 w-full", isLg ? "p-6 md:p-8" : "p-4 md:p-5"].join(" ")}>
        <div className="flex items-start justify-between top-[28px] relative gap-4">
          <div className={isLg ? "max-w-[560px]" : "max-w-[320px]"}>
            <h3 className="mb-3 text-base md:text-[28px] font-extrabold">
              {title}
            </h3>
            <ul className={isLg ? "space-y-2" : "space-y-1 text-[20px] md:text-[16px]"}>
              {items.map((t, i) => (
                <li key={i} className="relative pl-4">
                  <span
                    className={`absolute left-0 top-2 block ${theme === "dark" ? "bg-white" : "bg-dark"} rounded-full ${
                      isLg ? "h-1.5 w-1.5" : "h-1 w-1"
                    }`}
                  />
                  {t}
                </li>
              ))}
            </ul>
            <div className={isLg ? "mt-4" : "mt-3"}>{CTA}</div>
          </div>

          <div className="ml-auto text-right">
            <div className="text-[22px] font-semibold">{priceText}</div>
            {saveText ? <div className="text-[22px] opacity-90">— {saveText}</div> : null}
          </div>
        </div>
      </div>

      {/* Левая пицца — вращение добавляю ТОЛЬКО на <img>, чтобы не трогать твои классы на wrapper */}
      <picture
        aria-hidden
        className={[
          "pointer-events-none absolute drop-shadow-xl",
          isLg
            ? "left-[-10%] top-[45%] max-sm:top-[60%] lg:top-[30%] w-[70%] rotate-[6deg]"
            : "left-[-40%] top-[45%] w-[100%] rotate-[6deg]",
        ].join(" ")}
      >
        <source media="(min-width:1024px)" srcSet={imageLeft.large} />
        <source media="(min-width:768px)" srcSet={imageLeft.medium} />
        <img
          ref={leftImgRef}
          src={imageLeft.small}
          alt=""
          className="w-full h-full object-contain"
          style={{ transform: "rotate(0deg)", transition: "transform 0.12s linear" }}
        />
      </picture>

      {/* Правая пицца */}
      <picture
        aria-hidden
        className={[
          "pointer-events-none absolute drop-shadow-xl",
          isLg
            ? "right-[-10%] top-[45%] max-sm:top-[60%] lg:top-[30%] w-[74%] rotate-[6deg]"
            : "right-[-40%] top-[40%] w-[100%] rotate-[6deg]",
        ].join(" ")}
      >
        <source media="(min-width:1024px)" srcSet={imageRight.large} />
        <source media="(min-width:768px)" srcSet={imageRight.medium} />
        <img
          ref={rightImgRef}
          src={imageRight.small}
          alt=""
          className="w-full h-full object-contain"
          style={{ transform: "rotate(0deg)", transition: "transform 0.12s linear" }}
        />
      </picture>
    </div>
  );
};

export default PromoDealCard;
