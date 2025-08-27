
import express from 'express';
import products from '../data/products.js';
const router = express.Router();

// Define your product routes here

router.get('/', (req, res) => {
  res.send(products);
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p._id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send('Product not found');
    }
});

export default router;