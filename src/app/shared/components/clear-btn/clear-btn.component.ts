import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoService } from '../../core/application/services/todo.service';

@Component({
  selector: 'app-clear-btn',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './clear-btn.component.html',
  styleUrls: ['./clear-btn.component.css']
})
export class ClearBtnComponent {
  constructor(private todoService: TodoService) {}

  completedTodos$ = this.todoService.getCompletedTodos();

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
