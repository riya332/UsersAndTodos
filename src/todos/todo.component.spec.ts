
import { By } from '@angular/platform-browser';

import {
    TestBed,
    async, inject
} from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';

import { ClarityModule } from 'clarity-angular';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentFixture } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Todo } from './todo';
let fixture: ComponentFixture<TodoComponent>;
let compInstance: TodoComponent, todoServiceStub: any;
describe('Component: TodoApp', () => {
    let routeStub: any;
    // tslint:disable-next-line:prefer-const
    let subject = new ReplaySubject, saveTodos: any;
    saveTodos = jasmine.createSpy('todoServiceStub_saveTodos');
    saveTodos.and.callFake(() => {
        // tslint:disable-next-line:prefer-const
        let mockObj: any;
        subject.next(mockObj);
        return subject;
    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoComponent
            ],
            imports: [RouterModule, FormsModule, ClarityModule, HttpModule],
            providers: [TodoService, { provide: ActivatedRoute, useValue: routeStub },
                { provide: TodoService, useValue: todoServiceStub }],

        }).compileComponents();
        fixture = TestBed.createComponent(TodoComponent);
        compInstance = fixture.componentInstance;
    }));
    it('should create an instance', inject([TodoService, ActivatedRoute], (todoService: TodoService, route: ActivatedRoute) => {
        const component = new TodoComponent(route, todoService);
        expect(component).toBeTruthy();
        expect(component).toBeTruthy();
    }));
    it('should test removeTodos function', () => {
        compInstance.todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2} ];
        expect(compInstance.todos.length).toBe(2);
        compInstance.removeTodo(1);
        expect(compInstance.todos.length).toBe(1);
    });
    it('saveTodos', inject([ActivatedRoute, TodoService],
        (_activatedRoute: ActivatedRoute, _todoService: TodoService) => {
            spyOn(_todoService, 'saveTodos');
            compInstance.userId = 2;
            compInstance.todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2} ];
            compInstance.saveTodos();
            expect(_todoService.saveTodos).toHaveBeenCalled();
        }));
    it('addTodo: should add a new todo into existing and reset newTodo', () => {
        compInstance.todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2} ];
        compInstance.totalTodos = 2;
        compInstance.newTodo = new Todo({title: 'Write Code'});
        compInstance.addTodo();
        expect(compInstance.totalTodos).toBe(3);
        expect(compInstance.newTodo.title).toBe('');
    });

});
