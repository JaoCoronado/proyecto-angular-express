import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
})
export class TablaComponent implements OnInit {
  @Input() datos: { nombre: string; edad: number; numeroDocumento: number }[] =
    [];

  @Output() onInformacion: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}

  enviarInformacion(data: any) {
    // Emite el evento con la información de *data*
    console.log('Data de la tabla', data);
    this.onInformacion.emit(data);
  }
}
