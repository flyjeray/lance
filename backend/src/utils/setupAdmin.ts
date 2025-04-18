import { config } from '@/config';
import { UserModel } from '@lance/shared/models/user';

export const setupUser = async (): Promise<string | null> => {
  const user = await UserModel.findOne();

  if (!user) {
    try {
      const user = new UserModel({
        login: config.admin.login,
        password: config.admin.password,
      });

      const newAdmin = await user.save();
      return newAdmin.id;
    } catch (error) {
      console.error('Error while creating user');
      console.error(error);
      return null;
    }
  } else {
    return user.id;
  }
};
