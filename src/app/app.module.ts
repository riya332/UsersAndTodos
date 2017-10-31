import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/user.component';
import { UserService } from '../users/user.service';
import { TodoComponent } from '../todos/todo.component';
import { TodoService } from '../todos/todo.service';
import { FormsModule } from '@angular/forms';
const appRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'todos/:id',
    component: TodoComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ClarityModule.forRoot(),
    RouterModule.forRoot(
      appRoutes),
    FormsModule
  ],
  providers: [UserService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }


