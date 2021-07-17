//pulled from C:\Users\kern\Desktop\RUT-VIRT-FSF-FT-04-2021-U-LOL\21-MERN\01-Activities\25-Ins_Resolver-Context\server\schemas\resolvers.js.  

const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { saveBook, deleteBook, createUser, login } = require('../controllers/user-controller');
const { signToken } = require('../utils/auth');//server util/auth

const resolvers = {
  Query: {

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
