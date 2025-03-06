import AuthMiddleware from '@/middleware/auth';
import express from 'express';
import { OrdersController } from './controller';

const router = express.Router();

router.post('/create', AuthMiddleware.checkAuth, OrdersController.create);

export { router as OrdersRouter };
