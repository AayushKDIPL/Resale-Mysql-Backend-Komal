// models/Bedrooms.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Bedrooms = sequelize.define('Bedrooms', {
  bedrooms: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Bedrooms;
