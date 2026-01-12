import PromoDealCard from "../ui/PromoDealCard";

export default function DealsGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-4 max-w-[1440px] mx-auto">
      {/* верхний левый — красный, белый текст */}
      <PromoDealCard
        size="sm"
        bgClass="bg-fire-red"
        theme="dark"
        title="Spicy Duo Deal"
        items={["1 Medium Firecracker Inferno", "1 Medium Buffalo Bliss"]}
        priceText="$21.99"
        saveText="Save $4"
        to="/checkout"
        imageLeft={{ small:"/promo/1.png", medium:"/promo/1.png", large:"/promo/1.png" }}
        imageRight={{ small:"/promo/2.png", medium:"/promo/2.png", large:"/promo/2.png" }}
      />

      <PromoDealCard
        size="sm"
        bgClass="bg-yellow-50"
        theme="light"
        title="Cheese Lovers Pair"
        items={["1 Medium Cheese Avalanche", "1 Medium Truffle Temptation"]}
        priceText="$22.99"
        saveText="Save $5"
        to="/checkout"
        imageLeft={{ small:"/promo/3.png", medium:"/promo/3.png", large:"/promo/3.png" }}
        imageRight={{ small:"/promo/4.png", medium:"/promo/4.png", large:"/promo/4.png" }}
      />

      {/* снизу на всю ширину — тёмный фон, белый текст */}
      <div className="md:col-span-2">
        <PromoDealCard
          size="lg"
          bgClass="bg-dark"
          theme="dark"
          title="Meat Feast Combo"
          items={["1 Medium Meat Lover's Feast", "1 Medium BBQ Blaze"]}
          priceText="$23.99"
          saveText="Save $6"
          to="/checkout"
          imageLeft={{ small:"/promo/5_mob.png", medium:"/promo/5.png", large:"/promo/5.png" }}
          imageRight={{ small:"/promo/6_mob.png", medium:"/promo/6.png", large:"/promo/6.png" }}
        />
      </div>
      <PromoDealCard
        size="sm"
        bgClass="bg-green-30"
        theme="dark"
        title="Veggie Delight Duo"
        items={["1 Medium Mediterranean Marvel", "1 Medium Garlic Supreme"]}
        priceText="$21.99"
        saveText="Save $4"
        to="/checkout"
        imageLeft={{ small:"/promo/7.png", medium:"/promo/7.png", large:"/promo/7.png" }}
        imageRight={{ small:"/promo/8.png", medium:"/promo/8.png", large:"/promo/8.png" }}
      />

      <PromoDealCard
        size="sm"
        bgClass="bg-orange-50"
        theme="dark"
        title="Sweet & Savory Combo"
        items={["1 Medium Hawaiian Heatwave", "1 Medium Pepperoni Popper"]}
        priceText="$22.99"
        saveText="Save $5"
        to="/checkout"
        imageLeft={{ small:"/promo/9.png", medium:"/promo/9.png", large:"/promo/9.png" }}
        imageRight={{ small:"/promo/10.png", medium:"/promo/10.png", large:"/promo/10.png" }}
      />
    </section>
  );
}
