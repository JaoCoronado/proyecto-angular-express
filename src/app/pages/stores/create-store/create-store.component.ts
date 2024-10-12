import { UserService } from './../../../services/user/user.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../services/store/store.service'; // Asegúrate de tener un servicio para manejar las tiendas
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserModel } from '../../../core/models/user.models';

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-store.component.html',
  styleUrl: './create-store.component.scss',
})
export class CreateStoreComponent implements OnInit {
  storeForm: FormGroup;
  usersAdmin: UserModel[] = [];
  formBuilder = inject(FormBuilder);
  storeService = inject(StoreService);
  userService = inject(UserService);
  router = inject(Router);

  get formulario(){
    return this.storeForm.controls
  }

  ngOnInit(): void {
    this.storeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      price: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      admin: ['', [Validators.required]],
    });
    this.cargarUser()
  }

  recibirDatos(): void {
    if (this.storeForm.valid) {
      console.log(this.storeForm.value);
      this.storeService.createStore(this.storeForm.value).subscribe((response: any) => {
        console.log(response);
          Swal.fire('Tienda Creada', response.msg	, 'success');
          this.router.navigateByUrl('/stores');
        },
        (error) => {
          Swal.fire('Error al crear la tienda', '', 'error');
          console.error('Error al crear la tienda:', error);
        }
      );
    }
  }

  cargarUser() {
    this.userService.getUsers().subscribe((resp: any) => {
      console.log(resp);
      this.usersAdmin = resp.users;
  })
}
}