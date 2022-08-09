import { Handler } from "express";
import { resHelper } from "../helpers/res.helper";
import validation from "../helpers/validation";

export const validateReq: Handler = (req, resF, next) => {
  const res = resHelper(resF);
  const path = req.path.replace("/", "") as keyof typeof validation;

  if (!validation[path]) return next();

  console.log(req.body);

  validation[path]
    .isValid(req.body)
    .then((valid) => (console.log(valid), valid ? next() : res()))
    .catch(() => res());
};
