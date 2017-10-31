import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
    public todos: any;
    constructor(private http: Http) { }
    private extractData(res: Response) {
        return res.json() || [];
    }

    public getTodo(userId: number): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/todos?userId=' + userId)
            .map(this.extractData);
    }
    public saveTodos(todos: any, userId: number): Observable<any> {
        return this.http.post('https://jsonplaceholder.typicode.com/todos/userId=' + userId, todos, {})
            .map(this.extractData);
    }
}
