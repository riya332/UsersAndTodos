import {
    TestBed,
    async, inject
} from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { APP_BASE_HREF } from '@angular/common';

import { UsersComponent } from './user.component';
import { UserService } from './user.service';
import { ClarityModule } from 'clarity-angular';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentFixture } from '@angular/core/testing';
import { UserDetail } from './user.model';

let fixture: ComponentFixture<UsersComponent>;

let compInstance: UsersComponent;
describe('Component: TodoApp', () => {
    const appRoutes: Routes = [
        {
          path: '',
          component: UsersComponent
        }
      ];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersComponent
            ],
            imports: [FormsModule, ClarityModule, HttpModule, RouterModule.forRoot(
                appRoutes)],
            providers: [UserService, { provide: APP_BASE_HREF, useValue: '/' }],

        }).compileComponents();
        fixture = TestBed.createComponent(UsersComponent);
        compInstance = fixture.componentInstance;
    }));

    it('should create an instance', () => {
        expect(compInstance).toBeTruthy();
    });
    it('test redirect function', inject([UserService, Router], (userService: UserService, route: Router) => {
        spyOn(route, 'navigateByUrl').and.callFake((res) => {
            return new Subject();
        });
        compInstance.redirect(2);
        expect(route.navigateByUrl).toHaveBeenCalledWith('/todos/2');
    }));
    it('get users details on ngOninit', inject([UserService, Router], (userService: UserService, route: Router) => {
        spyOn(userService, 'getData').and.callFake((res) => {
            let subject = new Subject();
            subject.next([]);
            return new Subject();
        });
        compInstance.ngOnInit();
        expect(userService.getData).toHaveBeenCalled();
    }));
});
