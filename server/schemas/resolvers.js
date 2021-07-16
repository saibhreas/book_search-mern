
const { User, Book } = require('../models');
const { saveBook, deleteBook, createUser, login } = require('../controllers/user-controller');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    // books: async () => {
    //   return await Book.find({});
    // },
    // book: async (parent, { bookId }, context) => {
    //   // If user is authenticated
    //   if (context.user) {
    //     return await Book.findOne({ _id: bookId });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    me: async (parent, args, context) => {
      console.log('comes here: ', context.user);
      // If user is authenticated
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    saveBook: async (parent, { book }, context) => {
      return saveBook({ book }, context);
    },
    deleteBook: async (parent, { bookId }, context) => {
      return deleteBook({ bookId }, context);
    },
    createUser: (parent, { username, email, password }) => {
      return createUser({ username, email, password });
    },
    login: (parent, { email, password }) => {
      return login ({ email, password });
    },
  }
  
};
module.exports = resolvers;
