import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Todo } from './todo';
@Injectable()
export class TodoService {
    public todos: any;
    public storeTodos = {};
    constructor(private http: Http) { }
    public extractData(res: Response) {
        return res.json() || [];
    }

    public getTodo(userId: number): Observable<any> {
        const subject = new ReplaySubject();
        if (this.storeTodos[userId]) {
            subject.next(this.storeTodos[userId]);
        } else {
            this.http.get('https://jsonplaceholder.typicode.com/todos?userId=' + userId)
                .map(this.extractData).subscribe(res => {
                    this.storeTodos[userId] = res;
                    subject.next(this.storeTodos[userId]);
                });
        }
        return subject;
    }
    public saveNewTodo(todo: Todo) {
        return this.http.post('https://jsonplaceholder.typicode.com/todos/', todo, {})
            .map(this.extractData);
    }
    public removeTodos(todoId: number): Observable<any> {
        return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + todoId).map(this.extractData);
    }
    public saveTodoStatus(todo: Todo) {
        return this.http.put('https://jsonplaceholder.typicode.com/todos/' + todo.id, todo, {});
    }
}
