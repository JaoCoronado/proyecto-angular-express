import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);

  get formulario(){
    return this.loginForm.controls
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loguearce() {
    this.loginService.login(this.loginForm.value).subscribe((resp: any) => {
      if (resp.user) {
        const { name, email,role } = resp.user;

        localStorage.setItem('userRole', role);

        Swal.fire({
          title: `Bienvenido ${name}`,
          icon: 'success',
          confirmButtonColor: '#22bb33',
          confirmButtonText: 'Continuar',
        }).then(() => {
          this.router.navigate(['inicio/usuarios']);
        });
      }
    });
  }
}
