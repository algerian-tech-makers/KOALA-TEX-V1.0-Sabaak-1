import express from "express";
import authRout from "./routes/auth";
import postRout from "./routes/post";
import session from "express-session";
import { validateReq } from "./middlewares/validateReq";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import { googleStrategy } from "./controllers/auth";
import { post } from "./models/post.model";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET as string,
  })
);

app.use(cors());
app.use(helmet());

app.use(validateReq);
app.use(authRout);
app.use(postRout);
passport.use(googleStrategy);

// post.find({}).then((r) => console.log(r));

export default app;
