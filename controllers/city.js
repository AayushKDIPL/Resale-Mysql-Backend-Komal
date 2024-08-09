// controllers/CityController.js
import City from '../models/city.js';

const CityController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: cities, count: totalCities } = await City.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: cities,
        totalCities,
        hasNextPage: offset + limit < totalCities,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      console.log(req.params.id)
      const city = await City.findByPk(req.params.id);
      if (!city) throw new Error('City not found');
      return res.status(200).json({ message: city });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { cityy } = req.body;
      console.log('Incoming data:', cityy);

      const city = await City.create({ city: cityy });
      return res.status(200).json({ message: 'City added successfully', city, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const city = await City.findByPk(req.params.id);
      if (!city) throw new Error('Invalid call');
      await city.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default CityController;
