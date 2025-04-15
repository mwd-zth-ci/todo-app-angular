import { TestBed } from '@angular/core/testing';
import { TodoRepositoryImpl } from './todo.repository.impl';
import { StorageService } from '../../../shared/infrastructure/services/storage.service';
import { Todo, TodoCreateDto, TodoUpdateDto } from '../../domain/models/todo.model';

describe('TodoRepositoryImpl', () => {
  let repository: TodoRepositoryImpl;
  let storageService: jest.Mocked<StorageService>;

  beforeEach(() => {
    storageService = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };

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
    it('should return todos from storage', () => {
      const todos: Todo[] = [{
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }];
      storageService.getItem.mockReturnValue(todos);

      repository.getAll().subscribe(result => {
        expect(result).toEqual(todos);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });

    it('should return empty array if storage is empty', () => {
      storageService.getItem.mockReturnValue(null);

      repository.getAll().subscribe(result => {
        expect(result).toEqual([]);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });

  describe('getById', () => {
    it('should return todo by id', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      storageService.getItem.mockReturnValue([todo]);

      repository.getById(1).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.mockReturnValue([]);

      expect(() => {
        repository.getById(1).subscribe();
      }).toThrow('Todo with id 1 not found');
    });
  });

  describe('create', () => {
    it('should create new todo', () => {
      const dto: TodoCreateDto = { title: 'Test Todo' };
      storageService.getItem.mockReturnValue([]);

      repository.create(dto).subscribe(result => {
        expect(result.id).toBe(1);
        expect(result.title).toBe(dto.title);
        expect(result.completed).toBe(false);
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
      expect(storageService.setItem).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update todo', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const dto: TodoUpdateDto = { title: 'Updated Todo' };
      storageService.getItem.mockReturnValue([todo]);

      repository.update(1, dto).subscribe(result => {
        expect(result.title).toBe(dto.title);
        expect(result.updatedAt).not.toBe(todo.updatedAt);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
      expect(storageService.setItem).toHaveBeenCalled();
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.mockReturnValue([]);
      const dto: TodoUpdateDto = { title: 'Updated Todo' };

      expect(() => {
        repository.update(1, dto).subscribe();
      }).toThrow('Todo with id 1 not found');
    });
  });

  describe('delete', () => {
    it('should delete todo', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      storageService.getItem.mockReturnValue([todo]);

      repository.delete(1).subscribe(() => {
        expect(storageService.setItem).toHaveBeenCalledWith('todos', []);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.mockReturnValue([]);

      expect(() => {
        repository.delete(1).subscribe();
      }).toThrow('Todo with id 1 not found');
    });
  });

  describe('toggle', () => {
    it('should toggle todo completed status', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      storageService.getItem.mockReturnValue([todo]);

      repository.toggle(1).subscribe(result => {
        expect(result.completed).toBe(true);
        expect(result.updatedAt).not.toBe(todo.updatedAt);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
      expect(storageService.setItem).toHaveBeenCalled();
    });

    it('should throw error if todo not found', () => {
      storageService.getItem.mockReturnValue([]);

      expect(() => {
        repository.toggle(1).subscribe();
      }).toThrow('Todo with id 1 not found');
    });
  });

  describe('clearCompleted', () => {
    it('should clear completed todos', () => {
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
      storageService.getItem.mockReturnValue(todos);

      repository.clearCompleted().subscribe(() => {
        expect(storageService.setItem).toHaveBeenCalledWith('todos', [todos[0]]);
      });
      expect(storageService.getItem).toHaveBeenCalledWith('todos');
    });
  });
}); 