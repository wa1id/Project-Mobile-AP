import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  results: {};
  naam: string;
  voornaam: string;
  data: {};
  studenten: Array<string> = [];

  email = {
    to: 'wyachou95@gmail.com',
    subject: 'Aanwezigheid Studentenlijst',
    body:  '',
    isHtml: true
  };

  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, private http: Http,
    private storage: Storage, private events: Events, private emailComposer: EmailComposer) {

  }

  async scanBarcode(){
    this.results = await this.barcode.scan();

    //studentennummers doorlopen in json en zoeken naar gescande nummer -> naam opslaan
    this.http.get('https://saiorxiii.cloudant.com/test/39cdb1ffdb892dd9d71940fa251ccc89').map(res => res.json()).subscribe(data => {
            this.data = data.studenten;

            for (var i = 0; i < data.studenten.length; i++) {
              if (data.studenten[i]['pointer student'] == this.results['text'].slice(5,-2)) { //zoeken in array naar juiste student

                //Naam en voornaam tonen op het scherm nadat er werd gescant
                this.naam = data.studenten[i].naam;
                this.voornaam =data.studenten[i].voornaam;

                //Naam en voornaam opslaan in storage
                this.storage.set(data.studenten[i]['pointer student'], data.studenten[i].voornaam + " " + data.studenten[i].naam);
              }
            }
        });

        //Totale keys opslaan in event om te gebruiken in Studenten Tab
        this.storage.length().then((val) => {
          this.events.publish("storageLength", val);
        });
  }

  //Export via Email
  async exportEmail() {
  this.storage.forEach((value, key) => {
      this.studenten.push(value);
      this.email.body = 'test ' + value;
     });

    this.emailComposer.open(this.email);
  }

  //Knop voor te debuggen
  async getStorage() {
    this.storage.keys().then((val) => {
      console.log(val);
    });

    this.storage.forEach( (value, key) => {
       console.log("This is the value: ", value);
       console.log("from the key: ", key);
       });
  }

  //Knop voor te debuggen. GEVAARLIJKE knop zonder driedubbele "Are you sure?" popup.
  async clearStorage() {
    this.storage.clear().then((val) => {
      this.events.publish("storageLength", 0);
      console.log("STORAGE CLEARED");
    });
  }
}
