import { Handler } from "express";
import { Profile } from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { user } from "../models/user.model";
import { tokenSign } from "../helpers/validation";

export const login: Handler = (req, res) => {
  const { email, password } = req.body;
  user
    .findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ err: "unvalid email" });
    })
    .catch(() => res.status(400).json({ err: "something wrong happend" }));
};
export const signup: Handler = (req, res) => {
  const { name, email, password, confirmPassowrd } = req.body;

  if (password !== confirmPassowrd)
    return res.status(400).json({ err: "something wrong happend" });

  user
    .findOne({ $or: [{ name }, { email }] })
    .then((userFound) => {
      if (userFound)
        return res.json({
          err:
            user.name == name ? "name already taken " : "email already taked",
        });

      new user({ name, email, password })
        .save()
        .then((user) => res.status(200).json({ token: tokenSign(user._id) }))
        .catch(() => res.status(400).json({ err: "something wrong happend" }));
    })
    .catch(() => res.status(400).json({ err: "something wrong happend" }));
};

export const googleAuthMid: Handler = (req, res) => {
  const userDetails = req.user as Profile;
  const name = userDetails.displayName;
  const email = userDetails.emails![0].value;

  user
    .findOne({ $or: [{ name }, { email }] })
    .then((userFound) => {
      if (userFound)
        return res.redirect(
          "http://localhost:3000/main?token=" + tokenSign(userFound._id)
        );

      new user({ name, email, password: Date.now().toString() })
        .save()
        .then((savedUser) =>
          res.redirect(
            "http://localhost:3000/main?token=" + tokenSign(savedUser._id)
          )
        )
        .catch(() => res.status(400).json({ err: "something wrong happend" }));
    })
    .catch(() => res.status(400).json({ err: "something wrong happend" }));
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: "http://localhost:8080/auth/google/callback",
  },
  function (_, __, profile, done) {
    return done(null, profile);
  }
);
