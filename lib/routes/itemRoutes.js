import { Router } from 'express';
import ItemsController from '../controllers/ItemsController';

const router = Router();

router.route('')
  .get(ItemsController.list)
  .post(ItemsController.create);
router.route('/:id')
  .delete(ItemsController.delete);
export default router;
