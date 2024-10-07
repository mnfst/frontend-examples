import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../todos.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-todo-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private todosService = inject(TodosService);

  title = '';

  constructor(private router: Router) {}

  async addTodo() {
    if (this.title) {
      await this.todosService.addItem(this.title);

      // Force reload
      this.router.navigate(['/'], { queryParams: { updatedAt: Date.now() } });

      // Reset title to clear input field.
      this.title = '';
    }
  }
}
