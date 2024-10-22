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

  loadWorkOrders() {
    // Cargar órdenes de trabajo
    this.workOrderSubscription = this.WorkOrderService.getWorkOrders().subscribe(
      (workOrderData: IRespWorkOrder) => {
        this.workOrders = workOrderData.workOrders;
  
        // Cargar vehículos
        this.vehiclesSubscription = this.vehicleService.getVehicles().subscribe(
          (vehicleData: IRespVehicle) => {
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
  
                  console.log('Órdenes de trabajo con usuarios y vehículos relacionados:', this.workOrders);
                return {
                  ...workOrder,
                  vehicleName: vehicle ? vehicle.make : 'Vehículo no encontrado',
                  userName: user ? user.name : 'Usuario no encontrado',
                };
              });
  
              // Validar si hay órdenes de trabajo y que tengan usuario y vehículo relacionados
              console.log('Órdenes de trabajo con usuarios y vehículos relacionados:', this.workOrders);
  
              // Actualizar el datasource con las órdenes de trabajo relacionadas
              this.dataSource = new MatTableDataSource(this.workOrders);
            });
          }
        );
      }
    );
  }

  addWorkOrder() {
    this.router.navigateByUrl('inicio/create-workOrder');
  }
  
}
