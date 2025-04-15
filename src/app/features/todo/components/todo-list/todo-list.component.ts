import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TodoService } from '@core/services/todo.service';
import { Todo } from '@core/domain/models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnChanges {
  @Input() todos$!: Observable<Todo[]>;
  filter$ = this.todoService.getFilter();
  filteredTodos$: Observable<Todo[]> | null = null;

  constructor(public todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todos$'] && this.todos$) {
      this.filteredTodos$ = this.todos$.pipe(
        switchMap(todos => 
          this.filter$.pipe(
            map(filter => {
              switch (filter) {
                case 'active':
                  return todos.filter(todo => !todo.completed);
                case 'completed':
                  return todos.filter(todo => todo.completed);
                default:
                  return todos;
              }
            })
          )
        )
      );
    }
  }
} 