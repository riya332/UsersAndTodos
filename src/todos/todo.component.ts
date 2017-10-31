import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from './todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.html',
  styleUrls: ['./todos.css']
})
export class TodoComponent implements OnInit {
  title = 'app';
  public todos: any;
  public totalTodos = 0;
  public userId: number;
  public newTodo = new Todo();
  constructor(private activatedRoute: ActivatedRoute, private _todoService: TodoService) {}
    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
           this.userId = params['id'];
          console.log(this.userId);
        });
        this._todoService.getTodo(this.userId).subscribe(res => {
          this.todos = res;
          this.totalTodos = this.todos.length;
        },
          err => {
          });
    }
    public saveTodos() {
      this._todoService.saveTodos(this.todos, this.userId).subscribe(res => {this.todos = res; });
    }
    public addTodo() {
      if (this.newTodo.title.length === 0) {
        return;
      }
      this.newTodo.id = this.todos[this.totalTodos - 1].id + 1;
      this.newTodo.userId = this.userId;
      this.todos.push(this.newTodo);
      this.totalTodos ++;
      this.newTodo = new Todo();
    }
    public removeTodo(index: number) {
      this.todos.splice(index, 1);
      this.totalTodos --;
    }
}
