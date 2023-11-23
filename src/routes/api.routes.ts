import userRoutes from '@/modules/user/user.route';
import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);

export default apiRoutes;
