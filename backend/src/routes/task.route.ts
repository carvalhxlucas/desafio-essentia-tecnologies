import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.use(authMiddleware);

router.get('/tasks', taskController.findAll.bind(taskController));
router.get('/tasks/:id', taskController.findById.bind(taskController));
router.post('/tasks', taskController.create.bind(taskController));
router.put('/tasks/:id', taskController.update.bind(taskController)); 
router.patch('/tasks/:id/complete', taskController.toggleCompletion.bind(taskController));
router.delete('/tasks/:id', taskController.delete.bind(taskController));

export default router;