import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { OrdersController } from './controller';
import APIEndpoints from '@lance/shared/constants/endpoints';

const router = express.Router();

const { endpoints } = APIEndpoints.orders;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  OrdersController.create
);

export { router as OrdersRouter };
