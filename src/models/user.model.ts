import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rights: string;
  confirmationCode: string;
  status: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rights: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as unknown as UserDocument;
  if (!user.isModified) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
