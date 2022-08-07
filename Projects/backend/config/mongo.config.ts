import mongoose from "mongoose";

export default mongoose
  .connect(
    "mongodb+srv://taharBelghitri:09261999@cluster0.pqva6.gcp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
