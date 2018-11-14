
import { Router } from 'express';
import userRouter from './userRoutes';
import orderRouter from './orderRoutes';
import itemRouter from './itemRoutes';

const router = Router();
router.use('/api/item', itemRouter);
router.use('/api/user', userRouter);
router.use('/api/order', orderRouter);

export default router;
