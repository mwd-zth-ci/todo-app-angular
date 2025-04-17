import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { TodoService } from '@core/application/services/todo.service';
import * as TodoActions from '@store/actions/todo.actions';
import { Store } from '@ngrx/store';
import { TodoRepository } from '@core/domain/repositories/todo.repository';
import { TODO_REPOSITORY } from '@core/core.tokens';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store,
    @Inject(TODO_REPOSITORY) private repository: TodoRepository
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodoActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap(({ todo }) =>
        this.repository.create(todo).pipe(
          map(todo => TodoActions.addTodoSuccess({ todo })),
          catchError(error => of(TodoActions.addTodoFailure({ error: error.message })))
        )
      )
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      mergeMap(({ id }) =>
        this.repository.toggle(id).pipe(
          map(todo => TodoActions.toggleTodoSuccess({ todo })),
          catchError(error => of(TodoActions.toggleTodoFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ id }) =>
        this.repository.delete(id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id })),
          catchError(error => of(TodoActions.deleteTodoFailure({ error: error.message })))
        )
      )
    )
  );

}
