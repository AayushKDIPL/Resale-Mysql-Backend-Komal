import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Registration = sequelize.define('Registration', {
  registration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Registration;
