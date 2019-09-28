const router = require('express').Router();
const { List, Book } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allLists = await List.findAll({
      include: {
        model: Book,
      },
    });
    res.json(allLists);
  } catch (err) {
    next(err);
  }
});

router.get('/:listName', async (req, res, next) => {
  try {
    const listwithBooks = await List.findOne({
      where: {
        name: req.params.listName,
      },
      include: {
        model: Book,
      },
    });
    res.json(listwithBooks);
  } catch (err) {
    next(err);
  }
});
