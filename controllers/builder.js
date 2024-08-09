// controllers/BuilderController.js
import Builder from '../models/builder.js';

const BuilderController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: products, count: totalProducts } = await Builder.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: products,
        totalProducts,
        hasNextPage: offset + limit < totalProducts,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const data = await Builder.findByPk(req.params.id);
      if (!data) throw new Error('Product not found');
      return res.status(200).json({ message: data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { builder_name } = req.body;
      console.log('Incoming data:', builder_name);

      const product = await Builder.create({ builder: builder_name });
      return res.status(200).json({ message: 'Product added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Builder.findByPk(req.params.id);
      if (!product) throw new Error('Invalid call');
      await product.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default BuilderController;
