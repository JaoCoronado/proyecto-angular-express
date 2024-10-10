import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StoreService } from '../../services/store/store.service';
import { IRespUser, IUser } from '../../core/interfaces/user.interface';
import { Subscription, map } from 'rxjs';
import { UserResModel } from '../../core/models/user.models';
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

@Component({
  selector: 'app-inicio',
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
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {

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

  userSubscription: Subscription

  private _liveAnnouncer = inject(LiveAnnouncer);
  private userService = inject(UserService)


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadUser() {
   this.userSubscription = this.userService.getUsers().subscribe((data: IRespUser) => {
      this.users = data.users;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  infoModal(element: UserResModel) {
    Swal.fire({
      title: 'Información del Usuario',
      html: `
        <span class="badge bg-primary">ID:</span> <p class="fw-normal">${element._id}</p>
        <span class="badge bg-primary">Name:</span> <p class="fw-normal">${element.name}</p>
        <span class="badge bg-primary">Document Number:</span> <p class="fw-normal">${element.documentNumber}</p>
        <span class="badge bg-primary">Created At:</span> <p class="fw-normal">${element.createdAt}</p>
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
}
