const Sequelize = require('sequelize');
const db = require('../db');

const ListType = db.define('listType', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ListType;
