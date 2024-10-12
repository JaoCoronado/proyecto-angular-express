import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {

loginForm: FormGroup;
formBuilder = inject(FormBuilder);
loginService = inject(LoginService);

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
}

loguearce(){
  this.loginService.login(this.loginForm.value).subscribe(
    (resp: any) => {
      console.log(resp);
    }
  )
}



}
