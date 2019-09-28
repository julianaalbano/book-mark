const Sequelize = require('sequelize');
const router = require('express').Router();
const { Book, List } = require('../db/models');
const Op = Sequelize.Op;

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: {
        model: List,
      },
    });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get('/popular', async (req, res, next) => {
  try {
    const popularBooks = await Book.findAll({
      where: {
        weeksOnList: {
          [Op.gte]: 4,
        },
      },
      include: {
        model: List,
      },
    });
    res.json(popularBooks);
  } catch (err) {
    next(err);
  }
});

router.get('/new', async (req, res, next) => {
  try {
    const newBooks = await Book.findAll({
      where: {
        weeksOnList: 1,
      },
      include: {
        model: List,
      },
    });
    res.json(newBooks);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleBook = await Book.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: List,
      },
    });
    res.json(singleBook);
  } catch (err) {
    next(err);
  }
});
