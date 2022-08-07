import { Response } from "express";
import { FilterQuery, HydratedDocument, model, Schema } from "mongoose";
import { userModel, userSchema, modelType } from "../types/model";

const userSchema = new Schema<userSchema>({
  name: String,
  email: String,
  password: String,
  collections: [{ collectionName: String, articleUrl: [String] }],
  liked: [{ articleUrl: String }],
});

userSchema.statics.findUser = (
  query: FilterQuery<userSchema>,
  res: Response,
  rslt: HydratedDocument<userSchema>
) => user.findOne(query, (err: any, result: any) => {});

export const user = model<userSchema, userModel>("msrc.user", userSchema);
