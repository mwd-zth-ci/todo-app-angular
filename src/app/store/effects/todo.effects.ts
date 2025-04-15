import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { TodoService } from '@core/services/todo.service';
import * as TodoActions from '@store/actions/todo.actions';
import { Store } from '@ngrx/store';
import { selectTodos } from '@store/selectors/todo.selectors';

@Injectable()
export class TodoEffects {
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
      mergeMap(({ todo }) => {
        return of(TodoActions.addTodoSuccess({ todo }));
      })
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      mergeMap(({ id }) => {
        return this.store.select(selectTodos).pipe(
          take(1),
          map(todos => {
            const todo = todos.find(t => t.id === id);
            if (!todo) {
              throw new Error('Todo not found');
            }
            return TodoActions.toggleTodoSuccess({ 
              todo: { 
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date()
              } 
            });
          })
        );
      })
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ id }) => {
        return of(TodoActions.deleteTodoSuccess({ id }));
      })
    )
  );

  clearCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.clearCompleted),
      mergeMap(() => {
        return of(TodoActions.clearCompletedSuccess());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}
}
