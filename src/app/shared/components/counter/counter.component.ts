import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoService } from '@core/application/services/todo.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  constructor(private todoService: TodoService) {}

  pendingTodos$ = this.todoService.getPendingTodos();
}
