import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  constructor(private taskService: TaskService) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const tasks = await this.taskService.findAll();
    return res.json(tasks);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await this.taskService.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.json(task);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Título é obrigatório!' });
    }

    const task = await this.taskService.create(title.trim());
    return res.status(201).json(task);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { title } = req.body;

    const task = await this.taskService.update(id, title?.trim());
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.json(task);
  }

  async toggleCompletion(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await this.taskService.toggleCompletion(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.json(task);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await this.taskService.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await this.taskService.delete(id);
    return res.status(204).send();
  }
}