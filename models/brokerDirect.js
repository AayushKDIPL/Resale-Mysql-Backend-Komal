// models/BrokerDirect.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const BrokerDirect = sequelize.define('BrokerDirect', {
  Broker_Direct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default BrokerDirect;
