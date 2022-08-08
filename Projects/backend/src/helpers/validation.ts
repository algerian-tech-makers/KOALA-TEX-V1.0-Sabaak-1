import * as yup from "yup";
import jwt from "jsonwebtoken";

const login = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const signup = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  confirmPassowrd: yup.string().required(),
});

export const createpostValidation = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  srcUrl: yup.string(),
  tags: yup.string().required(),
});

export const tokenSign = (str: string) => jwt.sign({ str: str }, "secret");

export const tokenVrfy = (token: string, clb?: (err: any, rslt: any) => void) =>
  jwt.verify(token, "secret", clb);

export default {
  login,
  signup,
};
