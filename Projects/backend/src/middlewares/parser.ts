import { Handler } from "express";
import formidable from "formidable";

export const formdataParser: Handler = (req, res, next) => {
  console.log("here");
  console.log(req.method);
  console.log(req.headers["content-type"]?.split(";")[0]);

  const form = new formidable.IncomingForm({
    allowEmptyFiles: false,
    maxFiles: 5,
    maxFieldsSize: 30000,
    multiples: true,
    uploadDir: "/home/tahar/prog/TEAM_02/Projects/backend/uploads",
  });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ err: "something wrong happend" });

    req.body = { ...fields, files };
    next();
  });
};
