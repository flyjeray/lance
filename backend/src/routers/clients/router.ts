import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { ClientsController } from './controller';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { SingleEntityGetPayload } from '@lance/shared/models/api/general';

const router = express.Router();

const { endpoints } = APIEndpoints.clients;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  ClientsController.create
);

router.get(
  endpoints.getPaginated,
  AuthMiddleware.checkAuth,
  ClientsController.getPaginated
);

router.get(
  endpoints.getSingle,
  AuthMiddleware.checkAuth,
  ClientsController.getSingle
);

router.get(
  endpoints.nameDictionary,
  AuthMiddleware.checkAuth,
  ClientsController.getNameDictionary
);

router.get(
  endpoints.getClientOrders,
  AuthMiddleware.checkAuth,
  ClientsController.getOrders
);

router.delete(
  endpoints.delete,
  AuthMiddleware.checkAuth,
  ClientsController.delete
);

router.post(
  endpoints.update,
  AuthMiddleware.checkAuth,
  ClientsController.update
);

export { router as ClientsRouter };
