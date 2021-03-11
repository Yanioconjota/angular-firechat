import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {
    this.auth.authState.subscribe( user => {
      console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }
      if (user.displayName === null) {
        this.usuario.nombre = user.providerData[0].email;
      } else {
        this.usuario.nombre = user.displayName;
      }
      if (user.photoURL !== null) {
        this.usuario.img = user.photoURL;
      }
      this.usuario.uid = user.uid;
      console.log(this.usuario)
    })
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  }
  logout() {
    this.auth.signOut();
    this.usuario = {};
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: Mensaje[]) => {
          console.log(mensajes);
          this.chats = [];
          for (const mensaje of mensajes) {
            this.chats.unshift(mensaje);
          }
          return this.chats;
        })
      )                        
  }

  agregarMensaje( texto: string ){
    //Falta uid del usuario
    let mensaje: Mensaje = {
      nombre: 'Janio',
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add( mensaje );
  }
}
