import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '../../../../core/domain/models/filter.model';
import { TodoComponent } from '../todo-item/todo.component';
import { Store } from '@ngrx/store';
import { TodoService } from '../../../../core/application/services/todo.service';
import { selectTodos, selectLoading } from '../../../../store/selectors/todo.selectors';
import * as TodoActions from '../../../../store/actions/todo.actions';

@Component({
  standalone: true,
  imports: [TodoComponent, AsyncPipe],
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  private todoService = inject(TodoService);
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  todos$ = this.store.select(selectTodos);
  loading$ = this.store.select(selectLoading);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const filter = params.get('filter') as Filter;
      this.todoService.setFilter(filter || 'all');
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
