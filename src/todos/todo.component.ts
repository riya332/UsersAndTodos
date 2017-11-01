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
  // List of all todos
  public todos: any;
  public userId: number;
  public newTodo = new Todo();
  constructor(private activatedRoute: ActivatedRoute, private _todoService: TodoService) {}
    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
           this.userId = params['id'];
        });
        this._todoService.getTodo(this.userId).subscribe(res => {
          this.todos = res;
        },
          err => {
          });
    }
    /**
     *
     * @param todo : The todo whose status has to be toggled
     */
    public toggleTodo(todo: Todo) {
      this._todoService.saveTodoStatus(todo).subscribe(res => {});
    }
    // public saveTodo(todo) {
    //   this._todoService.saveNewTodo(todo).subscribe(res => {this.todos = res; });
    // }
    /**
     * Adds a new todo and makes a service call to persist the todo
     */
    public saveTodo() {
      if (this.newTodo.title.length === 0) {
        return;
      }
      this.newTodo.userId = this.userId;
      this._todoService.saveNewTodo(this.newTodo).subscribe(res => {
        this.todos.push(res);
        this.newTodo = new Todo();
      });
    }
    /**
     *
     * @param index : Index at which todo is removed
     * @param id : Id of the todo to be removed
     */
    public removeTodo(index: number, id: number) {
      this._todoService.removeTodos(id).subscribe(res => {
        this.todos.splice(index, 1);
      });
    }
}
