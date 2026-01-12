import { Request, Response } from 'express';
import Drink from '../models/Drink';

export const getDrinks = async (_req: Request, res: Response) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addDrink = async (req: Request, res: Response) => {
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
    const newDrink = new Drink({
      name,
      description,
      ingredients,
      nutritionalInfo,
      allergens,
      price,
      image,
    });

    await newDrink.save();
    res.status(201).json(newDrink);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
