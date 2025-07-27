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

  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      return null;
    }

    this.taskRepository.merge(task, taskData);
    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);

    return result.affected !== 0 && result.affected !== null;
  }

  async toggleCompletion(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      return null;
    }
    task.completed = !task.completed;
    return this.taskRepository.save(task);
  }
}