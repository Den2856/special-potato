import mongoose from 'mongoose';

const SidesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  allergens: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    small: { type: String, required: true },
    medium: { type: String, required: true },
    large: { type: String, required: true },
  },
  nutritionalInfo: {
    calories: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    protein: { type: Number, required: true },
  },
});

const Sides = mongoose.model('Sides', SidesSchema);
export default Sides;