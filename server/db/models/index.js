const Book = require('./book');
const ListType = require('./listType');

ListType.hasMany(Book);
Book.belongsTo(ListType);

// Book.belongsTo(ListType, { through: 'listId' });

module.exports = {
  Book,
  ListType,
};
