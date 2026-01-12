export type Category = "all" | "pizza" | "pasta" | "sides" | "dessert" | "drinks";

export type RspImage = { small: string; medium: string; large: string };

export type ApiItem = {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  ingredients?: string;
  price: number;
  image: RspImage | string;
};

export type MenuItem = ApiItem & {
  id: string;
  category: Exclude<Category, "all">;
};
