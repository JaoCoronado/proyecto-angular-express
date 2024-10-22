import { Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ViewUsersComponent } from './pages/users/view-users/view-users.component';
import { StoresComponent } from './pages/stores/stores.component';
import { CreateStoreComponent } from './pages/stores/create-store/create-store.component';
import { loginGuard } from './core/guards/login/login.guard';
import { LoginComponent } from './auth/login/login.component';
import { Component } from '@angular/core';
import { ViewVehiclesComponent } from './pages/vehicles/view-vehicles/view-vehicles.component';
import { CreateVehiclesComponent } from './pages/vehicles/create-vehicles/create-vehicles.component';
import { WorkOrdersComponent } from './pages/workOrders/work-orders/work-orders.component';
import { CreateWorkOrderComponent } from './pages/workOrders/create-work-order/create-work-order.component';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Iniciar sesión',
    children: [
      {path: 'login',
      component: LoginComponent
      }
    ]
  },
  {
    path: 'inicio',
    title: 'Inicio',
    canActivate: [loginGuard],
    children: [
      //path por defecto del path padre
      {path: "",title: "Inicio de la aplicación",component: InicioComponent},
      {
        path: 'usuarios',
        title: 'Usuarios',
        component: ViewUsersComponent,
      },
      {
        path: 'crear-usuario',
        title: 'Crear un Usuario',
        component: CreateUserComponent,
      },
      {
        path: 'usuarios',
        title: 'usuarios',
        component: ViewUsersComponent,
      },
      {
        path: 'crear-tienda',
        title: 'Crear una Tienda',
        component: CreateStoreComponent,
      },
      {
        path: 'vehicles',
        title: 'Vehiculos',
        component: ViewVehiclesComponent,
      },
      {
        path: 'crear-vehiculo',
        title: 'Crear un Vehiculo',
        component: CreateVehiclesComponent,
      },
      {
        path: 'workOrders',
        title: 'Ordenes de Trabajo',
        component: WorkOrdersComponent,
      },
      {
        path : 'create-workOrder',
        title: 'Crear Orden de Trabajo',
        component: CreateWorkOrderComponent,
      },
      {
        path: 'galeria',
        title: 'Galeria',
        component: GaleriaComponent,
      },
      {
        path: 'articulo',
        title: 'Articulo',
        component: ArticuloComponent,
      },
      {
        path: 'contacto',
        title: 'Contacto',
        component: ContactoComponent,
      },
      {
        path: 'stores',
        title: 'Stores',
        component: StoresComponent,
      },
    ],
  },
  // si la ruta no existe, redireccion siempre al login
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];
