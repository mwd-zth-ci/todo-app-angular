import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '@core/domain/models/todo.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { TodosComponent } from '@features/todo/components/todo-list/todos.component';
import { TodoPageComponent } from '@features/todo/pages/todo-page/todo-page.component';
import * as TodoActions from '@store/actions/todo.actions';
import * as TodoSelectors from '@store/selectors/todo.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodosComponent, FooterComponent, TodoPageComponent],
  templateUrl: './home.component.html'
})
export default class HomeComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(TodoSelectors.selectTodos);
    this.loading$ = this.store.select(TodoSelectors.selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(title: string) {
    const now = new Date();
    this.store.dispatch(TodoActions.addTodo({ 
      todo: { 
        id: Date.now(), 
        title, 
        completed: false,
        createdAt: now,
        updatedAt: now
      } 
    }));
  }

  toggleTodo(id: number) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
}
