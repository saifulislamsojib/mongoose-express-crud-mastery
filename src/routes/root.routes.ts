import { Router } from 'express';

const rootRoute = Router();

rootRoute.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the server boss!', success: 200 });
});

export default rootRoute;
