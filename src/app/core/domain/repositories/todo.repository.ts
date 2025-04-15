import { Observable } from 'rxjs';
import { Todo, TodoCreateDto, TodoUpdateDto } from '@core/domain/models/todo.model';

export interface TodoRepository {
  getAll(): Observable<Todo[]>;
  getById(id: number): Observable<Todo>;
  create(todo: TodoCreateDto): Observable<Todo>;
  update(id: number, todo: TodoUpdateDto): Observable<Todo>;
  delete(id: number): Observable<void>;
  toggle(id: number): Observable<Todo>;
  clearCompleted(): Observable<void>;
} 