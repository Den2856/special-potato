import mongoose from 'mongoose';

const PastaSchema = new mongoose.Schema({
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

const Pasta = mongoose.model('Pasta', PastaSchema);
export default Pasta;
