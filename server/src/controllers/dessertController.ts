import { Request, Response } from 'express';
import Dessert from '../models/Dessert';

export const getDesserts = async (_req: Request, res: Response) => {
  try {
    const desserts = await Dessert.find();
    res.json(desserts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addDessert = async (req: Request, res: Response) => {
  const {
    name,
    description,
    ingredients,
    nutritionalInfo,
    allergens,
    price,
    image,
  } = req.body;

  try {
    const newDessert = new Dessert({
      name,
      description,
      ingredients,
      nutritionalInfo,
      allergens,
      price,
      image,
    });

    await newDessert.save();
    res.status(201).json(newDessert);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
