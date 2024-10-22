import { WorkorderService } from './../../../services/workOrder/workorder.service';
import { VehicleService } from './../../../services/vehicle/vehicle.service';
import { UserService } from './../../../services/user/user.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserModel } from '../../../core/models/user.models';
import { VehicleModel } from '../../../core/models/vehicle.model';
@Component({
  selector: 'app-create-work-order',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-work-order.component.html',
  styleUrl: './create-work-order.component.scss'
})
export class CreateWorkOrderComponent implements OnInit {

  workOrderForm: FormGroup
  WorkOrderService = inject(WorkorderService)
  formBuilder = inject(FormBuilder)
  vehicleService = inject(VehicleService)
  usersInfo: UserModel[] = []
  vehiclesInfo: VehicleModel[] = []
  filteredVehicles: VehicleModel[] = []; 
  userService = inject(UserService)
  router = inject(Router)
  
  get formulario() {
    return this.workOrderForm.controls
  }

  ngOnInit(): void {
    this.cargarUser();
    this.cargarVehiculos()
    this.workOrderForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      vehicleId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    });
    this.workOrderForm.get('userId')?.valueChanges.subscribe(userId => {
      this.filtrarVehiculos(userId);
    });
  }

  cargarUser() {
    this.userService.getUsers().subscribe((resp: any) => {
      console.log(resp.users);
      this.usersInfo = resp.users;
    });
  }

  cargarVehiculos() {
    this.vehicleService.getVehicles().subscribe((resp: any) => {
      console.log(resp.vehicles);
      this.vehiclesInfo = resp.vehicles;
    });
  }

  filtrarVehiculos(userId: string) {
    if (userId) {
      this.filteredVehicles = this.vehiclesInfo.filter(vehicle => vehicle.userId === userId);
      if (this.filteredVehicles.length > 0) {
        this.workOrderForm.get('vehicleId')?.enable(); 
      } else {
        this.workOrderForm.get('vehicleId')?.disable(); 
      }
    } else {
      this.filteredVehicles = [];
      this.workOrderForm.get('vehicleId')?.disable(); 
    }
  }

  cancelar() {
    this.router.navigate(['/inicio/workOrders']);
  }

  recibirDatos() {
    console.log(this.workOrderForm.value);
    this.WorkOrderService.createWorkOrder(this.workOrderForm.value).subscribe(
      (response: any) => {
        Swal.fire('Orden de trabajo Creada', `${this.workOrderForm.value.description}`, 'success');
        console.log(this.workOrderForm);
        this.router.navigateByUrl('inicio/workOrders');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error al crear la orden de trabajo', '', 'error');
      }
    );
  }

}
