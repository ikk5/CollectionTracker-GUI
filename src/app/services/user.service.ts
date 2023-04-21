import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'users';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<string[]> {
        return this.http.get<string[]>(baseUrl);

    }
}
