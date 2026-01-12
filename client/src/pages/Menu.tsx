// pages/Menu.tsx
import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // ⬅ добавили
import MenuFilters, { type FilterItem } from "../components/ui/MenuFilters";
import MenuList from "../components/menus/MenuList";
import Header from "../components/Header";
import SectionIntro from "../components/ui/SectionIntro";
import { motion } from "framer-motion";
import FuzzyText from "../components/bits/FuzzyText";
import NewsletterSignup from "../components/home/NewsletterSignup";
import Footer from "../components/home/Footer";

type Category = "all" | "pizza" | "pasta" | "sides" | "dessert" | "drinks";
type CategoryOrNone = Category | null;

const filters: FilterItem[] = [
  { id: "all", label: "Full Menu" },
  { id: "pizza", label: "Pizza", iconSrc: "/icons/pizza.png" },
  { id: "pasta", label: "Pasta", iconSrc: "/icons/pasta.png" },
  { id: "sides", label: "Sides", iconSrc: "/icons/sides.png" },
  { id: "dessert", label: "Deserts", iconSrc: "/icons/deserts.png" },
  { id: "drinks", label: "Drinks", iconSrc: "/icons/drinks.png" },
];

const ENDPOINTS = {
  pizza:   "/api/pizzas",
  dessert: "/api/desserts",
  pasta:   "/api/pasta",
  sides:   "/api/sides",
  drinks:  "/api/drinks",
} as const;


const MenuEmpty404: React.FC = () => (
  <div className="mx-auto max-w-6xl px-4 md:px-6 py-14">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-4 rounded-2xl bg-white/60 ring-1 ring-black/5 p-10"
    >
      <motion.div
        aria-hidden
        animate={{ rotate: [0, -8, 8, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-[92px] md:text-[120px] leading-none select-none"
      >
        <FuzzyText 
          baseIntensity={0.2} 
        >
          404
        </FuzzyText>
      </motion.div>
      <h2 className="text-3xl md:text-4xl font-bold text-dark">Nothing selected</h2>
      <p className="max-w-xl text-gray-600 text-base md:text-lg">
        Pick a category above to see our menu items. When no filter is selected, the menu is empty.
      </p>
    </motion.div>
  </div>
);

const MenuPage: React.FC = () => {
  const [active, setActive] = useState<CategoryOrNone>("all");
  const location = useLocation();
  const navigate = useNavigate();

  const isValidCat = (v: string | null): v is Category =>
    !!v && ["all","pizza","pasta","sides","dessert","drinks"].includes(v);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");
    if (isValidCat(cat)) {
      setActive(cat);
    } else if (cat === null) {
    }
  }, [location.search]);

  const handleFilterChange = (id: string) => {
    setActive((prev) => {
      const next = prev === id ? null : (id as Category);
      if (next === null) navigate("/menu", { replace: false });
      else navigate(`/menu?cat=${next}`, { replace: false });
      return next;
    });
  };

  const endpoints = useMemo<string[]>(
    () =>
      active == null
        ? []
        : active === "all"
          ? Object.values(ENDPOINTS)
          : [ENDPOINTS[active as Exclude<Category, "all">]],
    [active]
  );

  return (
    <>
      <Header />
      <section className="pt-6 pb-0  mt-[75px]">
        <MenuFilters
          items={filters}
          activeId={active ?? undefined}
          onChange={handleFilterChange}
          className="mb-6 mx-auto max-w-6xl px-4 md:px-6"
        />

        {active == null ? (
          <MenuEmpty404 />
        ) : (
          <>
            <SectionIntro active={active as Category} />
            <MenuList endpoints={endpoints} />
            <NewsletterSignup />
            <Footer />
          </>
        )}
      </section>
    </>
  );
};

export default MenuPage;
