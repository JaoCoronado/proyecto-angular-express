import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss'
})
export class ArticuloComponent implements AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Selecciona todos los elementos con la clase 'fade-in'
    const faders = this.el.nativeElement.querySelectorAll('.fade-in');

    // Configuración del IntersectionObserver
    const options = {
      threshold: 0.1, // Se ejecuta cuando el 10% del elemento es visible
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agrega la clase 'show' cuando el elemento es visible
          this.renderer.addClass(entry.target, 'show');
          // Deja de observar el elemento
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observa cada elemento con la clase 'fade-in'
    faders.forEach((fader: HTMLElement) => {
      observer.observe(fader);
    });
  }

}
