import Location from '../models/location.js';
import City from '../models/city.js'; // Ensure City model is imported

const LocationController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: locations, count: totalLocations } = await Location.findAndCountAll({
        include: {
          model: City,
          as: 'city',
        },
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: locations,
        totalLocations,
        hasNextPage: offset + limit < totalLocations,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const location = await Location.findByPk(req.params.id, {
        include: {
          model: City,
          as: 'city',
        },
      });
      if (!location) throw new Error('Location not found');
      return res.status(200).json({ message: location });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { locationy, id } = req.body;
      console.log('Incoming data:', locationy, id);

      const location = await Location.create({
        location: locationy,
        cityId: id,
      });

      return res.status(200).json({ message: 'Location added successfully', location, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const location = await Location.findByPk(req.params.id);
      if (!location) throw new Error('Invalid call');
      await location.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default LocationController;
