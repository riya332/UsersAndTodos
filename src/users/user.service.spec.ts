import { TestBed, inject } from '@angular/core/testing';
import {
    Http,
    Response,
    ResponseOptions,
    HttpModule
} from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { UserService } from './user.service';
import { UserDetail } from './user.model';


let userService: UserService;
let http;
describe('UserService', () => {
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
        userService = new UserService(http);
    }));

    it('should be defined', () => {
        expect(userService).toBeDefined();
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
        let result = userService.extractData(response);
        expect(result).toEqual({
            statusText: 'test'
        });
    });

    it('should call getData function with params', inject([Http], (httpServ: Http) => {
        const templateurl = 'https://jsonplaceholder.typicode.com/users';
        spyOn(httpServ, 'get').and.callFake((res) => {
            return new Subject();
        });
        userService.getData();
        expect(httpServ.get).toHaveBeenCalled();
    }));
});
