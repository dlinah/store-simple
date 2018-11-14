import { Router } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();

router.route('')
  .post(UsersController.create)
  .get(UsersController.list);
router.route('/:id')
  .delete(UsersController.delete);

export default router;
