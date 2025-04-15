import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../core/application/services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private todoService: TodoService) {}

  addTodo(title: string) {
    if (title.trim()) {
      this.todoService.addTodo(title.trim());
    }
  }
}
