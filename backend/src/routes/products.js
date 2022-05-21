const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product.Controller');

router.get('/', productController.getProducts);

router.get('/name/:name', productController.getProductByName);

router.get('/:id', productController.getProductById);

router.post('/',  productController.createProduct);

router.put('/:id', (req, res) => {
    res.send('Hola mundo');
});

router.delete('/:id', productController.deleteProduct);


module.exports = router;