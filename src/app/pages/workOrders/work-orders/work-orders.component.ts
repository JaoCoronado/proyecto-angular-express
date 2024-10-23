import { WorkorderService } from './../../../services/workOrder/workorder.service';
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
import { WorkOrderModel } from '../../../core/models/workOrder.model';
import { IRespWorkOrder } from '../../../core/interfaces/workOrder.interface';
@Component({
  selector: 'app-work-orders',
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
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss',
})
export class WorkOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource: any = '';

  vehicles: VehicleModel[] = [];
  vehiclesSubscription: Subscription;
  vehicleService = inject(VehicleService);
  usersInfo: UserModel[] = [];
  userService = inject(UserService);
  workOrders: WorkOrderModel[] = [];
  workOrderSubscription: Subscription;
  WorkOrderService = inject(WorkorderService);
  userRole: string | null;

  private router = inject(Router);

  displayedColumns: string[] = [
    '_id',
    'userName',
    'make',
    'description',
    'status',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    // this.cargarUser()
    // this.loadVehicle()
    this.userRole = localStorage.getItem('userRole');
    this.loadWorkOrders();
  }

  ngOnDestroy(): void {
    this.workOrderSubscription?.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  infoWorkOrder(element: WorkOrderModel) {
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
          <th scope="row" class="text-start text-primary fs-6">Vehiculo ID</th>
          <td class="fs-6">${element.vehicleId || '-'}</td>
        </tr>
        <tr>
        <th scope="row" class="text-start text-primary fs-6">Descripción</th>
        <td class="fs-6">${element.description || '-'}</td>
        </tr>
        <tr>
        <th scope="row" class="text-start text-primary fs-6">Estado</th>
        <td class="fs-6">${element.status || '-'}</td>
        </tr>
        <tr>
        <th scope="row" class="text-start text-primary fs-6">Fecha de Creación</th>
        <td class="fs-6">${createdAtFormatted || '-'}</td>
        </tr>
        </tbody>
      </table>
        `;

    Swal.fire({
      title: 'Información de la orden de trabajo',
      html: tableContent,
      icon: 'info',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#22bb33',
    });
  }

  editWorkOrder(element: WorkOrderModel) {
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
            <th scope="row" class="text-start text-success fs-6">Vehiculo ID</th>
            <td>
              <input type="text" class="form-control form-control-sm" id="vehicleId" readonly value="${element.vehicleId}" />
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-start text-success fs-6">Descripción</th>
            <td>
              <input type="text" class="form-control form-control-sm" id="description" value="${element.description}" />
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-start text-success fs-6">Estado</th>
            <td>
              <input type="text" class="form-control form-control-sm" id="status" value="${element.status}" />
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-start text-success fs-6">Costo</th>
            <td>
              <input type="text" class="form-control form-control-sm" id="cost" value="${element.cost}" />
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
      title: 'Editar Información de la orden de trabajo',
      html: formContent,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar Cambios',
      preConfirm: () => {
        const workOrderId = element._id;
        const description = document.getElementById('description') as HTMLInputElement;
        const status = document.getElementById('status') as HTMLInputElement;
        const cost = document.getElementById('cost') as HTMLInputElement;
        
        return {
          _id: workOrderId,
          description: description.value,
          status: status.value,
          cost: cost.value
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const workorderEdited : WorkOrderModel = {
          _id: result.value._id,
          vehicleId: result.value.vehicleId,
          description: result.value.description,
          status: result.value.status,
          cost: result.value.cost,
          createdAt: element.createdAt,
        };
        console.log('Datos actualizados', result.value);
        this.WorkOrderService.updateWorkOrderById(workorderEdited).subscribe(
          (resp: any) => {
            console.log('Respuesta', resp);
            this.loadWorkOrders();
            Swal.fire(
              '¡Orden de trabajo actualizada!',
              `${result.value.description}`,
              'success'
            );
          }
        );
      }
    });
  }

  deleteWorkOrder(element: WorkOrderModel) {
    Swal.fire({
      title: 'Desea eliminar esta orden de trabajo?',
      icon: 'warning',
      html: `¿Seguro de eliminar la orden de trabajo ${element.description}?`,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.WorkOrderService.deleteWorkOrderById(element._id).subscribe(
          (resp: any) => {
            this.loadWorkOrders();
            Swal.fire(
              'Orden de trabajo eliminada!',
              `${element.description}`,
              'success'
            );
          }
        );
      } else if (result.isDismissed) {
        Swal.fire('Orden de trabajo no eliminada', '', 'info');
      }
    });
  }

  loadWorkOrders() {
    // Cargar órdenes de trabajo
    this.workOrderSubscription =
      this.WorkOrderService.getWorkOrders().subscribe(
        (workOrderData: IRespWorkOrder) => {
          this.workOrders = workOrderData.workOrders;

          // Cargar vehículos
          this.vehiclesSubscription = this.vehicleService
            .getVehicles()
            .subscribe((vehicleData: IRespVehicle) => {
              this.vehicles = vehicleData.vehicles;

              // Cargar usuarios
              this.userService.getUsers().subscribe((userData: IRespUser) => {
                this.usersInfo = userData.users;

                // Relacionar órdenes de trabajo con vehículos y usuarios
                this.workOrders = this.workOrders.map((workOrder) => {
                  // Encontrar el vehículo relacionado con la orden de trabajo
                  const vehicle = this.vehicles.find(
                    (v) => v._id === workOrder.vehicleId
                  );
                  // Si se encuentra el vehículo, buscar el usuario relacionado
                  const user = vehicle
                    ? this.usersInfo.find((u) => u._id === vehicle.userId)
                    : null;

                  console.log(
                    'Órdenes de trabajo con usuarios y vehículos relacionados:',
                    this.workOrders
                  );
                  return {
                    ...workOrder,
                    vehicleName: vehicle
                      ? vehicle.make
                      : 'Vehículo no encontrado',
                    userName: user ? user.name : 'Usuario no encontrado',
                  };
                });

                // Validar si hay órdenes de trabajo y que tengan usuario y vehículo relacionados
                console.log(
                  'Órdenes de trabajo con usuarios y vehículos relacionados:',
                  this.workOrders
                );

                // Actualizar el datasource con las órdenes de trabajo relacionadas
                this.dataSource = new MatTableDataSource(this.workOrders);
              });
            });
        }
      );
  }

  addWorkOrder() {
    this.router.navigateByUrl('inicio/create-workOrder');
  }
}
