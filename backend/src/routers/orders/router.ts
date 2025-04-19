import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { OrdersController } from './controller';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { validatePayload } from '@/utils/validation';
import { CreateOrderPayload } from '@lance/shared/models/api/orders';

const router = express.Router();

const { endpoints } = APIEndpoints.orders;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  validatePayload<CreateOrderPayload>(['title', 'client']),
  OrdersController.create
);

router.get(
  endpoints.getPaginated,
  AuthMiddleware.checkAuth,
  OrdersController.get
);

router.get(
  endpoints.getSingle,
  AuthMiddleware.checkAuth,
  OrdersController.getSingle
);

router.put(
  endpoints.changeClient,
  AuthMiddleware.checkAuth,
  OrdersController.changeClient
);

router.put(
  endpoints.changeStatus,
  AuthMiddleware.checkAuth,
  OrdersController.changeStatus
);

export { router as OrdersRouter };
