import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginModel } from '../../core/models/login.model';

const urlApi: string = 'http://localhost:4000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpClient = inject(HttpClient);

  login(login: LoginModel) {
    return this.httpClient.post(`${urlApi}/login`, login);
  }
}
