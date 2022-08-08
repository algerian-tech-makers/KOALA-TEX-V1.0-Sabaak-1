import { Handler } from "express";
import { HydratedDocument } from "mongoose";
import { post } from "../models/post.model";
import { userSchema } from "../types/model";
import formidable from "formidable";
import { createpostValidation } from "../helpers/validation";

const form = new formidable.IncomingForm({
  allowEmptyFiles: false,
  maxFiles: 5,
  maxFieldsSize: 30000,
  multiples: true,
  uploadDir: "/home/tahar/prog/TEAM_02/Projects/backend/uploads",
  filename: () => Date.now().toString() + ".pdf",
});

export const createPost: Handler = (req, res) => {
  // need global validation for values

  //this need to edit
  const userResult = req.user as HydratedDocument<userSchema>;

  form.on("aborted", () => {
    // remove file
  });
  form.on("error", (err) => {
    // handle error
    // remove files
  });

  form.on("field", (f, v) => {
    //
  });

  form.on("end", () => {
    //need to edit
  });

  form.parse(req, (err, fields, files) => {
    let filesName: string[] = [];

    if (err) return res.status(400).json({ err: "something wrong happend" });

    const filesContent: any = Object.values(files);

    let fileTypeError: boolean = false;

    for (let index = 0; index < filesContent.length; index++) {
      if (filesContent[index].mimetype === "application/pdf")
        filesName.push(filesContent[index].newFilename);
      else {
        fileTypeError = true;
        break;
      }
    }

    // remove file
    if (fileTypeError)
      return res.status(400).json({ err: "unvalid file type " });

    createpostValidation
      .isValid(fields)
      .then((isValid) => {
        if (!isValid)
          return res.status(400).json({ err: "something wrong happend " });

        const { content, title, tags, srcUrl } = fields;
        const tag = tags as string;
        console.log(filesName);
        new post({
          content: content as string,
          title: title as string,
          srcUrl: srcUrl as string,
          tags: tag.split(","),
          file: filesName,
          createdAt: Date.now(),
          userId: userResult._id,
        })
          .save()
          .then(() => res.status(200).json({ result: "posted" }))
          .catch(
            (err) => (
              console.log(err),
              res.status(400).json({ err: "something wrong happend #1" })
            )
          );
      })
      .catch(() => res.status(400).json({ err: "something wrong happend " }));
  });
};

export const editPost: Handler = (req, res) => {
  const { content, title, tags, postId, srcUrl } = req.body;

  //this need to edit
  const userResult = req.user as HydratedDocument<userSchema>;

  post
    .findOne({ _id: postId, userI: userResult._id })
    .then((post) => {
      if (!post) return res.status(400).json({ err: "unvalid post id" });

      if (post.userId !== userResult._id)
        return res.status(400).json({ err: "permission denied" });

      post.content = content;
      post.title = title;
      post.tags = tags;
      post.srcUrl = srcUrl;

      post
        .save()
        .then(() => res.status(200).json({ rslt: "posted" }))
        .catch(() => res.status(400).json({ err: "something wrong happend" }));
    })
    .catch(() => res.status(400).json({ err: "something wrong happend" }));
};
