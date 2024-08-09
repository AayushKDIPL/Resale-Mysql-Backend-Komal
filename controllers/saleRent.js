import SaleRent from '../models/saleRent.js';

const SaleRentController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { count: totalProducts, rows: products } = await SaleRent.findAndCountAll({
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
      const product = await SaleRent.findByPk(req.params.id);
      if (!product) throw new Error("Product not found");
      return res.status(200).json({ message: product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { sale_rent } = req.body;

      // Log the incoming data for debugging
      console.log('Incoming data:', sale_rent);

      // Validate and create sale rent
      const product = await SaleRent.create({ sale_rent });

      return res.status(200).json({ message: 'Product added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await SaleRent.findByPk(req.params.id);
      if (!product) throw new Error("Invalid call");
      await SaleRent.destroy({ where: { id: req.params.id } });

      return res.status(200).json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default SaleRentController;
