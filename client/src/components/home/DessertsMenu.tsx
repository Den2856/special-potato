import React from "react";
import ProductsGrid from "../menus/ProductGrid";

const DessertsMenu: React.FC = () => {
  return <ProductsGrid endpoint="/api/desserts" bgClass="bg-white" cardBgClass="bg-fire-red-98" limit={3} />;
};

export default DessertsMenu;
