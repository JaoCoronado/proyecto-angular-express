import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;

  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router)


  get formulario(){
    return this.userForm.controls
  }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', []],
    });
  }



  recibirDatos() {
    this.userService.createUser(this.userForm.value).subscribe((resp: any) => {
      Swal.fire('Usuario Creado',`${this.userForm.value.name}`, 'success');
      console.log(this.userForm);
      this.router.navigateByUrl('/')
    });
  }
}
