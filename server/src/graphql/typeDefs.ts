import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;

export default typeDefs;
