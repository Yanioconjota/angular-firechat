import { Component, HostListener, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
  mensaje: string = "";
  elemento: any;
  scrHeight: any;
  scrWidth: any;
  
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight / 2;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor(public _cs: ChatService) {
    this._cs.cargarMensajes()
            .subscribe(()=> {
              setTimeout(() => {
                this.elemento.scrollTop = this.elemento.scrollHeight;
              }, 20);
            });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
    this.getScreenSize();
  }

  enviar_mensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
            .then(() => {
              console.log('Mensaje guardado');
              this.mensaje = '';
            })
            .catch((err) => console.log('Error al enviar mensaje', err));
  }

}
