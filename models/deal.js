// models/Deal.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Deal = sequelize.define('Deal', {
  deal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Deal;
