// models/Budget.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Budget = sequelize.define('Budget', {
  budget: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Budget;
