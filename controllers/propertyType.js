import Property from "../models/propertyType.js";

const PropertyController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { count: totalProducts, rows: products } = await Property.findAndCountAll({
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
      const product = await Property.findByPk(req.params.id);
      if (!product) throw new Error("Product not found");
      return res.status(200).json({ message: product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { property_type } = req.body;

      // Log the incoming data for debugging
      console.log('Incoming data:', property_type);

      // Validate and create property
      const product = await Property.create({ property_type });

      return res.status(200).json({ message: 'Property added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Property.findByPk(req.params.id);
      if (!product) throw new Error("Invalid call");
      await Property.destroy({ where: { id: req.params.id } });

      return res.status(200).json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default PropertyController;
