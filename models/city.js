// models/City.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const City = sequelize.define('City', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default City;
