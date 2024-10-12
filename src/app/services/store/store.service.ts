import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRespStore, IStore } from '../../core/interfaces/store.interface';
import { map, Observable } from 'rxjs';
import { StoreModel } from '../../core/models/store.model';

const urlApi: string = 'http://localhost:4000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}
  getstore(): Observable<IRespStore> {
    return this.httpClient
      .get<IRespStore>(`${urlApi}/store`)
      .pipe(map((resp: IRespStore) => resp));
  }

  getStoreById(id: string) {
    return this.httpClient.get<IRespStore>(`${urlApi}/store/${id}`);
  }

  createStore(store: IStore) {
    return this.httpClient.post<IRespStore>(`${urlApi}/store/create`, store);
  }

  storeUpdate(store: StoreModel) {
    return this.httpClient.put<IRespStore>(
      `${urlApi}/store/update/${store._id}`,
      store
    );
  }

  deleteStore(id: string) {
    return this.httpClient.delete(`${urlApi}/store/delete/${id}`);
  }
}
