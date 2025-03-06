import express from 'express';
import AuthController from './controller';
import AuthMiddleware from '@/middleware/auth';
import APIEndpoints from '@lance/shared/constants/endpoints';

const router = express.Router();

const { endpoints } = APIEndpoints.auth;

router.post(
  endpoints.login,
  AuthMiddleware.validateLoginCredentials,
  AuthController.login
);

router.get(endpoints.me, AuthMiddleware.checkAuth, AuthController.me);

export { router as AuthRouter };
