import React from "react";
import ProductsGrid from "../menus/ProductGrid";

const PizzaMenu: React.FC = () => {
  return <ProductsGrid endpoint="/api/pizzas" limit={3} />;
};

export default PizzaMenu;
