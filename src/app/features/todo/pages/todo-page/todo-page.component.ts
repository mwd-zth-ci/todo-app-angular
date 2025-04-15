import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '@core/services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '@core/domain/models/todo.model';
import { ActivatedRoute } from '@angular/router';
import { TodoListComponent } from '@features/todo/components/todo-list/todo-list.component';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTodos } from '@store/selectors/todo.selectors';
import * as TodoActions from '@store/actions/todo.actions';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoListComponent],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  todos$: Observable<Todo[]>;
  filter$: Observable<string>;
  newTodoTitle: string = '';

  constructor(
    public todoService: TodoService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.todos$ = this.store.select(selectTodos);
    this.filter$ = this.todoService.getFilter();
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle.trim());
      this.newTodoTitle = '';
    }
  }

  isAllCompleted(): Observable<boolean> {
    return this.todos$.pipe(
      map(todos => todos?.every(todo => todo.completed) || false)
    );
  }

  getPendingCount(): Observable<number> {
    return this.todos$.pipe(
      map(todos => todos?.filter(todo => !todo.completed).length || 0)
    );
  }

  hasCompletedTodos(): Observable<boolean> {
    return this.todos$.pipe(
      map(todos => todos?.some(todo => todo.completed) || false)
    );
  }

  toggleAll(completed: boolean): void {
    this.todos$.subscribe(todos => {
      todos.forEach(todo => {
        if (todo.completed !== completed) {
          this.todoService.toggleTodo(todo.id);
        }
      });
    });
  }
} 