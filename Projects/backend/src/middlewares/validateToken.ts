import { Handler } from "express";
import { tokenVrfy } from "../helpers/validation";
import { user } from "../models/user.model";

export const validateToken: Handler = (req, res, next) => {
  // this need to fix to
  const _id: any = tokenVrfy(req.headers.token as string);

  if (!_id) return res.status(400).json({ err: "something wrong happend" });

  user.findOne({ _id }, (err, user) => {
    if (err || !user)
      return res.status(400).json({ err: "something wrong happend" });

    req.user = user;
    next();
  });
};
