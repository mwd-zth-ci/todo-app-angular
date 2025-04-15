import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';

import * as TodoActions from '@store/actions/todo.actions';
import { Todo } from 'src/app/core/domain/models/todo.model';

@Component({
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private store = inject(Store);
  private cdRef = inject(ChangeDetectorRef);

  _todo!: Todo;
  @Input()
  set todo(todo: Todo) {
    this._todo = todo;
    this.input.setValue(this._todo.title);
  }
  editingMode = false;
  input = new FormControl('', { nonNullable: true });
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  toggle() {
    this.store.dispatch(TodoActions.toggleTodo({ id: this._todo.id }));
  }

  update() {
    const title = this.input.value.trim();
    if (title !== '') {
      this.store.dispatch(TodoActions.updateTodo({ id: this._todo.id, dto: { title } }));
    }
  }

  remove() {
    this.store.dispatch(TodoActions.deleteTodo({ id: this._todo.id }));
  }

  escape() {
    this.editingMode = !this.editingMode;
    this.input.setValue(this._todo.title);
  }

  enableEditingMode() {
    this.editingMode = !this.editingMode;
    this.cdRef.detectChanges();
    this.inputElement.nativeElement.focus();
  }
}
