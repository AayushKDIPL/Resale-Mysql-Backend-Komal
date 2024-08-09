// controllers/ConstructionController.js
import Construction from '../models/construction.js';

const ConstructionController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: constructions, count: totalConstructions } = await Construction.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: constructions,
        totalConstructions,
        hasNextPage: offset + limit < totalConstructions,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const construction = await Construction.findByPk(req.params.id);
      if (!construction) throw new Error('Construction not found');
      return res.status(200).json({ message: construction });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { construction_status } = req.body;
      console.log('Incoming data:', construction_status);

      const construction = await Construction.create({ construction: construction_status });
      return res.status(200).json({ message: 'Construction added successfully', construction, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const construction = await Construction.findByPk(req.params.id);
      if (!construction) throw new Error('Invalid call');
      await construction.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default ConstructionController;
