import { Response } from "express";

export const resHelper =
  (res: Response) =>
  (status = 400, json = { err: "something wrong happend" }) => {
    res.status(status).json(json);
  };
