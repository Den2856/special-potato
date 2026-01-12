import { Request, Response } from 'express';
import Sides from '../models/Sides';

export const getSides = async (_req: Request, res: Response) => {
  try {
    const Side = await Sides.find();
    res.json(Side);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addSides = async (req: Request, res: Response) => {
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
    const newSides = new Sides({
      name,
      description,
      ingredients,
      nutritionalInfo,
      allergens,
      price,
      image,
    });

    await newSides.save();
    res.status(201).json(newSides);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
