import express from 'express';
import AuthController from './controller';
import AuthMiddleware from '@/middleware/auth';
import APIEndpoints from '@lance/shared/constants/endpoints';

const router = express.Router();

const { endpoints } = APIEndpoints.auth;

router.post(endpoints.login, AuthController.login);

router.post(endpoints.logout, AuthMiddleware.checkAuth, AuthController.logout);

router.get(endpoints.me, AuthMiddleware.checkAuth, AuthController.me);

export { router as AuthRouter };
