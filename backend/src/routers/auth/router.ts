import express from 'express';
import AuthController from './controller';
import AuthMiddleware from '@/middleware/auth';

const router = express.Router();

router.post(
  '/login',
  AuthMiddleware.validateLoginCredentials,
  AuthController.login
);

router.get('/me', AuthMiddleware.checkAuth, AuthController.me);

export { router as AuthRouter };
