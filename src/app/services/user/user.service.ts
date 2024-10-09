import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRespUser, IUser } from '../../core/interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { UserModel } from '../../core/models/user.models';

const urlApi: string = 'http://localhost:4000/api/v1';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<IRespUser> {
    return this.httpClient
      .get<IRespUser>(`${urlApi}/users`)
      .pipe(map((resp: IRespUser) => resp));
  }

  getUserById(id: string) {
    return this.httpClient.get<IRespUser>(`${urlApi}/users/${id}`);
  }

  createUser(user: IUser) {
    return this.httpClient.post<IRespUser>(`${urlApi}/users`, user);
  }

  userUpdate(user: UserModel) {
    return this.httpClient.put<IRespUser>(
      `${urlApi}/users/update/${user._id}`,
      user
    );
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`${urlApi}/users/delete/${id}`);
  }
}
