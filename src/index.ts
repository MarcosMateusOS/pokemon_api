import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { routes } from './routes/routes';
import { AppDataSource } from './database/connection';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const PORT = process.env.NODE_DOCKER_PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const swaggerFile = require('../swagger-output.json');
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized!');
  })
  .catch(error => {
    console.log('Error Data Source => ', error);
  });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
