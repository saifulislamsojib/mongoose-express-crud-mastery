import cors from 'cors';
import express from 'express';
import configs from './configs';
import errorHandler, { notFound } from './middleware/errorHandler.middleware';
import apiRoute from './routes/api.routes';
import rootRoute from './routes/root.routes';

const { origin } = configs;

// app initialization
const app = express();

// app middleware
app.use(express.json());
app.use(cors({ origin }));

// all routes
app.use('/', rootRoute);
app.use('/api', apiRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
