import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Todo, TodosService } from '../todos.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  private location = inject(Location);
  private todosService = inject(TodosService);

  currentFilter: string = '';

  todos: Todo[] = [];
  activeTodos: Todo[] = [];
  completedTodos: Todo[] = [];

  constructor(private activatedRouter: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.currentFilter = params['filter'] || 'all';
    });

    this.todos = await this.todosService.getItems();
    this.activeTodos = await this.todosService.getItems('active');
    this.completedTodos = await this.todosService.getItems('completed');
  }

  get filter(): string {
    return this.location.path().split('/')[1] || 'all';
  }

  clearCompleted() {
    this.todosService.clearCompleted();
  }

  isActive(filter: string): boolean {
    return this.currentFilter === filter;
  }
}
