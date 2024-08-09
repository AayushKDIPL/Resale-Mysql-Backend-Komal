// controllers/FurnishingController.js
import Furnishing from '../models/furnishing.js';

const FurnishingController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: furnishings, count: totalFurnishings } = await Furnishing.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: furnishings,
        totalFurnishings,
        hasNextPage: offset + limit < totalFurnishings,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const furnishing = await Furnishing.findByPk(req.params.id);
      if (!furnishing) throw new Error('Furnishing not found');
      return res.status(200).json({ message: furnishing });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { furnishing_status } = req.body;
      console.log('Incoming data:', furnishing_status);

      const furnishing = await Furnishing.create({ furnishing: furnishing_status });
      return res.status(200).json({ message: 'Furnishing added successfully', furnishing, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const furnishing = await Furnishing.findByPk(req.params.id);
      if (!furnishing) throw new Error('Invalid call');
      await furnishing.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default FurnishingController;
