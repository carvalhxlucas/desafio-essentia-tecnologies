import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 * name: Tarefas
 * description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /api/tasks:
 * get:
 * summary: Lista todas as tarefas do usuário autenticado
 * tags: [Tarefas]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de tarefas retornada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * title:
 * type: string
 * completed:
 * type: boolean
 * 401:
 * description: Não autorizado (token inválido ou ausente).
 */
router.get('/', taskController.findAll.bind(taskController));

/**
 * @swagger
 * /api/tasks:
 * post:
 * summary: Cria uma nova tarefa para o usuário autenticado
 * tags: [Tarefas]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - title
 * properties:
 * title:
 * type: string
 * example: "Comprar leite"
 * responses:
 * 201:
 * description: Tarefa criada com sucesso.
 * 400:
 * description: Dados inválidos.
 * 401:
 * description: Não autorizado.
 */
router.post('/', taskController.create.bind(taskController));

/**
 * @swagger
 * /api/tasks/{id}:
 * get:
 * summary: Busca uma tarefa específica pelo ID
 * tags: [Tarefas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: O ID da tarefa.
 * responses:
 * 200:
 * description: Detalhes da tarefa.
 * 404:
 * description: Tarefa não encontrada ou não pertence ao usuário.
 * 401:
 * description: Não autorizado.
 */
router.get('/:id', taskController.findById.bind(taskController));

/**
 * @swagger
 * /api/tasks/{id}:
 * put:
 * summary: Atualiza o título de uma tarefa
 * tags: [Tarefas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - title
 * properties:
 * title:
 * type: string
 * example: "Comprar pão"
 * responses:
 * 200:
 * description: Tarefa atualizada com sucesso.
 * 404:
 * description: Tarefa não encontrada.
 * 401:
 * description: Não autorizado.
 */
router.put('/:id', taskController.update.bind(taskController));

/**
 * @swagger
 * /api/tasks/{id}:
 * delete:
 * summary: Deleta uma tarefa
 * tags: [Tarefas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: Tarefa deletada com sucesso (sem conteúdo).
 * 404:
 * description: Tarefa não encontrada.
 * 401:
 * description: Não autorizado.
 */
router.delete('/:id', taskController.delete.bind(taskController));

/**
 * @swagger
 * /api/tasks/{id}/toggle:
 * patch:
 * summary: Marca uma tarefa como concluída ou pendente
 * tags: [Tarefas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Status da tarefa atualizado com sucesso.
 * 404:
 * description: Tarefa não encontrada.
 * 401:
 * description: Não autorizado.
 */
router.patch('/:id/toggle', taskController.toggleCompletion.bind(taskController));

export default router;