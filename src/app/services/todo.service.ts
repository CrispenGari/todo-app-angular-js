import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://jsonplaceholder.cypress.io/todos';
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl + '?_limit=5');
  }
  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }
}
