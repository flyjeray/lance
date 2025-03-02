import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';

const app: Application = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
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
