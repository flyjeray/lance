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

router.post(
  endpoints.update,
  AuthMiddleware.checkAuth,
  OrdersController.update
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

router.delete(
  endpoints.delete,
  AuthMiddleware.checkAuth,
  OrdersController.delete
);

router.put(
  endpoints.switchCompleteStatus,
  AuthMiddleware.checkAuth,
  OrdersController.switchCompletionStatus
);

export { router as OrdersRouter };
