import { Component } from '@angular/core';
import { TPersona } from '../../core/types/persona.type';
import { IPersona } from '../../core/interfaces/persona.interface';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.scss',
})
export class PersonaComponent {
  // Type
  personas: TPersona[]  = [];

  // Interface
  personasDos: IPersona[] = [
    { id: 0, name: 'Sarah', edad: 25 },
    { id: 1, name: 'Amy', edad: 2 },
    { id: 2, name: 'Rachel', edad: 52 },
    { id: 3, name: 'Jessica', edad: 45 },
    { id: 4, name: 'Poornima', edad: 32 },
    { id: 5, name: 'Ana Lucía', edad: 35 },
    { id: 6, name: 'Maria', edad: 14 },
    { id: 7, name: 'Antonio', edad: 56 },
  ];
}
