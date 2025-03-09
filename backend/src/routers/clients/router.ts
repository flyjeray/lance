import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { ClientsController } from './controller';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { validatePayload } from '@/utils/validation';
import { CreateClientPayload } from '@lance/shared/models/api/clients';

const router = express.Router();

const { endpoints } = APIEndpoints.clients;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  validatePayload<CreateClientPayload>(['name']),
  ClientsController.create
);

router.get(endpoints.get, AuthMiddleware.checkAuth, ClientsController.get);

export { router as ClientsRouter };
