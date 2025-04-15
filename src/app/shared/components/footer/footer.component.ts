import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoService } from '@core/services/todo.service';
import { CounterComponent } from '../counter/counter.component';
import { ClearBtnComponent } from '../clear-btn/clear-btn.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    CounterComponent,
    ClearBtnComponent
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public todoService: TodoService) {}

  todos$ = this.todoService.getTodos();
  filter$ = this.todoService.getFilter();
}
