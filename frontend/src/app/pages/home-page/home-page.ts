import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  editingTaskId: number | null = null;
  editedTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tarefas carregadas com sucesso:', this.tasks);
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      }
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      return;
    }

    this.taskService.addTask({ title: this.newTaskTitle.trim() }).subscribe({
      next: (newTask: Task) => {
        console.log('Nova tarefa adicionada:', newTask);
        this.tasks.push(newTask);
        this.newTaskTitle = '';
        console.log('Tarefa adicionada com sucesso!', newTask);
      },
      error: (err: any) => {
        console.error('Erro ao adicionar tarefa:', err);
      }
    });
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleCompletion(task).subscribe({
      next: (updatedTask) => { 
        task.completed = updatedTask.completed;
        console.log('Status da tarefa atualizado!', updatedTask);
      },
      error: (err: any) => {
        console.error('Erro ao atualizar status da tarefa:', err);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log('Tarefa deletada com sucesso!');
      },
      error: (err: any) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editedTaskTitle = task.title;
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editedTaskTitle = '';
  }

  saveTask(taskToSave: Task): void {
    if (!this.editedTaskTitle.trim()) {
      this.deleteTask(taskToSave.id);
      return;
    }

    this.taskService.updateTask(taskToSave.id, { title: this.editedTaskTitle.trim() }).subscribe({
      next: (updatedTask) => {
        taskToSave.title = updatedTask.title;

        this.cancelEdit();
        console.log('Tarefa atualizada com sucesso!', updatedTask);
      },
      error: (err: any) => {
        console.error('Erro ao atualizar tarefa:', err);
        this.cancelEdit();
      }
    });
  }
}