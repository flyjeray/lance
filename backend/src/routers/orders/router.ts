import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { OrdersController } from './controller';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { validatePayload, validateQuery } from '@/utils/validation';
import {
  ChangeOrdersClientPayload,
  ChangeOrdersStatusPayload,
  CreateOrderPayload,
  UpdateOrderPayload,
} from '@lance/shared/models/api/orders';
import { SingleEntityGetPayload } from '@lance/shared/models/api/general';

const router = express.Router();

const { endpoints } = APIEndpoints.orders;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  validatePayload<CreateOrderPayload>(['title', 'client', 'price', 'status']),
  OrdersController.create
);

router.post(
  endpoints.update,
  AuthMiddleware.checkAuth,
  validatePayload<UpdateOrderPayload>(['id', 'data']),
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
  validateQuery<SingleEntityGetPayload>(['id']),
  OrdersController.getSingle
);

router.put(
  endpoints.changeClient,
  AuthMiddleware.checkAuth,
  validatePayload<ChangeOrdersClientPayload>(['newClientID', 'orderID']),
  OrdersController.changeClient
);

router.put(
  endpoints.changeStatus,
  AuthMiddleware.checkAuth,
  validatePayload<ChangeOrdersStatusPayload>(['newStatusID', 'orderID']),
  OrdersController.changeStatus
);

export { router as OrdersRouter };
