import { NgModule, InjectionToken } from '@angular/core';
import { TodoRepositoryImpl } from '@core/infrastructure/repositories/todo.repository.impl';
import { TodoUseCase } from '@core/application/use-cases/todo/todo.usecase';
import { StorageService } from '@shared/infrastructure/services/storage.service';
import { TodoRepository } from '@core/domain/repositories/todo.repository';

export const TODO_REPOSITORY = new InjectionToken<TodoRepository>('TodoRepository');

@NgModule({
  providers: [
    TodoRepositoryImpl,
    TodoUseCase,
    StorageService,
    { provide: TODO_REPOSITORY, useClass: TodoRepositoryImpl }
  ]
})
export class CoreModule { } 