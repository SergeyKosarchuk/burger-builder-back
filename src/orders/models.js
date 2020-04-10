import mongoose from 'mongoose';

import { UserSchema } from './../auth/models.js';
import { BurgerSchema, IngredientSchema } from './../burger-builder/models.js';

const OrderSchema = mongoose.Schema({
  customer: UserSchema,
  burger: BurgerSchema,
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  extraIngredients: [IngredientSchema],
  excludeIngredinets: [IngredientSchema]
}, {
  timestamps: true,
});


const Orders = mongoose.model('Orders', OrderSchema, 'Orders');

export { Orders, OrderSchema };
