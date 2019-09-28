const Book = require('./book');
const List = require('./list');

List.hasMany(Book);
Book.belongsTo(List);

module.exports = {
  Book,
  List,
};
