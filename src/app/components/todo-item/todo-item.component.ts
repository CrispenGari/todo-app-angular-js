import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}
  setClasses() {
    return {
      todo: true,
      todo__completed: this.todo.completed,
    };
  }
  handleCheckboxChange(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe((todo) => {
      console.log(todo);
    });
  }
  handleButtonClick(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
