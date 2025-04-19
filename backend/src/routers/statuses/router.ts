import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { StatusesController } from './controller';

const router = express.Router();

const { endpoints } = APIEndpoints.statuses;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  StatusesController.create
);

router.get(endpoints.get, AuthMiddleware.checkAuth, StatusesController.get);

export { router as StatusesRouter };
