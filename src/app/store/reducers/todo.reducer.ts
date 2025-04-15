import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import { TodoState, initialState } from '../state/todo.state';

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TodoActions.addTodo, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false
  })),
  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TodoActions.toggleTodo, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.toggleTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
    loading: false
  })),
  on(TodoActions.toggleTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id),
    loading: false
  })),
  on(TodoActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TodoActions.setFilter, (state, { filter }) => ({
    ...state,
    filter
  })),

  on(TodoActions.clearCompleted, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.clearCompletedSuccess, (state) => ({
    ...state,
    todos: state.todos.filter(t => !t.completed),
    loading: false
  })),
  on(TodoActions.clearCompletedFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
