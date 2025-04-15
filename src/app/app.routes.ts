import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/todo/pages/todo-page/todo-page.component').then(m => m.TodoPageComponent)
  },
  {
    path: ':filter',
    loadComponent: () => import('./features/todo/pages/todo-page/todo-page.component').then(m => m.TodoPageComponent)
  }
];

