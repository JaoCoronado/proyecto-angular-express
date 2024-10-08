import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  httpClient = inject(HttpClient);

  getStores() {
    return this.httpClient.get('http://localhost:4000/api/v1/store');
  }
}
