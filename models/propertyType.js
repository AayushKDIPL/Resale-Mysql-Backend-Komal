import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Property = sequelize.define('Property', {
  property_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Property;
