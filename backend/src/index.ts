import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';
import { connectToDatabase } from './utils/databaseConnection';
import routers from './routers';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/auth', routers.auth);

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
