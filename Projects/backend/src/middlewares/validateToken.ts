import { Handler } from "express";
import { tokenVrfy } from "../helpers/validation";
import { user } from "../models/user.model";

export const validateToken: Handler = (req, res, next) => {
  // this need to fix to
  const { str }: any = tokenVrfy(req.headers.token as string);
  console.log(str);

  if (!str) return res.status(400).json({ err: "something wrong happend" });

  user.findOne({ _id: str }, (err: any, user: any) => {
    if (err || !user)
      return res.status(400).json({ err: "something wrong happend" });

    req.user = user;
    next();
  });
};
