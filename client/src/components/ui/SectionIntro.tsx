import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "pizza" | "pasta" | "sides" | "dessert" | "drinks";

type DecorImg = { src: string; alt: string; className?: string };

type SectionIntroProps = {
  active?: Category | string | null; // может отсутствовать
  decor?: DecorImg[];
  className?: string;
};

const CONTENT: Record<Category, { title: string; text: string }> = {
  all: {
    title: "Our Full Menu",
    text:
      "From savory, handcrafted pizzas to refreshing drinks and indulgent sides, we take pride in serving food that’s made with care and" +
      " intention. Every ingredient is chosen for its quality, and every meal is thoughtfully prepared to create a delicious, comforting experience" +
      " that lingers well beyond the last bite. At Pepper, we don’t just serve food — we serve moments worth remembering.",
  },
  pizza: {
    title: "Pizza",
    text:
      "From the classic simplicity of a traditional Margherita to the rich indulgence of gourmet truffle oil creations, we artfully blend the best of" +
      " old-world charm with modern culinary innovation. Each pizza is hand-tossed with care, topped with fresh, high-quality ingredients, and" +
      " baked to golden perfection.",
  },
  pasta: {
    title: "Pasta",
    text:
      "From the rustic kitchens of Italy to your table, our pasta is crafted with time-honored techniques and fresh, high-quality ingredients." +
      " Whether it’s a creamy Alfredo or a bold Arrabbiata, each dish embodies the essence of traditional Italian cuisine with a touch of" +
      " contemporary flair. Every forkful is a tribute to authentic flavors, cooked to al dente perfection.",
  },
  sides: {
    title: "Sides",
    text:
      "Our sides are the perfect blend of simple, satisfying flavors and creative culinary twists. From crispy truffle fries to golden mozzarella" +
      " sticks, each bite complements your meal while standing out on its own. Made to share—or not—our sides are prepared fresh with" +
      " ingredients that elevate even the smallest snack into a gourmet experience.",
  },
  dessert: {
    title: "Desserts",
    text:
      "Inspired by classic Italian sweets and modern indulgences, our desserts are the perfect finale to your dining experience. Whether it’s the" +
      " velvety layers of tiramisu or the decadent richness of molten chocolate cake, each treat is carefully crafted to balance sweetness and" +
      " sophistication. From first bite to last, our desserts are a sweet journey through time-honored recipes with a dash of creativity.",
  },
  drinks: {
    title: "Drinks",
    text:
      "Our drink menu offers a refreshing mix of timeless classics and bold, modern flavors. From freshly squeezed lemonades to expertly" +
      " brewed iced coffee, each sip is designed to complement your meal or provide a stand-alone moment of refreshment. Whether you prefer" +
      " fizzy Italian sodas or a rich cold brew, we have the perfect drink to quench your thirst and elevate your experience.",
  },
};

const SectionIntro = memo(({ active, className }: SectionIntroProps) => {
  // если категории нет/невалидна — ничего не выводим
  const isValid =
    typeof active === "string" &&
    Object.prototype.hasOwnProperty.call(CONTENT, active);

  if (!isValid) return null;

  const content = CONTENT[active as Category];

  return (
    <div className={`relative w-full overflow-visible ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active as string}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col gap-3 md:gap-4 px-4 md:px-6 mt-[16px] mb-[50px] max-w-6xl mx-auto"
        >
          <h2 className="text-4xl text-dark md:text-5xl font-bold tracking-tight">
            {content.title}
          </h2>
          <p className="max-w-4xl text-lg md:text-base text-dark leading-relaxed">
            {content.text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default SectionIntro;
