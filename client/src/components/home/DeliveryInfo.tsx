import React, { useState } from "react";
import { AccordionItem } from "../ui/Accordion";
import CityCard, { type CityCardProps } from "../ui/CityCard";

type City = Pick<CityCardProps, "name" | "image" | "tintClass">;
type Section = { title: string; content: React.ReactNode };

type Props = {
  cities: City[];
  sections: Section[];
  defaultCityIndex?: number;
  className?: string;
};

const DeliveryInfo: React.FC<Props> = ({
  cities,
  sections,
  defaultCityIndex = 0,
  className = "",
}) => {
  const [active, setActive] = useState(defaultCityIndex);

  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
        {/* Города */}
        <div className="flex flex-row gap-4 overflow-x-auto sm:overflow-visible sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cities.map((c, i) => (
            <CityCard
              key={c.name}
              name={c.name}
              image={c.image}
              tintClass={c.tintClass}
              active={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* Аккордеоны */}
        <div className="mt-6 space-y-4">
          {sections.map((sec, i) => (
            <AccordionItem
              key={sec.title}
              title={`${i + 1}. ${sec.title}`}
            >
              {sec.content}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
