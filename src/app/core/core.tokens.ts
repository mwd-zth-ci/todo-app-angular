import { InjectionToken } from '@angular/core';
import { TodoRepository } from '@core/domain/repositories/todo.repository';

export const TODO_REPOSITORY = new InjectionToken<TodoRepository>('TodoRepository'); 