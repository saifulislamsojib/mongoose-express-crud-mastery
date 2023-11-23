import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/');
userRoutes.get('/');
userRoutes.get('/:userId/orders/total-price');
userRoutes.get('/:userId/orders');
userRoutes.get('/:userId');
userRoutes.put('/:userId/orders');
userRoutes.put('/:userId');
userRoutes.delete('/:userId');

export default userRoutes;
