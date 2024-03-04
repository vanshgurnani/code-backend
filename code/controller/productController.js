// productController.js
const Product = require('../models/productModel');

// Controller function to handle product creation
exports.createProduct = async (req, res) => {
  try {
    const created_by = req.user.userId;
    console.log(created_by);
    const { description, price, stock_quantity, product_category,location , free_samples } = req.body;
    const product = new Product({ description, price, stock_quantity, product_category,location , free_samples, created_by });
    const savedProduct = await product.save();
    res.json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to handle product retrieval for a specific user ID
exports.getProductsForUser = async (req, res) => {
  try {

    const created_by = req.user.userId;
    console.log(created_by);


    const products = await Product.find({ created_by: userId });
    console.log('Products:', products);
    res.json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ message: 'Products retrieved successfully', products });
    } catch (error) {
      console.error('Error in getProducts controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId; // Assuming the product ID is passed as a route parameter
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId; // Assuming the product ID is passed as a route parameter
  
      // Extract the fields you want to update from the request body
      const { description, price, stock_quantity, product_category } = req.body;
  
      // Find the product by ID
      const existingProduct = await Product.findById(productId);
  
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      // Update the product fields if they are provided in the request body
      if (description) existingProduct.description = description;
      if (price) existingProduct.price = price;
      if (stock_quantity) existingProduct.stock_quantity = stock_quantity;
      if (product_category) existingProduct.product_category = product_category;
  
      // Save the updated product
      const updatedProduct = await existingProduct.save();
  
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error('Error in updateProduct controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };