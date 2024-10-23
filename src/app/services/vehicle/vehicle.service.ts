import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRespVehicle, IVehicle } from '../../core/interfaces/vehicle.interface';
import { map, Observable } from 'rxjs';
import { VehicleModel } from '../../core/models/vehicle.model';
import { environment } from '../../../environments/environment.development';
// import { UserModel } from '../../core/models/user.models';

// const urlApi: string = 'http://localhost:4000/api/v1';
const urlApi: string = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  getVehicles(): Observable<IRespVehicle> {
    return this.httpClient
      .get<IRespVehicle>(`${urlApi}/vehicles`)
      .pipe(map((resp: IRespVehicle) => resp));
  }

  getVehicleById(id: string) {
    return this.httpClient.get<IRespVehicle>(`${urlApi}/vehicles/${id}`);
  }

  createVehicle(vehicle: IVehicle) {
    return this.httpClient.post<IRespVehicle>(`${urlApi}/vehicles/create`, vehicle);
  }

  updateVehicleById(vehicle: VehicleModel) {
    return this.httpClient.put<IRespVehicle>(
      `${urlApi}/vehicles/update/${vehicle._id}`,
      vehicle
    );
  }

  deleteVehicleById(id: string) {
    return this.httpClient.delete(`${urlApi}/vehicles/delete/${id}`);
  }
}
