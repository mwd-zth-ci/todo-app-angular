import { Todo } from '@core/domain/models/todo.model';
import { Filter } from '@core/domain/models/filter.model';

export interface TodoState {
  todos: Todo[];
  filter: Filter;
  loading: boolean;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null
};