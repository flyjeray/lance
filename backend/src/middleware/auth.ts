import jwt from 'jsonwebtoken';
import { UserModel } from '@lance/shared/models/user';
import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';
import { APIResponse } from '@lance/shared/models/api/general';

export type VerifiedUserRequest = Request & {
  user: string;
};

class AuthMiddleware {
  static checkAuth = async (
    req: Request,
    res: Response<APIResponse<unknown>>,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
          .status(401)
          .json({ success: false, error: 'Token Not Found' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.authKey);

      if (typeof decoded === 'string')
        return res
          .status(401)
          .json({ success: false, error: 'Invalid Token Format' });

      const user = await UserModel.findById(decoded.userId);

      if (!user)
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });

      (req as VerifiedUserRequest).user = user.id;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ success: false, error: 'Token Expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ success: false, error: 'Invalid Token' });
      } else {
        next(error);
      }
    }
  };
}

export default AuthMiddleware;
