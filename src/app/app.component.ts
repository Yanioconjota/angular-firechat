import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firechat';
  public chats: Observable<any[]>;

  constructor(db: AngularFirestore,
              public _cs: ChatService) {
    this.chats = db.collection('chats').valueChanges();
  }

  logout(){
    this._cs.logout();
  }
}
