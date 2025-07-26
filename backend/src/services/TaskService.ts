import { Task } from "../entities/Task";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

// Vale o refactor para melhorar a legibilidade e manutenção
export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  async createTask(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return await this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  async updateTask(id: number, title?: string): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    if (title !== undefined) task.title = title;
    task.updatedAt = new Date();

    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async toggleTaskCompletion(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    task.completed = !task.completed;
    task.updatedAt = new Date();

    return await this.taskRepository.save(task);
  }
}