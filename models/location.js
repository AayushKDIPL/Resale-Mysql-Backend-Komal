import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import City from './city.js'; // Ensure you have a City model defined similarly

const Location = sequelize.define('Location', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Cities', // The name of the City model in the database
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Set up association if needed
Location.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

export default Location;
