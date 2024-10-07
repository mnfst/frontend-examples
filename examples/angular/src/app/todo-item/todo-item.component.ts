import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements AfterViewChecked {
  @Input({ required: true }) todo!: Todo;

  @Output() remove = new EventEmitter<Todo>();

  @ViewChild('todoInputRef') inputRef?: ElementRef;

  title = '';

  isEditing = false;

  constructor(private todosService: TodosService) {}

  async toggleTodo(): Promise<void> {
    this.todo.completed = !this.todo.completed;
    await this.todosService.updateItem(this.todo);
  }

  removeTodo(): void {
    this.remove.emit(this.todo);
  }

  startEdit() {
    this.isEditing = true;
  }

  handleBlur(e: Event) {
    this.isEditing = false;
  }

  handleFocus(e: Event) {
    this.title = this.todo.title;
  }

  async updateTodo() {
    console.log('updateTodo', this.todo, this.title);

    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      await this.todosService.updateItem({ ...this.todo, title: this.title });
      this.todo.title = this.title;
    }

    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }
}
