import mongoose from 'mongoose';

import { UserSchema } from './../auth/models.js';
import { BurgerSchema, IngredientSchema } from './../burger-builder/models.js';

const OrderSchema = mongoose.Schema({
  customer: {
    type: UserSchema,
    excludeIndexes: true,
  },
  burger: {
    type: BurgerSchema,
    excludeIndexes: true
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  extraIngredients: {
    type:[IngredientSchema],
    excludeIndexes: true
  },
  excludeIngredienets: {
    type: [IngredientSchema],
    excludeIndexes: true
  }
}, {
  timestamps: true,
});


const Orders = mongoose.model('Orders', OrderSchema, 'Orders');

export { Orders, OrderSchema };
