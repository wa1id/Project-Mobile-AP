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

    //TODO: Wanneer storage gecleared wordt moet deze lijst dat ook tonen. Niet pas nadat de app/pagina herlaad

    //geupdate storageLength halen nadat er gescant wordt.
    events.subscribe('storageLength', (val) => {
        this.storageLength = val;
    });

    //elke student uit storage halen en opslaan in array
    this.storage.forEach((value, key) => {
        this.studenten.push(value);
       });
  }
}
