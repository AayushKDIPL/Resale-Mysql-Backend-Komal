import Registration from '../models/registration.js';

const registrationController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { count: totalProducts, rows: products } = await Registration.findAndCountAll({
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
      const product = await Registration.findByPk(req.params.id);
      if (!product) throw new Error("Product not found");
      return res.status(200).json({ message: product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { registration_status } = req.body;

      // Log the incoming data for debugging
      console.log('Incoming data:', registration_status);

      // Validate and create registration
      const product = await Registration.create({ registration: registration_status });

      return res.status(200).json({ message: 'Registration added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Registration.findByPk(req.params.id);
      if (!product) throw new Error("Invalid call");
      await Registration.destroy({ where: { id: req.params.id } });

      return res.status(200).json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default registrationController;
