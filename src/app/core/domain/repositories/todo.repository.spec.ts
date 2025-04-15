import { Observable } from 'rxjs';
import { Todo, TodoCreateDto, TodoUpdateDto } from '../models/todo.model';
import { TodoRepository } from './todo.repository';

describe('TodoRepository Interface', () => {
  let repository: jasmine.SpyObj<TodoRepository>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('TodoRepository', [
      'getAll',
      'getById',
      'create',
      'update',
      'delete',
      'toggle',
      'clearCompleted'
    ]);
  });

  it('should have getAll method that returns Observable<Todo[]>', () => {
    const todos: Todo[] = [];
    repository.getAll.and.returnValue(new Observable(subscriber => {
      subscriber.next(todos);
      subscriber.complete();
    }));

    const result = repository.getAll();
    expect(result).toBeInstanceOf(Observable);
  });

  it('should have getById method that returns Observable<Todo>', () => {
    const todo: Todo = {
      id: 1,
      title: 'Test Todo',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    repository.getById.and.returnValue(new Observable(subscriber => {
      subscriber.next(todo);
      subscriber.complete();
    }));

    const result = repository.getById(1);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should have create method that returns Observable<Todo>', () => {
    const dto: TodoCreateDto = { 
      title: 'Test Todo',
      completed: false
    };
    const todo: Todo = {
      id: 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    repository.create.and.returnValue(new Observable(subscriber => {
      subscriber.next(todo);
      subscriber.complete();
    }));

    const result = repository.create(dto);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should have update method that returns Observable<Todo>', () => {
    const dto: TodoUpdateDto = { title: 'Updated Todo' };
    const todo: Todo = {
      id: 1,
      title: 'Updated Todo',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    repository.update.and.returnValue(new Observable(subscriber => {
      subscriber.next(todo);
      subscriber.complete();
    }));

    const result = repository.update(1, dto);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should have delete method that returns Observable<void>', () => {
    repository.delete.and.returnValue(new Observable(subscriber => {
      subscriber.next();
      subscriber.complete();
    }));

    const result = repository.delete(1);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should have toggle method that returns Observable<Todo>', () => {
    const todo: Todo = {
      id: 1,
      title: 'Test Todo',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    repository.toggle.and.returnValue(new Observable(subscriber => {
      subscriber.next(todo);
      subscriber.complete();
    }));

    const result = repository.toggle(1);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should have clearCompleted method that returns Observable<void>', () => {
    repository.clearCompleted.and.returnValue(new Observable(subscriber => {
      subscriber.next();
      subscriber.complete();
    }));

    const result = repository.clearCompleted();
    expect(result).toBeInstanceOf(Observable);
  });
}); 