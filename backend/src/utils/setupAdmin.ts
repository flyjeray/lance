import { config } from '@/config';
import { UserRole } from '@lance/shared/constants/roles';
import { UserModel } from '@lance/shared/models/user';

export const setupAdmin = async (): Promise<string | null> => {
  const user = await UserModel.findOne({ role: UserRole.ADMIN });

  if (!user) {
    try {
      const user = new UserModel({
        login: config.admin.login,
        password: config.admin.password,
        role: UserRole.ADMIN,
      });

      const newAdmin = await user.save();
      return newAdmin.id;
    } catch (error) {
      console.error('Error while creating admin');
      console.error(error);
      return null;
    }
  } else {
    return user.id;
  }
};
