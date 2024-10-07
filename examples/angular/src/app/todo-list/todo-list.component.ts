import { Component, Input, OnChanges } from '@angular/core';
import { Todo, TodosService } from '../todos.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnChanges {
  @Input() todos: Todo[] = [];
  activeTodos: Todo[] = [];

  constructor(private todosService: TodosService) {}

  async ngOnChanges(): Promise<void> {
    this.activeTodos = this.todos.filter((todo) => !todo.completed);
  }

  async removeTodo(todo: Todo): Promise<void> {
    await this.todosService.removeItem(todo);
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }

  async toggleAll(e: Event) {
    const input = e.target as HTMLInputElement;
    await this.todosService.toggleAll(input.checked);
    this.todos = this.todos.map((todo) => ({
      ...todo,
      completed: input.checked,
    }));
  }
}
