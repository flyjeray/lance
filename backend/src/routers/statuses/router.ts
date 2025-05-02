import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import APIEndpoints from '@lance/shared/constants/endpoints';
import { StatusesController } from './controller';
import { validatePayload, validateQuery } from '@/utils/validation';
import {
  CreateStatusPayload,
  DeleteStatusPayload,
} from '@lance/shared/models/api/statuses';

const router = express.Router();

const { endpoints } = APIEndpoints.statuses;

router.post(
  endpoints.create,
  AuthMiddleware.checkAuth,
  validatePayload<CreateStatusPayload>(['label']),
  StatusesController.create
);

router.get(endpoints.get, AuthMiddleware.checkAuth, StatusesController.get);

router.delete(
  endpoints.delete,
  AuthMiddleware.checkAuth,
  validateQuery<DeleteStatusPayload>(['id', 'replacement_id']),
  StatusesController.delete
);

export { router as StatusesRouter };
