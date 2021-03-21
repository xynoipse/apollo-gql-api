import { model, Schema } from 'mongoose';

const postSchema: Schema = new Schema({
  body: String,
  username: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  createdAt: String,
});

export default model('Post', postSchema);
