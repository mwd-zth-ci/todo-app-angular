import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TodoUseCase } from '@core/application/use-cases/todo/todo.usecase';
import { Store } from '@ngrx/store';
import { TodoState } from '@store/state/todo.state';
import { selectTodos } from '@store/selectors/todo.selectors';
import { map } from 'rxjs/operators';
import { TODO_REPOSITORY } from '@core/core.module';
import { Todo } from '@core/domain/models/todo.model';
import * as TodoActions from '@store/actions/todo.actions';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private filterSubject = new BehaviorSubject<string>('all');

  constructor(
    @Inject(TODO_REPOSITORY) private todoUseCase: TodoUseCase,
    private store: Store<{ todos: TodoState }>
  ) {}

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
    const now = new Date();
    this.store.dispatch(TodoActions.addTodo({ 
      todo: { 
        id: Date.now(), 
        title, 
        completed: false,
        createdAt: now,
        updatedAt: now
      } 
    }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  clearCompleted(): void {
    this.store.dispatch(TodoActions.clearCompleted());
  }
} 