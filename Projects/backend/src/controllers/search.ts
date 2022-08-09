import { Handler } from "express";
import { user } from "../models/user.model";

export const search: Handler = (req, res) => {
  // need validation
  const { value } = req.body;
};
export const getProfile: Handler = (req, res) => {
  res.status(200).json({ result: req.user });
};

export const getOtherProfile: Handler = (req, res) => {
  const { _id } = req.body;
  user
    .findOne({ _id })
    .then((userFound) => res.status(200).json({ result: userFound }))
    .catch(() => res.status(400).json({ err: "something wrong happend " }));
};
