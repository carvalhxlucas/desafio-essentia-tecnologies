import { Task } from "../entities/Task";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  async create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(id: number, title?: string): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    if (title !== undefined) {
      task.title = title;
    }

    return await this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async toggleCompletion(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    task.completed = !task.completed;
    task.updatedAt = new Date();

    return await this.taskRepository.save(task);
  }
}