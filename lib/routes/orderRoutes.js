import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const router = Router();

router.route('')
  .get(OrdersController.list)
  .post(OrdersController.create);
router.route('/:id')
  .delete(OrdersController.delete);
router.get('/list-users-orders', OrdersController.listUsersOrders);
export default router;
