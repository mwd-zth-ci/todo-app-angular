import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoState } from '@store/state/todo.state';
import { selectTodos } from '@store/selectors/todo.selectors';
import { map } from 'rxjs/operators';
import { TODO_REPOSITORY } from '@core/core.tokens';
import { Todo } from '@core/domain/models/todo.model';
import * as TodoActions from '@store/actions/todo.actions';
import { TodoRepository } from '@core/domain/repositories/todo.repository';
import { TodoCreateDto, TodoUpdateDto } from '@core/domain/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private filterSubject = new BehaviorSubject<string>('all');

  constructor(
    @Inject(TODO_REPOSITORY) private repository: TodoRepository,
    private store: Store<{ todos: TodoState }>
  ) {}

  getAll(): Observable<Todo[]> {
    return this.repository.getAll();
  }

  getById(id: number): Observable<Todo> {
    return this.repository.getById(id);
  }

  update(id: number, todo: TodoUpdateDto): Observable<Todo> {
    return this.repository.update(id, todo);
  }

  clearCompleted(): void {
    this.repository.clearCompleted().subscribe({
      next: () => {
        this.store.dispatch(TodoActions.clearCompleted());
      },
      error: (error) => {
        this.store.dispatch(TodoActions.clearCompletedFailure({ error: error.message }));
      }
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.store.select(selectTodos);
  }

  getPendingTodos(): Observable<Todo[]> {
    return this.getTodos().pipe(
      map(todos => todos.filter(todo => !todo.completed))
    );
  }

  getCompletedTodos(): Observable<Todo[]> {
    return this.getTodos().pipe(
      map(todos => todos.filter(todo => todo.completed))
    );
  }

  getFilter(): Observable<string> {
    return this.filterSubject.asObservable();
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  addTodo(title: string): void {
    this.repository.create({ title, completed: false }).subscribe({
      next: (todo) => {
        this.store.dispatch(TodoActions.addTodoSuccess({ todo }));
      },
      error: (error) => {
        this.store.dispatch(TodoActions.addTodoFailure({ error: error.message }));
      }
    });
  }

  toggleTodo(id: number): void {
    this.repository.toggle(id).subscribe({
      next: (todo) => {
        this.store.dispatch(TodoActions.toggleTodoSuccess({ todo }));
      },
      error: (error) => {
        this.store.dispatch(TodoActions.toggleTodoFailure({ error: error.message }));
      }
    });
  }

  deleteTodo(id: number): void {
    this.repository.delete(id).subscribe({
      next: () => {
        this.store.dispatch(TodoActions.deleteTodoSuccess({ id }));
      },
      error: (error) => {
        this.store.dispatch(TodoActions.deleteTodoFailure({ error: error.message }));
      }
    });
  }
} 