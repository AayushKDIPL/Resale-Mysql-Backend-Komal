import Product from '../models/product.js';
import { removeImage } from '../utils/common.js';

const ProductsController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { count: totalProducts, rows: products } = await Product.findAndCountAll({
        where: req.query.subcategory ? { subcategory: req.query.subcategory } : {},
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
      const product = await Product.findByPk(req.params.id);
      if (!product) throw new Error("Product not found");
      return res.status(200).json({ message: product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { data } = req.body;
      console.log("Komal Jeet Singh", data);

      if (!Array.isArray(data)) {
        return res.status(400).json({ message: 'Data should be an array' });
      }

      const products = await Product.bulkCreate(data);

      return res.status(200).json({ message: 'Products added successfully', products, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  addSingleProduct: async (req, res) => {
    try {
      const { data } = req.body;
      console.log(data.location, data.customerName);

      const product = await Product.create({
        customer_name: data.customerName,
        customer_mobile: data.mobileNo,
        budget_range: data.budgetRange,
        empName: data.empName,
        property_type: data.propertyType,
        sale_rent: data.saleRent,
        builder_name: data.builderName,
        project_name: data.projectName,
        location: data.location,
        city: data.city,
        property_size: data.propertySize,
        bedrooms: data.bedrooms,
        demand: data.demand,
        registration_status: data.registrationStatus,
        unit_no: data.unitNo,
        tower: data.tower,
        floor: data.floor,
        facing: data.facing,
        furnishing_status: data.furnishingStatus,
        no_of_parking: data.noOfParking,
        construction_status: data.constructionStatus,
        video_link: data.videoLink,
        broker_direct_inventory: data.brokerDirectInventory,
      });

      return res.status(200).json({ message: 'Product added successfully', product, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.update(req.body.data, {
        where: { id: req.body._id },
        returning: true,
        plain: true
      });

      return res.status(200).json({ message: updatedProduct[1], status: 'ok' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) throw new Error("Invalid call");
      removeImage("uploads/products/", product.image);
      await Product.destroy({ where: { id: req.params.id } });

      return res.status(200).json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },

  searchProduct: async (req, res) => {
    try {
      const { searchValue } = req.body;
      const products = await Product.findAll({
        where: searchValue
          ? { name: { [Op.iLike]: `%${searchValue}%` } }
          : {},
      });

      return res.status(200).json({ message: products, status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default ProductsController;
