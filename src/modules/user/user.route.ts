import { Router } from 'express';
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from './user.controller';

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getAllUser);
userRoutes.get('/:userId/orders/total-price');
userRoutes.get('/:userId/orders');
userRoutes.get('/:userId', getSingleUser);
userRoutes.put('/:userId/orders');
userRoutes.put('/:userId', updateUser);
userRoutes.delete('/:userId', deleteUser);

export default userRoutes;
