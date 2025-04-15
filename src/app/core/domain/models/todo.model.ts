export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoCreateDto extends Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> {}
export interface TodoUpdateDto extends Partial<TodoCreateDto> {}
