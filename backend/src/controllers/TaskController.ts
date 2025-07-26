import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

export class TaskController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    const tasks = await taskService.findAll();
    return res.json(tasks);
  }

  static async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await taskService.findById(id);

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

    const task = await taskService.create(title.trim());
    return res.status(201).json(task);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { title } = req.body;

    const task = await taskService.update(id, title?.trim());
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.json(task);
  }

  static async toggleCompletion(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await taskService.toggleCompletion(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.json(task);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await taskService.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await taskService.delete(id);
    return res.status(204).send();
  }
}