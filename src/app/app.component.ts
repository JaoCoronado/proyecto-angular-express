import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablaComponent } from './components/tabla/tabla.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TablaComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'front';
  titulo: string = 'Clase de Angular';
  edad: number = 2 * 20;
  mayuscula: string = this.titulo.toLocaleUpperCase();

  numeros: number[] = [1, 2.3, 45, 78, 5, 789, 456, 6, 123, 3, 23, 5, 5];
  frutas = ['guindas', 'manzanas', 'bananas'];

  mostrar: boolean = true;

  persona: { nombre: string; edad: number; numeroDocumento: number }[] = [
    {
      nombre: 'Taylor',
      edad: 12,
      numeroDocumento: 456456,
    },
    {
      nombre: 'Juan',
      edad: 41,
      numeroDocumento: 10107456,
    },
    {
      nombre: 'Maria',
      edad: 18,
      numeroDocumento: 4563214,
    },
    {
      nombre: 'Pedro',
      edad: 52,
      numeroDocumento: 789456,
    },
    {
      nombre: 'Pepito',
      edad: 45,
      numeroDocumento: 987654,
    },
    {
      nombre: 'Marcos',
      edad: 14,
      numeroDocumento: 78455,
    },
    {
      nombre: 'Milton',
      edad: 41,
      numeroDocumento: 1020345,
    },
  ];

  rutaImagen: string = '';
  nombreImagen: string = 'Nombre de la imagen';

  // Ejecuta cuando componente se carga
  ngOnInit(): void {
    this.titulo = 'este es un ejemplo';
    // this.numeros = this.numeros.filter((numero: number) => numero === 5);

    this.frutas.sort(); // ['bananas', 'guindas', 'manzanas']

    this.rutaImagen =
      'https://www.adslzone.net/app/uploads-adslzone.net/2021/12/www-vs-internet-930x487.jpg';
  }

  // llenarObjeto() {
  //   return (this.persona = {
  //     nombre: 'Pepito',
  //     edad: 12,
  //     numer
  //   });
  // }

  ocultarTexto() {
    this.mostrar = !this.mostrar;
  }

  recibirInformacion(data: any) {
    console.log('Data recibida', data);
  }
}
