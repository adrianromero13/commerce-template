import express from 'express';

import Product from './../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

// api router for list of products in database
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// shopping cart api route
router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product){
   return res
    .status(200)
    .send(product);
  } else {
    return res
    .status(404)
    .send({ message: 'Product not found' });
  }
})

// api router for setting new products into database
router.post('/', isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(200)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

// api route for updating product using put method
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

// api route for deleting products
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    return res
      .status(200)
      .send({ message: 'Product Successfully Deleted' });
  }
  return res
    .status(403)
    .send({ message: 'Error In Deletion, Please Try Again' });
});

export default router;
