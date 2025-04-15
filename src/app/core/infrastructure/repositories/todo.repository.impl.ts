import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo, TodoCreateDto, TodoUpdateDto } from '@core/domain/models/todo.model';
import { TodoRepository } from '@core/domain/repositories/todo.repository';
import { StorageService } from '@shared/infrastructure/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryImpl implements TodoRepository {
  private readonly STORAGE_KEY = 'todos';
  private todosCache: Todo[] | null = null;

  constructor(private storageService: StorageService) {}

  private getTodos(): Todo[] {
    if (this.todosCache === null) {
      this.todosCache = this.storageService.getItem<Todo[]>(this.STORAGE_KEY) || [];
    }
    return this.todosCache;
  }

  private saveTodos(todos: Todo[]): void {
    this.todosCache = todos;
    this.storageService.setItem(this.STORAGE_KEY, todos);
  }

  getAll(): Observable<Todo[]> {
    return of(this.getTodos());
  }

  getById(id: number): Observable<Todo> {
    const todo = this.getTodos().find(t => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return of(todo);
  }

  create(dto: TodoCreateDto): Observable<Todo> {
    const todos = this.getTodos();
    const newTodo: Todo = {
      id: this.generateId(),
      ...dto,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    todos.push(newTodo);
    this.saveTodos(todos);
    return of(newTodo);
  }

  update(id: number, dto: TodoUpdateDto): Observable<Todo> {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }
    const updatedTodo = {
      ...todos[index],
      ...dto,
      updatedAt: new Date()
    };
    todos[index] = updatedTodo;
    this.saveTodos(todos);
    return of(updatedTodo);
  }

  delete(id: number): Observable<void> {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }
    todos.splice(index, 1);
    this.saveTodos(todos);
    return of(void 0);
  }

  toggle(id: number): Observable<Todo> {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }
    const updatedTodo = {
      ...todos[index],
      completed: !todos[index].completed,
      updatedAt: new Date()
    };
    todos[index] = updatedTodo;
    this.saveTodos(todos);
    return of(updatedTodo);
  }

  clearCompleted(): Observable<void> {
    const todos = this.getTodos();
    const activeTodos = todos.filter(todo => !todo.completed);
    this.saveTodos(activeTodos);
    return of(void 0);
  }

  private generateId(): number {
    const todos = this.getTodos();
    return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  }
} 