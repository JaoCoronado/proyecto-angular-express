import { LoginService } from './../../services/login/login.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loginService = inject(LoginService);

  logOut() {
    if(this.loginService.user){
      Swal.fire({
        title: 'Desea Cerrar sesion?',
        icon: 'question',
        html: `¿Seguro de cerrar sesion de ${this.loginService.user.name}?`,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: `Sí`,
        confirmButtonColor: '#22bb33',
        cancelButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
        
          Swal.fire(
            'Cerrar sesion',
            'Cerro sesion correctamente',
            'success'
          );
          this.loginService.logOut();
        }
  
      });

    }else{
      Swal.fire(
        'Iniciar sesion',
        'No haz iniciado sesion!!',
        'error',
      );

    }
  }
}
