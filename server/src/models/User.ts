import { Schema, model, Document } from 'mongoose';

export interface UserDoc extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  avatar?: string;
  location?: string;
  mobile?: string;
  social?: { twitter?: string; dribbble?: string; behance?: string };
  settings: {
    emailOnFollow: boolean;
    emailOnPostAnswer: boolean;
    emailOnMention: boolean;
    newLaunches: boolean;
    monthlyUpdates: boolean;
    subscribeNewsletter: boolean;
  };
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    avatar: { type: String },
    location: { type: String },
    mobile: { type: String },
    social: {
      twitter: String,
      dribbble: String,
      behance: String,
    },
    settings: {
      emailOnFollow: { type: Boolean, default: true },
      emailOnPostAnswer: { type: Boolean, default: true },
      emailOnMention: { type: Boolean, default: true },
      newLaunches: { type: Boolean, default: false },
      monthlyUpdates: { type: Boolean, default: true },
      subscribeNewsletter: { type: Boolean, default: true },
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const User = model<UserDoc>('User', userSchema);
