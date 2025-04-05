import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { connectToDatabase } from './utils/databaseConnection';
import routers from './routers';
import APIEndpoints from '@lance/shared/constants/endpoints';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(APIEndpoints.auth.prefix, routers.auth);
app.use(APIEndpoints.orders.prefix, routers.orders);
app.use(APIEndpoints.clients.prefix, routers.clients);

const startServer = async () => {
  await connectToDatabase();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

app.get('/test', (_, res) => {
  console.log('TEST GET Request');
  return res.json('TEST GET Request Success');
});

if (require.main === module) {
  startServer();
}

export default app;
