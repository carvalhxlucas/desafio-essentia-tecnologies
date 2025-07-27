import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tarefas';

  constructor(private http: HttpClient) { }

  // Método para buscar todas as tarefas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Método para criar uma nova tarefa
  addTask(taskData: { title: string }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData);
  }

  // Método para concluir uma tarefa
  toggleCompletion(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${task.id}/concluir`, {});
  }

  // Método para deletar uma tarefa
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  // Método para atualizar uma tarefa
  updateTask(taskId: number, updates: { title: string }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, updates);
  }
}