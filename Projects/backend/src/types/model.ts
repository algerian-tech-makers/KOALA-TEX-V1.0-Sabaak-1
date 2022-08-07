import { Response } from "express";
import { Document, FilterQuery, HydratedDocument, Model } from "mongoose";

export type userSchema = Document & {
  name: string;
  email: string;
  password: string;
  collections?: { collectionName: string; articlesUrl: string[] }[];
  liked: string[];
};

export type modelType = {
  findUser: (
    FilterQuery: FilterQuery<userSchema>,
    res: Response,
    rslt: (args: HydratedDocument<userSchema>) => void
  ) => void;
};
export type userModel = Model<userSchema> & modelType;
