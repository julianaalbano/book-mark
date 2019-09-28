const Sequelize = require('sequelize');
const db = require('../db');

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
  currentRank: {
    type: Sequelize.INTEGER,
  },
  lastWeekRank: {
    type: Sequelize.INTEGER,
  },
  weeksOnList: {
    type: Sequelize.INTEGER,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  coverArt: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  amazonLink: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  review: {
    type: Sequelize.STRING,
  },
  listId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
