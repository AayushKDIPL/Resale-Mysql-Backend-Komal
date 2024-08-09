// models/Employee.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Employee = sequelize.define('Employee', {
  employee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Employee;
