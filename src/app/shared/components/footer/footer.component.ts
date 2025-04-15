import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoService } from '@core/application/services/todo.service';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { ClearBtnComponent } from '@shared/components/clear-btn/clear-btn.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CounterComponent, ClearBtnComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public todoService: TodoService) {}

  todos$ = this.todoService.getTodos();
  filter$ = this.todoService.getFilter();
}
