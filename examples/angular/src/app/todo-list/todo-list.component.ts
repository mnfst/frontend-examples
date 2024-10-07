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
  @Input() filter: string = 'all';

  todos: Todo[] = [];
  activeTodos: Todo[] = [];

  constructor(private todosService: TodosService) {}

  async ngOnChanges(): Promise<void> {
    this.todos = await this.todosService.getItems(this.filter);
    this.activeTodos = await this.todosService.getItems('active');
  }

  async removeTodo(todo: Todo): Promise<void> {
    await this.todosService.removeItem(todo);
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }

  toggleAll(e: Event) {
    const input = e.target as HTMLInputElement;
    this.todosService.toggleAll(input.checked);
  }
}
