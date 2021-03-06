import { ApolloServer, PubSub, ServerInfo } from 'apollo-server';
import dotenv from 'dotenv';
import connectDB from './config/db';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

dotenv.config();

connectDB();

const pubsub = new PubSub();

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

server.listen({ port: process.env.PORT }).then((res: ServerInfo) => {
  console.log(`Server running at ${res.url}`);
});
