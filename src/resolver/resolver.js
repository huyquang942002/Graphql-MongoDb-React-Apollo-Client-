const { books, authors } = require("../data/static.js");

const Author = require("../models/Author.js");
const Book = require("../models/Book.js");

const resolvers = {
  Query: {
    books: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getALlBooks(),

    book: (parent, { id }, { mongoDataMethod }) =>
      mongoDataMethod.getBookById(id),

    authors: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAllAuthors(),

    author: async (parent, { id }, { mongoDataMethod }) =>
      await mongoDataMethod.getAuthorById(id),
  },
  Book: {
    author: async ({ authorId }, args, { mongoDataMethod }) =>
      mongoDataMethod.getAuthorById(authorId),
  },
  Author: {
    books: ({ id }, args, { mongoDataMethod }) =>
      mongoDataMethod.getALlBooks({ authorId: id }),
  },

  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createBook(args),
  },
};

module.exports = resolvers;
