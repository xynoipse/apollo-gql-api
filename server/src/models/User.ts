import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema: Schema = new Schema<UserDocument, UserModel>({
  username: String,
  email: String,
  password: String,
  createdAt: String,
});

export interface User {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

interface UserDocument extends User, Document {
  generateAuthToken(): string;
  validatePassword(password: string): boolean;
  _doc: any;
}

export interface UserModel extends Model<UserDocument> {}

// Generate user JWT auth token
userSchema.methods.generateAuthToken = function (this: UserDocument): string {
  const token: string = jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  return token;
};

// Validate hashed password
userSchema.methods.validatePassword = async function (
  this: UserDocument,
  password
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Encrypt password using bcryptjs
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

export default model<UserDocument, UserModel>('User', userSchema);
