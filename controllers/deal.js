// controllers/DealController.js
import Deal from '../models/deal.js';

const DealController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: deals, count: totalDeals } = await Deal.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: deals,
        totalDeals,
        hasNextPage: offset + limit < totalDeals,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const deal = await Deal.findByPk(req.params.id);
      if (!deal) throw new Error('Deal not found');
      return res.status(200).json({ message: deal });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { deal_through } = req.body;
      console.log('Incoming data:', deal_through);

      const deal = await Deal.create({ deal: deal_through });
      return res.status(200).json({ message: 'Deal added successfully', deal, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deal = await Deal.findByPk(req.params.id);
      if (!deal) throw new Error('Invalid call');
      await deal.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default DealController;
