import { model, Schema } from "mongoose";
import { postModel, postSchema } from "../types/model";

const postSchema = new Schema<postSchema>({
  userId: String,
  title: String,
  content: String,
  tags: [String],
  createdAt: Number,
  comments: [{ userId: String, content: String, answered: [String] }],
  rating: Number,
  file: [String],
  srcUrl: String,
});

export const post = model<postSchema, postModel>("msrc.post", postSchema);
