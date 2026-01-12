import { Request, Response } from 'express';
import Pizza from '../models/Pizza';

export const getPizzas = async (req: Request, res: Response) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addPizza = async (req: Request, res: Response) => {
  const { name, ingredients, nutritionalInfo, allergens, price, image } = req.body;

  try {
    const newPizza = new Pizza({
      name,
      ingredients,
      nutritionalInfo,
      allergens,
      price,
      image,
    });
    await newPizza.save();
    res.status(201).json(newPizza);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
