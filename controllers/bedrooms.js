import Bedrooms from '../models/Bedrooms.js';

const BedroomsController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: products, count: totalProducts } = await Bedrooms.findAndCountAll({
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
      const product = await Bedrooms.findByPk(req.params.id);
      if (!product) throw new Error('Product not found');
      res.status(200).json({ message: product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { bed } = req.body;
      console.log(bed);
      const product = await Bedrooms.create({ bedrooms: bed });
      res.status(200).json({ message: 'Product added successfully', product, status: 'ok' });
    } catch (err) {
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Bedrooms.findByPk(req.params.id);
      if (!product) throw new Error('Invalid call');
      await product.destroy();
      res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default BedroomsController;
