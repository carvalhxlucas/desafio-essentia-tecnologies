import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

router.get('/tasks', TaskController.getAll);
router.get('/tasks/:id', TaskController.getById);
router.post('/tasks', TaskController.create);
router.put('/tasks/:id', TaskController.update); 
router.patch('/tasks/:id/toggle', TaskController.toggleCompletion);
router.delete('/tasks/:id', TaskController.delete);

export default router;