import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

interface AuthRequest extends Request {
  userId?: number;
}

export class TaskController {
  constructor(private taskService: TaskService) {}

  /**
   * @description Cria uma nova tarefa.
   * @route POST /tasks
   */
  async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const task = await this.taskService.create(req.body, userId);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Erro ao criar a tarefa.' });
    }
  }

  /**
   * @description Lista todas as tarefas.
   * @route GET /tasks
   */
  async findAll(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const tasks = await this.taskService.findAll(userId);
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar as tarefas.' });
    }
  }

  /**
   * @description Busca uma tarefa pelo ID.
   * @route GET /tasks/:id
   */
  async findById(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const taskId = Number(req.params.id);
      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const task = await this.taskService.findById(taskId, userId);
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar a tarefa.' });
    }
  }

  /**
   * @description Atualiza uma tarefa existente.
   * @route PUT /tasks/:id
   */
  async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const taskId = Number(req.params.id);
      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const updatedTask = await this.taskService.update(taskId, req.body, userId);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada para atualização.' });
      }

      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar a tarefa.' });
    }
  }

  /**
   * @description Deleta uma tarefa.
   * @route DELETE /tasks/:id
   */
  async delete(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const taskId = Number(req.params.id);
      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }


      const wasDeleted = await this.taskService.delete(taskId, userId);
      if (!wasDeleted) {
        return res.status(404).json({ message: 'Tarefa não encontrada para exclusão.' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar a tarefa.' });
    }
  }

  /**
   * @description Marca a tarefa como concluída.
   * @route PATCH /tasks/:id/toggle
   */
  async toggleCompletion(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const taskId = Number(req.params.id);
      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const task = await this.taskService.toggleCompletion(taskId, userId);
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar o status da tarefa.' });
    }
  }
}