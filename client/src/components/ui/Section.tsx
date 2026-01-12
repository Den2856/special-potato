import React from "react";

interface SectionProps {
  title: string;
  description: string;
  bgColor: string;
}

const Section: React.FC<SectionProps> = ({ title, description, bgColor }) => {
  return (
    <section className={`pt-20 pb-12 px-4 text-center ${bgColor}`}>
      <h2 className="text-4xl font-extrabold text-dark">{title}</h2>
      <p className="mt-4 text-lg text-dark">{description}</p>
    </section>
  );
};

export default Section;
