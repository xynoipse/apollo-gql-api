import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    createdAt: String!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
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
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;

export default typeDefs;
