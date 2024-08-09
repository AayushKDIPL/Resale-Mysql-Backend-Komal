// models/Construction.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Construction = sequelize.define('Construction', {
  construction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Construction;
