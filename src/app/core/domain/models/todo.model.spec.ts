import { Todo, TodoCreateDto, TodoUpdateDto } from './todo.model';

describe('Todo Model', () => {
  describe('Todo Interface', () => {
    it('should have required properties', () => {
      const todo: Todo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(todo.id).toBeDefined();
      expect(todo.title).toBeDefined();
      expect(todo.completed).toBeDefined();
      expect(todo.createdAt).toBeDefined();
      expect(todo.updatedAt).toBeDefined();
    });
  });

  describe('TodoCreateDto Interface', () => {
    it('should have required properties', () => {
      const dto: TodoCreateDto = {
        title: 'Test Todo',
        completed: false
      };

      expect(dto.title).toBeDefined();
      expect(dto.completed).toBeDefined();
    });
  });

  describe('TodoUpdateDto Interface', () => {
    it('should have optional properties', () => {
      const dto: TodoUpdateDto = {
        title: 'Updated Todo',
        completed: true
      };

      expect(dto.title).toBeDefined();
      expect(dto.completed).toBeDefined();
    });
  });
}); 