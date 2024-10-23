import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IRespWorkOrder,
  IWorkOrder,
} from '../../core/interfaces/workOrder.interface';
import { WorkOrderModel } from '../../core/models/workOrder.model';
import { environment } from '../../../environments/environment.development';

// const urlApi: string = 'http://localhost:4000/api/v1';
const urlApi: string = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})

export class WorkorderService {
  constructor(private httpClient: HttpClient) {}

  createWorkOrder(workOrder: IWorkOrder) {
    return this.httpClient.post<IRespWorkOrder>(
      `${urlApi}/workOrder/create`,
      workOrder
    );
  }

  getWorkOrders(): Observable<IRespWorkOrder> {
    return this.httpClient
      .get<IRespWorkOrder>(`${urlApi}/workOrder`)
      .pipe(map((resp: IRespWorkOrder) => resp));
  }

  getWorkOrderById(id: string){
    return this.httpClient
      .get<IRespWorkOrder>(`${urlApi}/workOrder/${id}`)
  }

  updateWorkOrderById(workOrder: WorkOrderModel){
    return this.httpClient.put<IRespWorkOrder>(`${urlApi}/workOrder/update/${workOrder._id}`,workOrder)
  }

  deleteWorkOrderById(id: string) {
    return this.httpClient.delete(`${urlApi}/workOrder/delete/${id}`);
  }
}
