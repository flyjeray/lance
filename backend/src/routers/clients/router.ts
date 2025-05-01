import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { ClientsController } from './controller';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { validatePayload, validateQuery } from '@/utils/validation';
import { CreateClientPayload } from '@lance/shared/models/api/clients';
import { SingleEntityGetPayload } from '@lance/shared/models/api/general';

const router = express.Router();

const { endpoints } = APIEndpoints.clients;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  validatePayload<CreateClientPayload>(['name']),
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
  validateQuery<SingleEntityGetPayload>(['id']),
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
  validateQuery<SingleEntityGetPayload>(['id']),
  ClientsController.getOrders
);

router.delete(
  endpoints.delete,
  AuthMiddleware.checkAuth,
  validateQuery<SingleEntityGetPayload>(['id']),
  ClientsController.delete
);

router.post(
  endpoints.update,
  AuthMiddleware.checkAuth,
  ClientsController.update
);

export { router as ClientsRouter };
