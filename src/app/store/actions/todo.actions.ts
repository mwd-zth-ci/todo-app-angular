import { createAction, props } from '@ngrx/store';
import { Todo, TodoUpdateDto } from '@core/domain/models/todo.model';
import { Filter } from '@core/domain/models/filter.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: string }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);
export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ todo: Todo }>()
);
export const toggleTodoFailure = createAction(
  '[Todo] Toggle Todo Failure',
  props<{ error: string }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>()
);
export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: string }>()
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ id: number; dto: TodoUpdateDto }>()
);

export const setFilter = createAction(
  '[Todo] Set Filter',
  props<{ filter: Filter }>()
);

export const clearCompleted = createAction('[Todo] Clear Completed');
export const clearCompletedSuccess = createAction('[Todo] Clear Completed Success');
export const clearCompletedFailure = createAction(
  '[Todo] Clear Completed Failure',
  props<{ error: string }>()
);