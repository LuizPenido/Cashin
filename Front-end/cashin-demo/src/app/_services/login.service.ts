import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_interfaces/user';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || ''
    })
};

@Injectable({ providedIn: 'root' })
export class LoginService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private _userAccess: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {

        console.log('Metodo login chamado');
        console.log("-login " + username);
        console.log("-senha " + "*".repeat(password.length));

        return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(user => {
                // store jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', user.token);
                //localStorage.setItem('current_user', JSON.stringify(user.name));
                this.userSubject.next(user);

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('access');
    }

    get logged(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    getUserAccess() {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', localStorage.getItem('token') || '');

        return this.http.get(`${environment.apiUrl}/nivel-de-acesso-usuario`, httpOptions);
    }

    get userAccess() {
        return localStorage.getItem('access');
    }
}