import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../constants/roles';

export type User = {
  login: string;
  display_name: string;
  password: string;
  role: UserRole;
  comparePassword: (password: string) => Promise<boolean>;
};

type UserDocument = Document & User;

const userSchema = new Schema<UserDocument>({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.EDITOR,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch {
    return next(
      new Error('Unknown error occured while saving password for new user')
    );
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model<UserDocument>('users', userSchema);

export { UserModel };
