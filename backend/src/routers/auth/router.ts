import express from 'express';
import AuthController from './controller';
import AuthMiddleware from '@/middleware/auth';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { validatePayload } from '@/utils/validation';
import { AuthCredentials } from '@lance/shared/models/api/auth';

const router = express.Router();

const { endpoints } = APIEndpoints.auth;

router.post(
  endpoints.login,
  validatePayload<AuthCredentials>(['login', 'password']),
  AuthController.login
);

router.post(endpoints.logout, AuthMiddleware.checkAuth, AuthController.logout);

router.get(endpoints.me, AuthMiddleware.checkAuth, AuthController.me);

export { router as AuthRouter };
