import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  constructor(private taskService: TaskService) {}

  /**
   * @description Cria uma nova tarefa.
   * @route POST /tasks
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const task = await this.taskService.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar a tarefa.' });
    }
  }

  /**
   * @description Lista todas as tarefas.
   * @route GET /tasks
   */
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await this.taskService.findAll();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar as tarefas.' });
    }
  }

  /**
   * @description Busca uma tarefa pelo ID.
   * @route GET /tasks/:id
   */
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const task = await this.taskService.findById(id);

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
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const updatedTask = await this.taskService.update(id, req.body);

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
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const wasDeleted = await this.taskService.delete(id);

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
  async toggleCompletion(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const task = await this.taskService.toggleCompletion(id);

      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar o status da tarefa.' });
    }
  }
}