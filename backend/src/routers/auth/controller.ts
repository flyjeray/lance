import jwt from 'jsonwebtoken';
import { UserModel } from '@lance/shared/models/user';
import { Request, Response } from 'express';
import { config } from '@/config';
import { VerifiedUserRequest } from '@/middleware/auth';
import {
  AuthCredentials,
  AuthMeResponse,
  AuthSignInResponse,
} from '@lance/shared/models/api/auth';

class AuthController {
  static login = async (
    req: Request<object, object, AuthCredentials>,
    res: Response<AuthSignInResponse>
  ) => {
    const { login, password } = req.body;

    try {
      const user = await UserModel.findOne({ login });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: `User ${login} not found` });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, error: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user._id }, config.authKey, {
        expiresIn: '1 hour',
      });
      return res.json({ success: true, token, uid: user.id });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };

  static me = async (req: Request, res: Response<AuthMeResponse>) => {
    try {
      const { user: uid } = req as VerifiedUserRequest;

      const user = await UserModel.findById(uid);

      if (user) {
        return res.json({ success: true, name: user.login });
      } else {
        return res.status(404).json({ success: false, error: 'No user found' });
      }
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
}

export default AuthController;
