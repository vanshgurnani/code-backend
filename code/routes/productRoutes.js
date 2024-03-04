const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { verifyToken , checkRole } = require('../middleware/authMiddleware');

// Route to create a new product
router.post('/postProduct', verifyToken, checkRole(['Super Admin', 'Content Admin']), productController.createProduct);

router.get('/getProduct', verifyToken, checkRole(['Super Admin', 'Content Admin']), productController.getProductsForUser);

router.delete('/deleteProduct/:productId', verifyToken, checkRole(['Super Admin', 'Content Admin']), productController.deleteProduct);

router.put('/updateProduct/:productId', verifyToken, checkRole(['Super Admin', 'Content Admin']), productController.updateProduct);

module.exports = router;
