import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  studenten: Array<string> = [];
  storageLength: number;

  constructor(public navCtrl: NavController, private storage: Storage, private events: Events) {
    //Huidige storageLength ophalen bij het laden van de app.
    // this.storage.length().then((val) => {
    //   this.storageLength = val;
    // });

    //geupdate storageLength halen nadat er gescant wordt.
    events.subscribe('storageLength', (val) => {
        this.storageLength = val;
    });

    this.storage.forEach( (value, key) => {
        this.studenten.push(value);
       });
  }

  ionSelected(){
    console.log(this.studenten);
  }
}
