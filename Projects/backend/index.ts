import dotenv from "dotenv";
dotenv.config();

import "./config/mongo.config";

import app from "./src";

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log("SERVER IS RUNNING ON PORT " + PORT));
