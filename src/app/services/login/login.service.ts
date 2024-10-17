import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginModel } from '../../core/models/login.model';
import { tap, Observable, map, catchError, of } from 'rxjs';
import { UserModel } from '../../core/models/user.models';
import { Router } from '@angular/router';

const urlApi: string = 'http://localhost:4000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  user: UserModel;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validateToken(): Observable<boolean> {
    return this.httpClient
      .get(`${urlApi}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            _id,
            documentNumber,
            name,
            email,
            password,
            role,
            createdAt,
          } = resp.user;

          this.user = new UserModel(
            _id,
            documentNumber,
            name,
            createdAt,
            email,
            role,
            password,
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => {
          console.error(error);
          return of(false)
        })
      );
  }

  login(login: LoginModel) {
    return this.httpClient.post(`${urlApi}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        // localStorage.setItem('name', resp.user.name)
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');}

}
