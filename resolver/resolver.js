const { books, authors } = require("../data/static.js");

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) =>
      books.find((book) => book.id.toString() === args.id),
    authors: () => authors,
  },
};

module.exports = resolvers;
