import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

router.get('/tarefas', TaskController.findAll);
router.get('/tarefas/:id', TaskController.findById);
router.post('/tarefas', TaskController.create);
router.put('/tarefas/:id', TaskController.update); 
router.patch('/tarefas/:id/toggle', TaskController.toggleCompletion);
router.delete('/tarefas/:id', TaskController.delete);

export default router;