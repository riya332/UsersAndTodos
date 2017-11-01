
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
import { Subject } from 'rxjs/Subject';
let fixture: ComponentFixture<TodoComponent>;
// tslint:disable-next-line:prefer-const
let compInstance: TodoComponent, routeStub: any;
describe('Component: TodoApp', () => {
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
            providers: [TodoService, { provide: ActivatedRoute, useValue: routeStub }],

        }).compileComponents();
        fixture = TestBed.createComponent(TodoComponent);
        compInstance = fixture.componentInstance;
    }));
    it('should create an instance', inject([TodoService, ActivatedRoute], (todoService: TodoService, route: ActivatedRoute) => {
        const component = new TodoComponent(route, todoService);
        expect(component).toBeTruthy();
        expect(component).toBeTruthy();
    }));
    it('should test removeTodos function', inject([ActivatedRoute, TodoService],
        (_activatedRoute: ActivatedRoute, _todoService: TodoService) => {
        spyOn(_todoService, 'removeTodos').and.callFake((res) => {
            return new Subject();
        });
        compInstance.todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2} ];
        compInstance.removeTodo(1, 2);
        expect(_todoService.removeTodos).toHaveBeenCalled();
    }));
    it('saveTodo', inject([ActivatedRoute, TodoService],
        (_activatedRoute: ActivatedRoute, _todoService: TodoService) => {
            spyOn(_todoService, 'saveNewTodo').and.callFake((res) => {
                return new Subject();
            });
            compInstance.userId = 2;
            compInstance.newTodo = new Todo({id: 1, title: 'Buy Things', userId: 2});
            compInstance.todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2} ];
            compInstance.saveTodo();
            expect(_todoService.saveNewTodo).toHaveBeenCalled();
        }));
        it('saveTodo: should return if title of new todo is empty', inject([ActivatedRoute, TodoService],
            (_activatedRoute: ActivatedRoute, _todoService: TodoService) => {
                spyOn(_todoService, 'saveNewTodo').and.callFake((res) => {
                    return new Subject();
                });
                compInstance.userId = 2;
                compInstance.newTodo = new Todo();
                compInstance.todos = [{id: 1, title: 'Take Grocery', userId: 2}, {id: 2, title: 'Clean House', userId: 2} ];
                compInstance.saveTodo();
                expect(_todoService.saveNewTodo).toHaveBeenCalledTimes(0);
            }));
            it('saveTodo: should return if title of new todo is empty', inject([ActivatedRoute, TodoService],
                (_activatedRoute: ActivatedRoute, _todoService: TodoService) => {
                    spyOn(_todoService, 'saveTodoStatus').and.callFake((res) => {
                        return new Subject();
                    });
                    let todo = new Todo({id: 1, title: 'Take Grocery', userId: 2});
                    compInstance.toggleTodo(todo);
                    expect(_todoService.saveTodoStatus).toHaveBeenCalled();
                }));

});
