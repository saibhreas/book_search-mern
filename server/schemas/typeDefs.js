const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user (_id: String, username: String):User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(
      bookId: String!
      authors: [String]
      description: String!
      title: String!
      image: String
      link: String
    ): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;
