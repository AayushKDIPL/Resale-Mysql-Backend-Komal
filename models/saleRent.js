import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SaleRent = sequelize.define('SaleRent', {
  sale_rent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default SaleRent;
