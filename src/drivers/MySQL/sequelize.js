const { Sequelize } = require('sequelize');

const { config } = require('../../../config/config');
const setupModels = require('../../domains/db/model');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPass);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 5000,
    idle: 1000,
  },
});

setupModels(sequelize);

module.exports = sequelize;
