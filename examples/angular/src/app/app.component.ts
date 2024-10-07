import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TodoListComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      this.todos = await this.todosService.getItems(params['filter']);
    });
  }
}
