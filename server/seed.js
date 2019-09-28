const db = require('../server/db');
const { Book, ListType } = require('../server/db/models');
const axios = require('axios');

async function seed() {
  await db.sync({ force: true, logging: false });
  console.log('db synced!');

  let bookData = [];
  let listNameData = [];

  try {
    let listIdCount = 1;
    const response = await axios.get(
      'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=IIAbpple8GTYSL7FZIG76ekPtHli9GJe'
    );
    let results = response.data.results.lists;
    results.forEach(list => {
      let bookInfo = {};
      list.books.forEach(book => {
        bookInfo.title = book.title;
        bookInfo.author = book.author;
        bookInfo.currentRank = book.rank;
        bookInfo.lastWeekRank = book.rank_last_week;
        bookInfo.weeksOnList = book.weeks_on_list;
        bookInfo.publisher = book.publisher;
        bookInfo.description = book.description;
        bookInfo.coverArt = book.book_image;
        bookInfo.amazonLink = book.amazon_product_url;
        bookInfo.review = book.book_review_link;
        bookInfo.listId = listIdCount;
        bookData.push(bookInfo);
        bookInfo = {};
      });
      listIdCount++;
      listNameData.push({ name: list.list_name });
    });
  } catch (error) {
    console.error(error);
  }

  await Promise.all(
    bookData.map(book => {
      return Book.create(book);
    })
  );

  await Promise.all(
    listNameData.map(list => {
      return ListType.create(list);
    })
  );

  console.log(`seeded ${bookData.length} books`);

  console.log(`seeded ${listNameData.length} list categories`);

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();

module.exports = seed;
