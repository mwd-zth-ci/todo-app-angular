import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { todoReducer } from './store/reducers/todo.reducer';
import { TodoEffects } from './store/effects/todo.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TodoRepositoryImpl } from '@core/infrastructure/repositories/todo.repository.impl';
import { TodoUseCase } from './core/application/use-cases/todo/todo.usecase';
import { StorageService } from './shared/infrastructure/services/storage.service';
import { TODO_REPOSITORY } from '@core/core.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
    provideAnimations(),
    TodoRepositoryImpl,
    TodoUseCase,
    StorageService,
    { provide: TODO_REPOSITORY, useClass: TodoRepositoryImpl }
  ],
};
