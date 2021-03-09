import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
  mensaje: string = "";

  constructor(public _cs: ChatService ) {
    this._cs.cargarMensajes()
            .subscribe();
  }

  ngOnInit(): void {
  }

  enviar_mensaje(mensaje: string) {
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
