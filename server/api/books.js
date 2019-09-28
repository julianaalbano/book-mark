const router = require('express').Router();
const { Book, List } = require('../db/models');
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
