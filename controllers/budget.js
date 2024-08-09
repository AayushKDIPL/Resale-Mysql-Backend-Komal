// controllers/BudgetController.js
import Budget from '../models/budget.js';

const BudgetController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: products, count: totalProducts } = await Budget.findAndCountAll({
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
      const data = await Budget.findByPk(req.params.id);
      if (!data) throw new Error('Product not found');
      return res.status(200).json({ message: data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { budgets } = req.body;
      console.log(budgets);

      const product = await Budget.create({ budget: budgets });
      return res.status(200).json({ message: 'Product added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Budget.findByPk(req.params.id);
      if (!product) throw new Error('Invalid call');
      await product.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default BudgetController;
