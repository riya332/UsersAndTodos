import { Component } from '@angular/core';
import { UserService } from './user.service';
import { UserDetail } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.html'
})
export class UsersComponent {
  title = 'app';
  private posts: UserDetail[] = [];
  private todos: any = [];
  private errorMessage: any = '';
  constructor(private _userService: UserService, private _router: Router) {
    this.getUsers();
  }
  public getUsers() {
    this._userService.getData()
      .then(
      users => this.posts = users
      );
  }
  public redirect(id: number) {
    this._router.navigateByUrl('/todos/' + id);
  }
}
