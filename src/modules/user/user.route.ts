import { Router } from 'express';
import {
  createOrder,
  createUser,
  deleteUser,
  getAllOrders,
  getAllOrdersTotalPrice,
  getAllUser,
  getSingleUser,
  updateUser,
} from './user.controller';

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getAllUser);
userRoutes.get('/:userId/orders/total-price', getAllOrdersTotalPrice);
userRoutes.get('/:userId/orders', getAllOrders);
userRoutes.get('/:userId', getSingleUser);
userRoutes.put('/:userId/orders', createOrder);
userRoutes.put('/:userId', updateUser);
userRoutes.delete('/:userId', deleteUser);

export default userRoutes;
