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
}