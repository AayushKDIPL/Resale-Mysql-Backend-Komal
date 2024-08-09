import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Product = sequelize.define('Product', {
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budget_range: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  property_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sale_rent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  builder_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property_size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  demand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registration_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tower: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  furnishing_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  no_of_parking: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  construction_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  broker_direct_inventory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Product;
