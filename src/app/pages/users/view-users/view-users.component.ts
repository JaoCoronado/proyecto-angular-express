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
  imports: [ MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    '_id',
    'name',
    'documentNumber',
    'createdAt',
    'role',
    'action',
  ];
  dataSource: any = '';

  users: UserResModel[] = [];

  userSubscription: Subscription;

  private _liveAnnouncer = inject(LiveAnnouncer);
  private userService = inject(UserService);
  private router = inject(Router)

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadUser();
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
    Swal.fire({
      title: 'Información del Usuario',
      html: `
        <span class="badge bg-primary">ID:</span> <p class="fw-normal">${element._id}</p>
        <span class="badge bg-primary">Name:</span> <p class="fw-normal">${element.name}</p>
        <span class="badge bg-primary">Document Number:</span> <p class="fw-normal">${element.documentNumber}</p>
        <span class="badge bg-primary">Created At:</span> <p class="fw-normal">${createdAtFormatted}</p>
        <span class="badge bg-primary">Role:</span> <p class="fw-normal">${element.role}</p>
      `,
      icon: 'success',
      confirmButtonColor: '#22bb33',
      confirmButtonText: 'OK',
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
        Swal.fire('No lo elimina', '', 'info');
      }
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
    Swal.fire({
      title: 'Editar Información del Usuario',
      html: `
        <form>
          <div class="form-group mb-3">
            <label for="userName" class="badge bg-primary">Name:</label>
            <input type="text" id="userName" class="form-control form-control-sm" value="${element.name}" />
          </div>
          <div class="form-group mb-3">
            <label for="documentNumber" class="badge bg-primary">Document Number:</label>
            <input type="text" id="documentNumber" class="form-control form-control-sm" value="${element.documentNumber}" />
          </div>
          <div class="form-group mb-3">
            <label for="createdAt" class="badge bg-primary">Created At:</label>
            <input type="text" id="createdAt" class="form-control form-control-sm" value="${createdAtFormatted}" readonly />
          </div>
          <div class="form-group mb-3">
            <label for="role" class="badge bg-primary">Role:</label>
            <input type="text" id="role" class="form-control form-control-sm" value="${element.role}" />
          </div>
        </form>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar Cambios',
      preConfirm: () => {
        const userId = element._id;
        const userName = (
          document.getElementById('userName') as HTMLInputElement
        ).value;
        const documentNumber = (
          document.getElementById('documentNumber') as HTMLInputElement
        ).value;
        const role = (document.getElementById('role') as HTMLInputElement)
          .value;

        return {
          _id: userId,
          name: userName,
          documentNumber: documentNumber,
          role: role,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const usuarioEditado: UserModel = {
          _id: result.value._id,
          documentNumber: result.value.documentNumber,
          name: result.value.name,
          createdAt: result.value.createdAt,
          role: result.value.role,
        };

        console.log('Datos actualizados:', result.value);
        this.userService.userUpdate(usuarioEditado).subscribe((resp: any) => {
          this.loadUser();
          Swal.fire('Usuario Editado!', `${resp.msg}`, 'success');
        });;
      }
    });
  }


  addUser(){
this.router.navigateByUrl('crear-usuario')
  }
}
