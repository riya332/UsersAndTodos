import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserDetail } from './user.model';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    /**
     * extract json from response
     * @param res Response of the api call
     */
    public extractData(res: Response) {
        return res.json() || [];
    }
    /**
     * Fetch list of users
     */
    public getData(): Observable<UserDetail[]> {
        return this.http.get('https://jsonplaceholder.typicode.com/users').map(this.extractData);
    }
}
