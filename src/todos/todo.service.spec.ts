import { TestBed, inject } from '@angular/core/testing';
import {
    Http,
    Response,
    ResponseOptions,
    HttpModule
} from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs/';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable } from '@angular/core';

import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { Todo } from './todo';

let todoService: TodoService;
let http;
describe('TodoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                FormsModule, ClarityModule, HttpModule,
                RouterTestingModule
            ],
            providers: [
            ]
        });
    });
    beforeEach(inject([Http], (_http) => {
        http = _http;
        todoService = new TodoService(http);
    }));

    it('should be defined', () => {
        expect(todoService).toBeDefined();
    });
    it('should convert Response to json', () => {
        let response = new Response(new ResponseOptions({
            body: {
                statusText: 'test'
            },
            status: 200,
            headers: null,
            statusText: 'test',
            url: null
        }));
        let result = todoService.extractData(response);
        expect(result).toEqual({
            statusText: 'test'
        });
    });

    it('should call http post function with params', inject([Http], (httpServ: Http) => {
        spyOn(httpServ, 'post').and.callFake((res) => {
            return new Subject();
        });
        let todo = new Todo({
            title: 'hello',
            completed: true
        });
        todoService.saveNewTodo(todo);
        expect(httpServ.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/', todo, {});
    }));
    it('removeTodos: should call http delete function with params', inject([Http], (httpServ: Http) => {
        spyOn(httpServ, 'delete').and.callFake((res) => {
            return new Subject();
        });
        todoService.removeTodos(2);
        expect(httpServ.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/2');
    }));
    it('should call http post function with params', inject([Http], (httpServ: Http) => {
        spyOn(httpServ, 'put').and.callFake((res) => {
            return new Subject();
        });
        let todo = new Todo({
            title: 'hello',
            completed: false,
            userId: 2,
            id: 4
        });
        todoService.saveTodoStatus(todo);
        expect(httpServ.put).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/4', todo, {});
    }));
    it('getTodo: should return todo from cache if it is present', () => {
        let todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2}];
        todoService.storeTodos[1] = todos;
        let response = [];
        todoService.getTodo(1).subscribe(res => {
            response = res;
        });
        expect(response).toBe(todos);
    });
    it('getTodo: should call http get function if todo is not present in cache', () => {
        let todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2}];
        let subject = new ReplaySubject();
        spyOn(http, 'get').and.callFake((res) => {
            const response1 = new Response(new ResponseOptions({
                body:  todos,
                status: 200,
                headers: null,
                statusText: 'test',
                url: null
            }));
            subject.next(response1);
            return subject;
        });
        let response = [];
        todoService.getTodo(2).subscribe(res => {
            response = res;
        });
        expect(response).toEqual(todos);
    });
});
