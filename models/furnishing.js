// models/Furnishing.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Furnishing = sequelize.define('Furnishing', {
  furnishing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Furnishing;
