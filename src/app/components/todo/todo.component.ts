import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Output() addTodo = new EventEmitter<any>();
  todos: Todo[] = [];
  title: string = '';
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
  deleteTodo(todo: Todo) {
    // Remove from the UI list
    this.todos = this.todos.filter((todoItem) => todoItem.id !== todo.id);
    // delete from the server
    this.todoService.deleteTodo(todo).subscribe();
  }
  addTodoHandler() {
    const todo = {
      title: this.title,
      completed: false,
    };
    this.todoService.addTodo(todo).subscribe((todo) => {
      this.todos.push(todo);
    });
  }
}
