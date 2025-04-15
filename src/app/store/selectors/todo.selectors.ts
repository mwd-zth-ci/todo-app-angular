import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../state/todo.state';
import { Filter } from '@core/domain/models/filter.model';
import { Todo } from '@core/domain/models/todo.model';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectFilter = createSelector(
  selectTodoState,
  (state: TodoState) => state.filter
);

export const selectLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos: Todo[], filter: Filter) => {
    switch (filter) {
      case 'pending':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
);

export const selectActiveCount = createSelector(
  selectTodos,
  (todos: Todo[]) => todos.filter(todo => !todo.completed).length
);

export const selectCompletedCount = createSelector(
  selectTodos,
  (todos: Todo[]) => todos.filter(todo => todo.completed).length
);
