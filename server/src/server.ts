import { ApolloServer, ServerInfo } from 'apollo-server';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

connectDB();

const typeDefs: DocumentNode = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'Hello, world!',
  },
};

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 }).then((res: ServerInfo) => {
  console.log(`Server running at ${res.url}`);
});
