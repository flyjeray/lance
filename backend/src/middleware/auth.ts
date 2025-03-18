import jwt from 'jsonwebtoken';
import { UserModel } from '@lance/shared/models/user';
import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';
import { APIResponse } from '@lance/shared/models/api/general';
import { VerifiedUserLocals } from '@lance/shared/models/api/auth';

class AuthMiddleware {
  static checkAuth = async (
    req: Request,
    res: Response<APIResponse<unknown>, VerifiedUserLocals>,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token Not Found' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.authKey);

      if (typeof decoded === 'string')
        return res.status(401).json({ error: 'Invalid Token Format' });

      const user = await UserModel.findById(decoded.userId);

      if (!user) return res.status(404).json({ error: 'User not found' });

      res.locals.user = user.id;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token Expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Invalid Token' });
      } else {
        next(error);
      }
    }
  };
}

export default AuthMiddleware;
