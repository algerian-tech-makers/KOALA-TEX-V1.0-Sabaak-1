import { Response } from "express";
import { Document, FilterQuery, HydratedDocument, Model } from "mongoose";

export type userSchema = Document & {
  name: string;
  email: string;
  password: string;
  collections?: {
    collectionName: string;
    articleUrl: { title: string; url: string }[];
  }[];
  liked: string[];
};

export type postSchema = Document & {
  userId: string;
  title: string;
  content: string;
  createdAt: number;
  tags: string[];
  comments?: { userId: string; content: string; answered?: string[] }[];
  rating: number;
  srcUrl?: string;
  file?: string[];
};

export type modelType = {
  findUser: (
    FilterQuery: FilterQuery<userSchema>,
    res: Response,
    rslt: (args: HydratedDocument<userSchema>) => void
  ) => void;
};
export type postModel = Model<postSchema> & {};
export type userModel = Model<userSchema> & modelType;
