import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Subscription, map } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserModel, UserResModel } from '../../../core/models/user.models';
import { UserService } from '../../../services/user/user.service';
import { IRespUser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-view-users',
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
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss',
})
export class ViewUsersComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: any = '';

  users: UserResModel[] = [];

  userSubscription: Subscription;

  private _liveAnnouncer = inject(LiveAnnouncer);
  private userService = inject(UserService);
  private router = inject(Router);

  displayedColumns: string[] = [
    '_id',
    'name',
    'documentNumber',
    'phone',
    'role',
    'action',
  ];

  @ViewChild(MatSort) sort: MatSort;
  userRole: string | null;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadUser();
    this.userRole = localStorage.getItem('userRole');
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadUser() {
    this.userSubscription = this.userService
      .getUsers()
      .subscribe((data: IRespUser) => {
        this.users = data.users;
        this.dataSource = new MatTableDataSource(this.users);
      });
  }

  infoUser(element: UserResModel) {
    const createdAtFormatted = new Date(element.createdAt).toLocaleString(
      'es-ES',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
    const tableContent = `
    <table class="table table-hover table-striped">
      <tbody>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Nombre</th>
          <td class="fs-6"" class="fs-6">${element.name || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Número de Documento</th>
          <td class="fs-6"">${element.documentNumber || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Correo Electrónico</th>
          <td class="fs-6"">${element.email || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Teléfono</th>
          <td class="fs-6"">${element.phone || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Ciudad</th>
          <td class="fs-6"">${element.city || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Dirección</th>
          <td class="fs-6"">${element.address || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Rol</th>
          <td class="fs-6"">${element.role || '-'}</td>
        </tr>
        <tr>
          <th scope="row" class="text-start text-primary fs-6">Fecha de Creación</th>
          <td class="fs-6" >${createdAtFormatted || '-'}</td>
        </tr>
      </tbody>
    </table>
  `;

    Swal.fire({
      title: 'Información del Usuario',
      html: tableContent,
      icon: 'success',
      confirmButtonColor: '#22bb33',
      confirmButtonText: 'OK',
    });
  }

  editUser(element: UserResModel) {
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
              <th scope="row" class="text-start text-success fs-6">Nombre</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="userName" value="${element.name}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Número de Documento</th>
              <td>
                <input type="number" class="form-control form-control-sm" id="userDocumentNumber" value="${element.documentNumber}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Correo Electrónico</th>
              <td>
                <input type="email" class="form-control form-control-sm" id="userEmail" value="${element.email}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Teléfono</th>
              <td>
                <input type="number" class="form-control form-control-sm" id="userPhone" value="${element.phone}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Ciudad</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="userCity" value="${element.city}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Dirección</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="userAddress" value="${element.address}" />
              </td>
            </tr>
            <tr>
              <th scope="row" class="text-start text-success fs-6">Rol</th>
              <td>
                <input type="text" class="form-control form-control-sm" id="userRole" value="${element.role}" />
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
      title: 'Editar Información del Usuario',
      html: formContent,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar Cambios',
      preConfirm: () => {
        const userId = element._id;
        const userName = document.getElementById(
          'userName'
        ) as HTMLInputElement;
        const userDocumentNumber = document.getElementById(
          'userDocumentNumber'
        ) as HTMLInputElement;
        const userEmail = document.getElementById(
          'userEmail'
        ) as HTMLInputElement;
        const userPhone = document.getElementById(
          'userPhone'
        ) as HTMLInputElement;
        const userCity = document.getElementById(
          'userCity'
        ) as HTMLInputElement;
        const userAddress = document.getElementById(
          'userAddress'
        ) as HTMLInputElement;
        const userRole = document.getElementById(
          'userRole'
        ) as HTMLInputElement;

        return {
          _id: userId,
          name: userName.value,
          documentNumber: userDocumentNumber.value,
          email: userEmail.value,
          phone: userPhone.value,
          city: userCity.value,
          address: userAddress.value,
          role: userRole.value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const usuarioEditado: UserModel = {
          _id: result.value._id,
          documentNumber: result.value.documentNumber,
          name: result.value.name,
          createdAt: element.createdAt,
          role: result.value.role,
          email: result.value.email,
          phone: result.value.phone,
          city: result.value.city,
          address: result.value.address,
        };

        console.log('Datos actualizados:', result.value);
        this.userService.userUpdate(usuarioEditado).subscribe((resp: any) => {
          this.loadUser();
          Swal.fire('Usuario Editado!', `${result.value.name}`, 'success');
        });
      }
    });
  }

  deleteUser(user: UserResModel) {
    Swal.fire({
      title: 'Desea eliminar este usuario',
      icon: 'warning',
      html: `¿Seguro de eliminar el usuario ${user.name}?`,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id).subscribe((resp: any) => {
          this.loadUser();
          Swal.fire('Usuario Eliminado!', `${resp.msg}`, 'success');
        });
      } else if (result.isDismissed) {
        Swal.fire('Usuario no eliminado', '', 'info');
      }
    });
  }

  addUser() {
    this.router.navigateByUrl('inicio/crear-usuario');
  }
}
