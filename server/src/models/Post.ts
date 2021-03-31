import { model, Schema, Document, Model } from 'mongoose';

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

export interface Post {
  body: string;
  username: string;
  comments: {
    body: string;
    username: string;
    createdAt: string;
  }[];
  likes: {
    username: string;
    createdAt: string;
  }[];
  user: Schema.Types.ObjectId;
  createdAt: string;
}

interface PostDocument extends Post, Document {
  _doc: any;
}

export interface PostModel extends Model<PostDocument> {}

export default model<PostDocument, PostModel>('Post', postSchema);
