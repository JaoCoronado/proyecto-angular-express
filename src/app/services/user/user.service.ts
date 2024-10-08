import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRespUser, IUser } from '../../core/interfaces/user.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  getUsers(): Observable<IRespUser>{
    return this.httpClient.get<IRespUser>('http://localhost:4000/api/v1/users').pipe(
      map((resp: IRespUser)=> resp));
  }
}
