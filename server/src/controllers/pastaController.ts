import { Request, Response } from 'express';
import Pastas from '../models/Pasta';

export const getPastas = async (_req: Request, res: Response) => {
  try {
    const Side = await Pastas.find();
    res.json(Side);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addPastas = async (req: Request, res: Response) => {
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
    const newPastas = new Pastas({
      name,
      description,
      ingredients,
      nutritionalInfo,
      allergens,
      price,
      image,
    });

    await newPastas.save();
    res.status(201).json(newPastas);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
