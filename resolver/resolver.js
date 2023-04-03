const { books, authors } = require("../data/static.js");

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find((book) => book.id == args.id),
    // parent of book :
    // {
    //   id: 1,
    //   name: "De men phieu luu ky",
    //   genre: "Adventure",
    //   authorId: 1,
    // },
    authors: () => authors,
    author: (parent, args) => authors.find((author) => author.id == args.id),
  },
  Book: {
    author: (parent, args) =>
      authors.find((author) => author.id == parent.authorId),
  },
  Author: {
    books: (parent, args) => books.filter((book) => book.authorId == parent.id),
  },
};

module.exports = resolvers;
