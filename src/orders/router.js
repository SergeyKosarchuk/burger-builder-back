import express from 'express';
import passport from 'passport';
import moment from 'moment';

import { Orders } from './models.js'

const router = express.Router()

const getOrders = async (req, res) => {
  const queryParams = { 'customer._id': req.user._id };

  if (req.query.createdAt__gte){
    const createdAt__gte = moment.utc(req.query.createdAt__gte, moment.ISO_8601);

    if (createdAt__gte.isValid()) {
      queryParams.createdAt = { $gte: createdAt__gte }
    }
    else {
      return res.status(400).json({error: 'Invalidate date format' });
    }
  }

  const orders = await Orders.find(queryParams).sort({ createdAt: -1 }).limit(20);
  return res.json(orders);
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
