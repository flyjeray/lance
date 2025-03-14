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
import { APIResponse } from '@lance/shared/models/api/general';

class AuthController {
  static login = async (
    req: Request<object, object, AuthCredentials>,
    res: Response<APIResponse<AuthSignInResponse>>
  ) => {
    const { login, password } = req.body;

    try {
      const user = await UserModel.findOne({ login });
      if (!user) {
        return res.status(404).json({ error: `User ${login} not found` });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user._id }, config.authKey, {
        expiresIn: '1 hour',
      });
      return res.json({ data: { token, uid: user.id } });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  static me = async (
    req: Request,
    res: Response<APIResponse<AuthMeResponse>>
  ) => {
    try {
      const { user: uid } = req as VerifiedUserRequest;

      const user = await UserModel.findById(uid);

      if (user) {
        return res.json({ data: { name: user.login } });
      } else {
        return res.status(404).json({ error: 'No user found' });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

export default AuthController;
