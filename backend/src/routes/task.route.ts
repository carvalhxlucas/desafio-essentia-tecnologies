import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.use(authMiddleware);

router.get('/', taskController.findAll.bind(taskController));
router.post('/', taskController.create.bind(taskController));
router.put('/:id', taskController.update.bind(taskController));
router.delete('/:id', taskController.delete.bind(taskController));
router.patch('/:id/toggle', taskController.toggleCompletion.bind(taskController));

export default router;