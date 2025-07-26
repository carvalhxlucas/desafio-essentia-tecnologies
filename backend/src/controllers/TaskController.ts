import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

// Precisa de refactor também para melhorar a legibilidade e manutenção

export class TaskController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const tasks = await taskService.getAllTasks();
    return res.json(tasks);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await taskService.getTaskById(Number(id));
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.json(task);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Título é obrigatório!' });
    }

    const task = await taskService.createTask(title);
    return res.status(201).json(task);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { title } = req.body;

    const task = await taskService.updateTask(id, title);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.json(task);
  }

  static async toggleCompletion(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await taskService.toggleTaskCompletion(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.json(task);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const deletedTask = await taskService.getTaskById(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.status(204).send();
  }
}