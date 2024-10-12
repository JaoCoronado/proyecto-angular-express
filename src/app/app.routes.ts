import { Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ViewUsersComponent } from './pages/users/view-users/view-users.component';
import { StoresComponent } from './pages/stores/stores.component';
import { CreateStoreComponent } from './pages/stores/create-store/create-store.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: InicioComponent,
  },
  {
    path: 'persona',
    title: 'App de Personas',
    component: PersonaComponent,
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    component: ViewUsersComponent
  },
  {
    path: 'crear-usuario',
    title: 'Crear un Usuario',
    component: CreateUserComponent
  },
  {
    path: 'usuarios',
    title: 'usuarios',
    component: ViewUsersComponent
  },
  {
    path: 'crear-tienda',
    title: 'Crear una Tienda',
    component: CreateStoreComponent
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
];
