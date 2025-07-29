import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { User } from "../entities/User";
export class TaskService {
  private userRepository = AppDataSource.getRepository(User);
  private taskRepository = AppDataSource.getRepository(Task);

  async create(taskData: { title: string }, userId: number): Promise<Task> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const task = this.taskRepository.create({
      title: taskData.title,
      user: user,
    });

    return this.taskRepository.save(task);
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { 
        user: { 
          id: userId,
        },
      },
    });
  }

  async findById(taskId: number, userId: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
    });
  }

  async update(taskId: number, taskData: { title: string }, userId: number): Promise<Task | null> {
    const task = await this.findById(taskId, userId);
    if (!task) {
      return null;
    }

    task.title = taskData.title;
    return this.taskRepository.save(task);
  }

  async delete(taskId: number, userId: number): Promise<boolean> {
    const result = await this.taskRepository.delete({
      id: taskId,
      user: { id: userId },
    });

    return result.affected !== 0 && result.affected !== null;
  }

  async toggleCompletion(taskId: number, userId: number): Promise<Task | null> {
    const task = await this.findById(taskId, userId);
    if (!task) {
      return null;
    }
    task.completed = !task.completed;
    return this.taskRepository.save(task);
  }
}