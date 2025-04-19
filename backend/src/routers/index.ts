import { AuthRouter } from './auth/router';
import { ClientsRouter } from './clients/router';
import { OrdersRouter } from './orders/router';
import { StatusesRouter } from './statuses/router';

export default {
  auth: AuthRouter,
  orders: OrdersRouter,
  clients: ClientsRouter,
  statuses: StatusesRouter,
};
