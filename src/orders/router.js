import express from 'express';
import passport from 'passport';

import { Orders } from './models.js'

const router = express.Router()

const getOrders = async (req, res) => {
  return res.json(await Orders.find().sort({ createdAt: -1 }));
}

const saveOrder = async (req, res) => {
  const {
    burger,
    address,
    extraIngredients,
    excludeIngredients
  } = req.body;

  if (burger && address) {
    const order = await Orders.create({
      customer: req.user,
      burger: burger,
      address: address,
      extraIngredients: extraIngredients ? extraIngredients : [],
      excludeIngredients: excludeIngredients ? excludeIngredients : [],
      price: extraIngredients.reduce(
        (price, ingredient) => ingredient.price + price, burger.price),
    })
    return res.json(order);
  }
  return res.status(400).send('Incomplete order!');
}

router.get('/orders', passport.authenticate('jwt', { session: false }), getOrders);
router.post('/orders', passport.authenticate('jwt', { session: false }), saveOrder);

export default router;
