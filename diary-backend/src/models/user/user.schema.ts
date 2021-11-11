import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.types";
import config from "config";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
}, {
  timestamps: true
});

UserSchema.pre("save", async function (next: any ) {
  let user = this as IUser;

  if (!user.isModified("password")){
    return next;
  }

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  passwordProvided: string
): Promise<boolean> {
  const user = this as IUser;

  return bcrypt.compare(passwordProvided, user.password).catch((e) => false);
};

export default UserSchema;