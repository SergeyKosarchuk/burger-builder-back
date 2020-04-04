import express from 'express';
import { Ingredients, Burgers } from './models.js'

const router = express.Router()

const getIngredients = async (res, req) => {
  return req.json(await Ingredients.find().sort({createdAt: -1}))
}

const getBurgers = async (res, req) => {
  return req.json(await Burgers.find().sort({createdAt: -1}))
}

router.get('/ingredients', getIngredients);
router.get('/burgers', getBurgers);

export default router;
