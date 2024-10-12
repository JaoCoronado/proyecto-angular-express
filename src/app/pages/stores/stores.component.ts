import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { IRespStore, IStore } from '../../core/interfaces/store.interface';
import { Subscription, map } from 'rxjs';
import { StoreModel, StoreResModel } from '../../core/models/store.model';
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

@Component({
  selector: 'app-stores',
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
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
})
export class StoresComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    '_id',
    'name',
    'address',
    'phone',
    'price',
    'action',
  ];
  dataSource: any = '';
  stores: StoreModel[] = [];
  storesSubscription: Subscription;

  private _liveAnnouncer = inject(LiveAnnouncer);
  private storeService = inject(StoreService);
  private router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadStore();
  }

  ngOnDestroy(): void {
    this.storesSubscription?.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadStore() {
    this.storesSubscription = this.storeService
      .getstore()
      .subscribe((data: IRespStore) => {
        this.stores = data.stores;
        console.log(this.stores, data.stores);
        this.dataSource = new MatTableDataSource(this.stores);
      });
  }

  infoStore(element: StoreModel) {
    const createdAtFormatted = element.createdAt
      ? new Date(element.createdAt).toLocaleString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Fecha no disponible';
    Swal.fire({
      title: 'Información del tienda',
      html: `
      <span class="badge bg-primary">ID:</span> <p class="fw-normal">${element._id}</p>
      <span class="badge bg-primary">Name:</span> <p class="fw-normal">${element.name}</p>
      <span class="badge bg-primary">Address:</span> <p class="fw-normal">${element.address}</p>
      <span class="badge bg-primary">Phone:</span> <p class="fw-normal">${element.phone}</p>
      <span class="badge bg-primary">Price:</span> <p class="fw-normal">${element.price}</p>
      <span class="badge bg-primary">Created At:</span> <p class="fw-normal">${createdAtFormatted}</p>
    `,
      icon: 'success',
      confirmButtonColor: '#22bb33',
      confirmButtonText: 'OK',
    });
  }

  editStore(element: StoreModel) {
    const createdAtFormatted = element.createdAt
      ? new Date(element.createdAt).toLocaleString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Fecha no disponible';
    Swal.fire({
      title: 'Editar Información del Usuario',
      html: `
      <form>
        <div class="form-group mb-3">
          <label for="storeName" class="badge bg-primary">Name:</label>
          <input type="text" id="storeName" class="form-control form-control-sm" value="${element.name}" />
        </div>
        <div class="form-group mb-3">
          <label for="address" class="badge bg-primary">address:</label>
          <input type="text" id="address" class="form-control form-control-sm" value="${element.address}" />
        </div>
        <div class="form-group mb-3">
        <label for="phone" class="badge bg-primary">phone:</label>
        <input type="text" id="phone" class="form-control form-control-sm" value="${element.phone}" />
        </div>
        <div class="form-group mb-3">
        <label for="price" class="badge bg-primary">price:</label>
        <input type="text" id="price" class="form-control form-control-sm" value="${element.price}" />
        </div>
        <div class="form-group mb-3">
          <label for="createdAt" class="badge bg-primary">Created At:</label>
          <input type="text" id="createdAt" class="form-control form-control-sm" value="${createdAtFormatted}" readonly />
        </div>
      </form>
    `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar Cambios',
      preConfirm: () => {
        const storeId = element._id;
        const storeName = (
          document.getElementById('storeName') as HTMLInputElement
        ).value;
        const address = (document.getElementById('address') as HTMLInputElement)
          .value;
        const phone = (document.getElementById('phone') as HTMLInputElement)
          .value;
        const price = (document.getElementById('price') as HTMLInputElement)
          .value;

        return {
          _id: storeId,
          name: storeName,
          phone: phone,
          price: price,
          address: address,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const storeEditado: StoreModel = {
          _id: result.value._id,
          name: result.value.name,
          address: result.value.address,
          phone: result.value.phone,
          createdAt: result.value.createdAt,
          price: result.value.price,
        };

        console.log('Datos actualizados:', result.value);
        this.storeService.storeUpdate(storeEditado).subscribe((resp: any) => {
          console.log(resp);
          this.loadStore();
          Swal.fire('Tienda Editada!', `La tienda ha sido editada`, 'success');
        });
      }
    });
  }

  deleteStore(element: StoreModel) {
    Swal.fire({
      title: 'Desea eliminar esta tienda?',
      icon: 'warning',
      html: `¿Seguro de eliminar la tienda ${element.name}?`,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        // this.storeService.deleteStore(element._id).subscribe((resp: any) => {
        //   this.loadStore();
        //   Swal.fire('Tienda Eliminada!', `${resp.msg}`, 'success');
        // });
        Swal.fire(
          'Tienda Eliminada!',
          'La tienda ha sido eliminada',
          'success'
        );
      } else if (result.isDismissed) {
        Swal.fire('No lo elimina', '', 'info');
      }
    });
  }

  addStore() {
    this.router.navigateByUrl('crear-tienda');
  }
}
