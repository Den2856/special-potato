import React from "react";

export type CityCardProps = {
  name: string;
  image: string;
  tintClass?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

const CityCard: React.FC<CityCardProps> = ({
  name,
  image,
  tintClass,
  active,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!active}
      className={[
        "relative w-[188px] h-[188px] shrink-0 overflow-hidden rounded-[26px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "transition-transform duration-200 hover:scale-[1.02]",
        className,
      ].join(" ")}
    >
      <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className={[
          "absolute inset-0 bg-gradient-to-b",
          tintClass ?? "from-black/45 via-black/15 to-transparent",
          "mix-blend-multiply",
        ].join(" ")}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span className="text-white text-[22px] font-extrabold leading-none drop-shadow">
          {name}
        </span>
      </div>
    </button>
  );
};

export default CityCard;
