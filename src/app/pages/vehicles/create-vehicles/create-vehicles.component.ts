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

@Component({
  selector: 'app-create-vehicles',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-vehicles.component.html',
  styleUrl: './create-vehicles.component.scss',
})
export class CreateVehiclesComponent implements OnInit {
  vehicleForm: FormGroup;
  formBuilder = inject(FormBuilder);
  vehicleService = inject(VehicleService);
  usersInfo: UserModel[] = [];
  userService = inject(UserService);
  router = inject(Router);

  get formulario() {
    return this.vehicleForm.controls;
  }

  ngOnInit() {
    this.cargarUser();
    this.vehicleForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      licensePlate: ['', [Validators.required]],
    });
  }

  cargarUser() {
    this.userService.getUsers().subscribe((resp: any) => {
      console.log(resp.users);
      this.usersInfo = resp.users;
    });
  }
  

  recibirDatos() {
    console.log(this.vehicleForm.value);
    this.vehicleService.createVehicle(this.vehicleForm.value).subscribe(
      (response: any) => {
        Swal.fire('Vehículo Creado', `${this.vehicleForm.value.make} - ${this.vehicleForm.value.licensePlate}`, 'success');
        console.log(this.vehicleForm);
        this.router.navigateByUrl('inicio/vehicles');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error al crear el vehículo', '', 'error');
      }
    );
  }
}
