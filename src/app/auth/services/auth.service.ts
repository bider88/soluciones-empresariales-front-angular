import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/models/auth.model';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ulrApi = environment.urlAPi;
  currentUser?: UserModel;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: AuthModel): Observable<any> {
    const urlApi = `${this.ulrApi}auth/login`;
    return this.http.post(urlApi, credentials);
  }

  loginToken = (user: UserModel, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ user }));
    this.currentUser = user;
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('login');
  }
}
