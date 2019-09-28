const router = require('express').Router();
const { ListType, Book } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allLists = await ListType.findAll({
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
    const listwithBooks = await ListType.findOne({
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
