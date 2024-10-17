import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import emailjs from 'emailjs-com';
// import { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent implements AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const faders = this.el.nativeElement.querySelectorAll('.fade-in');

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'show');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    faders.forEach((fader: HTMLElement) => {
      observer.observe(fader);
    });
  }

  sendEmail(event: Event): void {
    event.preventDefault();
  
    const target = event.target as HTMLFormElement;
    
    // Validaciones simples
    if (!target) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const formData = {
      from_name: (document.getElementById('name') as HTMLInputElement).value,
      from_email: (document.getElementById('email') as HTMLInputElement).value,
      subject: (document.getElementById('subject') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLTextAreaElement).value
    };
  
    const serviceID = 'service_rxy1r0e';
    const templateID = 'template_4ibvhqr';
    const publicKey  = '1ArZgD9YrNhNpr2D5';

    console.log(formData);
  
    emailjs.send(serviceID, templateID, formData, publicKey )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('El mensaje se ha enviado correctamente.');
      }, (err) => {
        console.error('FAILED...', err);
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      });
  }
  

}
