import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoCreateDto, TodoUpdateDto } from '@core/domain/models/todo.model';
import { TodoRepository } from '@core/domain/repositories/todo.repository';
import { TODO_REPOSITORY } from '@core/core.module';

@Injectable({
  providedIn: 'root'
})
export class TodoUseCase {
  constructor(@Inject(TODO_REPOSITORY) private todoRepository: TodoRepository) {}

  getAll(): Observable<Todo[]> {
    return this.todoRepository.getAll();
  }

  getById(id: number): Observable<Todo> {
    return this.todoRepository.getById(id);
  }

  create(todo: TodoCreateDto): Observable<Todo> {
    return this.todoRepository.create(todo);
  }

  update(id: number, todo: TodoUpdateDto): Observable<Todo> {
    return this.todoRepository.update(id, todo);
  }

  delete(id: number): Observable<void> {
    return this.todoRepository.delete(id);
  }

  toggle(id: number): Observable<Todo> {
    return this.todoRepository.toggle(id);
  }

  clearCompleted(): Observable<void> {
    return this.todoRepository.clearCompleted();
  }
} 