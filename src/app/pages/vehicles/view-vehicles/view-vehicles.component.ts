import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { VehicleModel } from '../../../core/models/vehicle.model';
import { Subscription } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { Router } from '@angular/router';
import { IRespVehicle } from '../../../core/interfaces/vehicle.interface';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../core/models/user.models';
import { IRespUser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-view-vehicles',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './view-vehicles.component.html',
  styleUrl: './view-vehicles.component.scss',
})
export class ViewVehiclesComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: any = '';
  vehicles: VehicleModel[] = [];
  vehiclesSubscription: Subscription;
  private _liveAnnouncer = inject(LiveAnnouncer);
  private vehicleService = inject(VehicleService);
  usersInfo: UserModel[] = [];
  userService = inject(UserService);

  private router = inject(Router);

  displayedColumns: string[] = [
    '_id',
    'userName',
    'make',
    'model',
    'year',
    'licensePlate',
    'action',
  ];
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.cargarUser();
    this.loadVehicle();
  }

  ngOnDestroy(): void {
    this.vehiclesSubscription.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadVehicle() {
    // this.vehiclesSubscription = this.vehicleService
    //   .getVehicles()
    //   .subscribe((data: IRespVehicle) => {
    //     this.vehicles = data.vehicles;
    //     this.dataSource = new MatTableDataSource(this.vehicles);
    //   });
    // Cargar vehículos
    this.vehiclesSubscription = this.vehicleService
      .getVehicles()
      .subscribe((data: IRespVehicle) => {
        this.vehicles = data.vehicles;

        // Cargar usuarios
        this.userService.getUsers().subscribe((userData: IRespUser) => {
          this.usersInfo = userData.users;

          // Unir vehículos con los usuarios
          this.vehicles = this.vehicles.map((vehicle) => {
            const user = this.usersInfo.find((u) => u._id === vehicle.userId);
            return {
              ...vehicle,
              userName: user ? user.name : 'Usuario no encontrado', // Agregar nombre de usuario al vehículo
            };
          });

          this.dataSource = new MatTableDataSource(this.vehicles);
        });
      });
  }

  cargarUser() {
    this.userService.getUsers().subscribe((resp: any) => {
      console.log(resp);
      this.usersInfo = resp.users;
    });
  }

  infoVehicle(element: VehicleModel) {
    const createdAtFormatted = element.createdAt
      ? new Date(element.createdAt).toLocaleString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Fecha no disponible';
    const tableContent = `
        <table class="table table-hover table-striped">
        <tbody>
      <tr>
          <th scope="row" class="text-start text-primary fs-6">Marca</th>
          <td class="fs-6"" class="fs-6">${element.make || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Modelo</th>
          <td class="fs-6"">${element.model || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Año</th>
          <td class="fs-6"">${element.year || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Placa</th>
          <td class="fs-6"">${element.licensePlate || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Fecha de Creación</th>
          <td class="fs-6" >${createdAtFormatted || '-'}</td>
        </tr>
      </tbody>
    </table>
  `;

    Swal.fire({
      title: 'Información del Vehiculo',
      html: tableContent,
      icon: 'info',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#22bb33',
    });
  }

  editVehicle(element: VehicleModel) {
    const createdAtFormatted = new Date(element.createdAt).toLocaleString(
      'es-ES',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    const formContent = `
      <form>
        <table class="table table-striped table-hover">
          <tbody>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Marca</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="make" value="${element.make}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Modelo</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="model" value="${element.model}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Año</th>
              <td>
                <input type="number" class="form-control form-control-sm" id="year" value="${element.year}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Placa</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="licensePlate" value="${element.licensePlate}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Fecha de Creación</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="userCreatedAt" value="${createdAtFormatted}" readonly />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    `;

    Swal.fire({
      title: 'Editar Información del Vehiculo',
      html: formContent,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar Cambios',
      preConfirm: () => {
        const vehicleId = element._id;
        const vehicleMake = document.getElementById(
          'make'
        ) as HTMLInputElement;
        const vehicleModelList = document.getElementById(
          'model'
        ) as HTMLInputElement;
        const vehicleYear = document.getElementById(
          'year'
        ) as HTMLInputElement;
        const vehiclelicensePlate = document.getElementById(
          'licensePlate'
        ) as HTMLInputElement;
        return {
          _id: vehicleId,
          make: vehicleMake.value,
          model: vehicleModelList.value,
          year: vehicleYear.value,
          licensePlate: vehiclelicensePlate.value
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const vehicleEdited: VehicleModel = {
          _id:  result.value._id,
          userId: element.userId,
          make: result.value.make,
          model: result.value.model,
          year: result.value.year,
          licensePlate: result.value.licensePlate,
          createdAt: element.createdAt
        };

        console.log('Datos actualizados:', result.value);
        this.vehicleService.updateVehicleById(vehicleEdited).subscribe((resp: any) => {
          this.loadVehicle();
          Swal.fire('Vehiculo Editado!', `${result.value.make} - ${result.value.licensePlate}`, 'success');
        });
      }
    });
  }

  deleteVehicle(element: VehicleModel) {
  
    Swal.fire({
      title: 'Desea eliminar este vehiculo?',
      icon: 'warning',
      html: `¿Seguro de eliminar el vehiculo ${element.make} - ${element.licensePlate}?`,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deleteVehicleById(element._id).subscribe((resp: any) => {
          this.loadVehicle();
          Swal.fire('Vehiculo Eliminado!', ` ${element.make} - ${element.licensePlate}`, 'success');
        });
      } else if (result.isDismissed) {
        Swal.fire('Vehiculo no eliminado', '', 'info');
      }
    });
  }

  addVehicle() {
    this.router.navigate(['/inicio/crear-vehiculo']);
  }

}
