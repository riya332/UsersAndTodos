import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/user.component';
import { UserService } from '../users/user.service';
import { TodoComponent } from '../todos/todo.component';
import { TodoService } from '../todos/todo.service';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UsersComponent,
        TodoComponent
      ],
      imports: [HttpModule, BrowserModule,
        HttpModule, FormsModule, RouterTestingModule,
          ClarityModule.forRoot()],
      providers: [UserService, TodoService],

    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
