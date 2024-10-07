import { Routes } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';

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
];
