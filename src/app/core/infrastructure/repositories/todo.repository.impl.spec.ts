import { TestBed } from '@angular/core/testing';
import { TodoRepositoryImpl } from './todo.repository.impl';
import { Todo, TodoCreateDto, TodoUpdateDto } from '@core/domain/models/todo.model';
import { StorageService } from '@shared/infrastructure/services/storage.service';

describe('TodoRepositoryImpl', () => {
  let repository: TodoRepositoryImpl;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageService = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
    storageService.getItem.and.returnValue([]);
    storageService.setItem.and.returnValue(undefined);

    TestBed.configureTestingModule({
      providers: [
        TodoRepositoryImpl,
        { provide: StorageService, useValue: storageService }
      ]
    });

    repository = TestBed.inject(TodoRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return todos from storage', (done) => {
      const todos: Todo[] = [{
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }];
      storageService.getItem.and.returnValue(todos);

      repository.getAll().subscribe({
        next: (result) => {
          expect(result).toEqual(todos);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });

    it('should return empty array if storage is empty', (done) => {
      storageService.getItem.and.returnValue([]);

      repository.getAll().subscribe({
        next: (result) => {
          expect(result).toEqual([]);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });

  describe('getById', () => {
    it('should return todo by id', (done) => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      storageService.getItem.and.returnValue([todo]);

      repository.getById(1).subscribe({
        next: (result) => {
          expect(result).toEqual(todo);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.and.returnValue([]);
      expect(() => repository.getById(1)).toThrowError('Todo with id 1 not found');
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });

  describe('create', () => {
    it('should create new todo', (done) => {
      const dto: TodoCreateDto = { 
        title: 'Test Todo',
        completed: false
      };
      storageService.getItem.and.returnValue([]);

      repository.create(dto).subscribe({
        next: (result) => {
          expect(result.title).toBe('Test Todo');
          expect(result.completed).toBe(false);
          expect(result.id).toBeDefined();
          expect(result.createdAt).toBeInstanceOf(Date);
          expect(result.updatedAt).toBeInstanceOf(Date);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
      expect(storageService.setItem).toHaveBeenCalledWith('todos', jasmine.any(Array));
    });
  });

  describe('update', () => {
    it('should update todo', (done) => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const dto: TodoUpdateDto = { title: 'Updated Todo' };
      storageService.getItem.and.returnValue([todo]);

      repository.update(1, dto).subscribe({
        next: (result) => {
          expect(result.title).toBe('Updated Todo');
          expect(result.updatedAt).not.toBe(todo.updatedAt);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
      expect(storageService.setItem).toHaveBeenCalledWith('todos', jasmine.any(Array));
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.and.returnValue([]);
      const dto: TodoUpdateDto = { title: 'Updated Todo' };
      expect(() => repository.update(1, dto)).toThrowError('Todo with id 1 not found');
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });

  describe('delete', () => {
    it('should delete todo', (done) => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      storageService.getItem.and.returnValue([todo]);

      repository.delete(1).subscribe({
        next: () => {
          expect(storageService.setItem).toHaveBeenCalledWith('todos', []);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.and.returnValue([]);
      expect(() => repository.delete(1)).toThrowError('Todo with id 1 not found');
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });

  describe('toggle', () => {
    it('should toggle todo completed status', (done) => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      storageService.getItem.and.returnValue([todo]);

      repository.toggle(1).subscribe({
        next: (result) => {
          expect(result.completed).toBe(true);
          expect(result.updatedAt).not.toBe(todo.updatedAt);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
      expect(storageService.setItem).toHaveBeenCalledWith('todos', jasmine.any(Array));
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.and.returnValue([]);
      expect(() => repository.toggle(1)).toThrowError('Todo with id 1 not found');
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });

  describe('clearCompleted', () => {
    it('should clear completed todos', (done) => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'Active Todo',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: 'Completed Todo',
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      storageService.getItem.and.returnValue(todos);

      repository.clearCompleted().subscribe({
        next: () => {
          expect(storageService.setItem).toHaveBeenCalledWith('todos', [todos[0]]);
          done();
        },
        error: done.fail
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });
}); 