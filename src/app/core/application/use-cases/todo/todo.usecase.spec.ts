import { TestBed } from '@angular/core/testing';
import { TodoUseCase } from './todo.usecase';
import { TodoRepository } from '../../../domain/repositories/todo.repository';
import { Todo, TodoCreateDto, TodoUpdateDto } from '../../../domain/models/todo.model';
import { of } from 'rxjs';

describe('TodoUseCase', () => {
  let useCase: TodoUseCase;
  let repository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    repository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      toggle: jest.fn(),
      clearCompleted: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        TodoUseCase,
        { provide: TodoRepository, useValue: repository }
      ]
    });

    useCase = TestBed.inject(TodoUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return todos from repository', () => {
      const todos: Todo[] = [{
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }];
      repository.getAll.mockReturnValue(of(todos));

      useCase.getAll().subscribe(result => {
        expect(result).toEqual(todos);
      });
      expect(repository.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return todo from repository', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      repository.getById.mockReturnValue(of(todo));

      useCase.getById(1).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(repository.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create todo using repository', () => {
      const dto: TodoCreateDto = { title: 'Test Todo' };
      const todo: Todo = {
        id: 1,
        ...dto,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      repository.create.mockReturnValue(of(todo));

      useCase.create(dto).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update todo using repository', () => {
      const dto: TodoUpdateDto = { title: 'Updated Todo' };
      const todo: Todo = {
        id: 1,
        title: 'Updated Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      repository.update.mockReturnValue(of(todo));

      useCase.update(1, dto).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(repository.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('delete', () => {
    it('should delete todo using repository', () => {
      repository.delete.mockReturnValue(of(void 0));

      useCase.delete(1).subscribe(result => {
        expect(result).toBeUndefined();
      });
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('toggle', () => {
    it('should toggle todo using repository', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      repository.toggle.mockReturnValue(of(todo));

      useCase.toggle(1).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(repository.toggle).toHaveBeenCalledWith(1);
    });
  });

  describe('clearCompleted', () => {
    it('should clear completed todos using repository', () => {
      repository.clearCompleted.mockReturnValue(of(void 0));

      useCase.clearCompleted().subscribe(result => {
        expect(result).toBeUndefined();
      });
      expect(repository.clearCompleted).toHaveBeenCalled();
    });
  });
}); 