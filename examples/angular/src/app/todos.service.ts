import { Injectable } from '@angular/core';
import Manifest from '@mnfst/sdk';
import { Paginator } from '@mnfst/sdk/dist/core/types/src';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  manifest: Manifest = new Manifest();

  async getItems(type = 'all'): Promise<Todo[]> {
    const query = this.manifest.from('todos');

    if (type === 'active') {
      query.where('completed = false');
    } else if (type === 'completed') {
      query.where('completed = true');
    }

    return query
      .find<Todo>()
      .then((paginator: Paginator<Todo>) => paginator.data);
  }

  addItem(title: string): Promise<Todo> {
    return this.manifest.from('todos').create({ title, completed: false });
  }

  removeItem(todo: Todo): Promise<number> {
    return this.manifest.from('todos').delete(todo.id);
  }

  updateItem(todo: Todo): Promise<Todo> {
    return this.manifest.from('todos').update(todo.id, todo);
  }

  async clearCompleted(): Promise<number[]> {
    const completedTodos: Todo[] = await this.getItems('completed');

    return Promise.all(completedTodos.map((todo) => this.removeItem(todo)));
  }

  async toggleAll(completed: boolean): Promise<void> {
    const allTodos: Todo[] = await this.getItems();

    await Promise.all(
      allTodos
        .filter((todo) => todo.completed !== completed)
        .map((todo) => this.updateItem({ ...todo, completed }))
    );
  }
}
