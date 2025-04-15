import { NgModule } from '@angular/core';
import { TodoRepositoryImpl } from '@core/infrastructure/repositories/todo.repository.impl';
import { StorageService } from '@shared/infrastructure/services/storage.service';
import { TODO_REPOSITORY } from './core.tokens';

@NgModule({
  providers: [
    TodoRepositoryImpl,
    StorageService,
    { provide: TODO_REPOSITORY, useClass: TodoRepositoryImpl }
  ]
})
export class CoreModule { } 