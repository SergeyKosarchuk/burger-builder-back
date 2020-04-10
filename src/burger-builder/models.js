import mongoose from 'mongoose';

const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const BurgerSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: [IngredientSchema],
}, {
  timestamps: true,
});

const Ingredients = mongoose.model('Ingredients', IngredientSchema, 'Ingredients');
const Burgers = mongoose.model('Burgers', BurgerSchema, 'Burgers');

export { Ingredients, Burgers, BurgerSchema, IngredientSchema };
