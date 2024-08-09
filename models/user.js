import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ADMIN',
    validate: {
      isIn: [['ADMIN']]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenVersion: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  resetToken: {
    type: DataTypes.STRING,
  },
  expireToken: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

export default User;
