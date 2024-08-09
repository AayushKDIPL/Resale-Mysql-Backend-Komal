// models/Builder.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Builder = sequelize.define('Builder', {
  builder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Builder;
