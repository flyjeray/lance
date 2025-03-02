import jwt from 'jsonwebtoken';
import { UserModel } from '@lance/shared/models/user';
import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';
import { body, validationResult } from 'express-validator';

export type VerifiedUserRequest = Request & {
  user: string;
};

class AuthMiddleware {
  static validateLoginCredentials = [
    body('login').notEmpty().withMessage('Login is required'),
    body('password').notEmpty().withMessage('Password is required'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ];

  static checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token Not Found' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.authKey);

      if (typeof decoded === 'string')
        return res.status(401).json({ message: 'Invalid Token Format' });

      const user = await UserModel.findById(decoded.userId);

      if (!user) return res.status(404).json({ message: 'User not found' });

      (req as VerifiedUserRequest).user = user.id;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token Expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid Token' });
      } else {
        next(error);
      }
    }
  };
}

export default AuthMiddleware;
