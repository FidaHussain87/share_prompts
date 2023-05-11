import { Schema, model, models } from "mongoose";

const UserScehma = new Schema({
  email: {
    type: String,
    unique: [true, "Email Already Exist!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "User name is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_.]+(?<![_.])$/,
      "UserName invalid, it should contain 8-20 alphanumeric letters and uniqeue!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserScehma);
export default User;
