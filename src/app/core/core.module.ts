import { NgModule } from '@angular/core';
import { TodoRepositoryImpl } from '@core/infrastructure/repositories/todo.repository.impl';
import { TodoUseCase } from '@core/application/use-cases/todo/todo.usecase';
import { StorageService } from '@shared/infrastructure/services/storage.service';
import { TODO_REPOSITORY } from './core.tokens';

@NgModule({
  providers: [
    TodoRepositoryImpl,
    TodoUseCase,
    StorageService,
    { provide: TODO_REPOSITORY, useClass: TodoRepositoryImpl }
  ]
})
export class CoreModule { } 