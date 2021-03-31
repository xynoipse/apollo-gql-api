import postsResolvers from './post';
import usersResolvers from './users';
import commentsResolvers from './comments';

export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
