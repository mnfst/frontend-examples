interface Todo {
  completed: boolean;
  title: string;
  id: number;
}

interface TodoItem {
  todo: Todo;
}

interface TodosList {
  todos: Todo[];
}