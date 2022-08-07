import { Handler } from "express";
import { HydratedDocument } from "mongoose";
import { tokenVrfy } from "../helpers/validation";
import { post } from "../models/post.model";
import { user } from "../models/user.model";
import { userSchema } from "../types/model";

export const createPost: Handler = (req, res) => {
  const { content, title, tags } = req.body;
  // need global validation for values

  //this need to edit
  const userResult = req.user as HydratedDocument<userSchema>;

  new post({
    content,
    title,
    tags,
    userId: userResult._id,
    createdAt: Date.now(),
  })
    .save()
    .then(() => res.status(200).json({ rslt: "posted" }))
    .catch(() => res.status(400).json({ err: "something wrong happend" }));
};

export const editPost: Handler = (req, res) => {
  const { content, title, tags, postId } = req.body;

  //this need to edit
  const userResult = req.user as HydratedDocument<userSchema>;

  post
    .findOne({ _id: postId })
    .then((post) => {
      if (!post) return res.status(400).json({ err: "unvalid post id" });

      if (post.userId !== userResult._id)
        return res.status(400).json({ err: "permission denied" });

      post.content = content;
      post.title = title;
      post.tags = tags;

      post
        .save()
        .then(() => res.status(200).json({ rslt: "posted" }))
        .catch(() => res.status(400).json({ err: "something wrong happend" }));
    })
    .catch(() => res.status(400).json({ err: "something wrong happend" }));
};
