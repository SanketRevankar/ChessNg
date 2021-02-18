import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
declare var gapi: any;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private loginUrl = '/api/login';
  private usersUrl = '/api/user';
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private auth2: any;

  constructor(private router: Router, private http: HttpClient) {
    // @ts-ignore
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init()
    })
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getToken(): string | null {
    return localStorage.getItem('auth');
  }

  login(id_token: string, redirectTo: string) {
    return this.http.post<any>(this.loginUrl, {id_token: id_token}).subscribe(data => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('auth', data['token'])
      this.userSubject.next(data);
      window.location.href = redirectTo;
    })
  }

  updateUser(user: User) {
    return this.http.put<any>(this.usersUrl, { user: user }).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data));
      this.userSubject.next(data);
      window.location.reload();
    })
  }

  deleteUser() {
    return this.http.delete<any>(this.usersUrl).subscribe(data => {
      this.logout();
    })
  }

  logout() {
    this.auth2.signOut()
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    window.location.reload();
  }

}