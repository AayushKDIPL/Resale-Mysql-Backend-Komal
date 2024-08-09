// controllers/BrokerController.js
import BrokerDirect from '../models/brokerDirect.js';

const BrokerController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: products, count: totalProducts } = await BrokerDirect.findAndCountAll({
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
      const data = await BrokerDirect.findByPk(req.params.id);
      if (!data) throw new Error('Product not found');
      return res.status(200).json({ message: data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { broker_direct } = req.body;
      console.log('Incoming data:', broker_direct);

      const product = await BrokerDirect.create({ Broker_Direct: broker_direct });
      return res.status(200).json({ message: 'Product added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await BrokerDirect.findByPk(req.params.id);
      if (!product) throw new Error('Invalid call');
      await product.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default BrokerController;
