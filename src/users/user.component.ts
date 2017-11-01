import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserDetail } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.html'
})
export class UsersComponent implements OnInit {
  private posts: UserDetail[] = [];
  constructor(private _userService: UserService, private _router: Router) {}
  /**
   * Fetch the list of users
   */
  ngOnInit() {
    this._userService.getData()
    .subscribe(users => this.posts = users);
  }
  /**
   * redirects to the todos url
   * @param id : user id whose todo has to be shown
   */
  public redirect(id: number) {
    this._router.navigateByUrl('/todos/' + id);
  }
}
