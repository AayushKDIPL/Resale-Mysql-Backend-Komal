import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Project = sequelize.define('Project', {
  project: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Project;
