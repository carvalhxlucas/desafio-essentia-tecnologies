import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';

const router = Router();

const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.get('/tarefas', taskController.findAll.bind(taskController));
router.get('/tarefas/:id', taskController.findById.bind(taskController));
router.post('/tarefas', taskController.create.bind(taskController));
router.put('/tarefas/:id', taskController.update.bind(taskController)); 
router.patch('/tarefas/:id/concluir', taskController.toggleCompletion.bind(taskController));
router.delete('/tarefas/:id', taskController.delete.bind(taskController));

export default router;