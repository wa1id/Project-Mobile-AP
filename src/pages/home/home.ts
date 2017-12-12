import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

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

  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, private http: Http, private storage: Storage, private events: Events) {

  }

  async scanBarcode(){
    this.results = await this.barcode.scan();
    console.log(this.results);

    //studentennummers doorlopen in json en zoeken naar gescande nummer -> naam opslaan
    this.http.get('assets/data/studentenrs.json').map(res => res.json()).subscribe(data => {
            this.data = data;

            for (var i = 0; i < data.length; i++) {
              if (data[i]['pointer student'] == this.results['text'].slice(5,-2)) {
                console.log(data[i].voornaam);
                this.naam = data[i].naam;
                this.voornaam =data[i].voornaam;

                this.storage.set(data[i]['pointer student'], data[i].voornaam + " " + data[i].naam);
              }
            }
        });

        //Totale keys opslaan in event om te gebruiken in Studenten Tab
        this.storage.length().then((val) => {
          this.events.publish("storageLength", val);
        });
  }

  async getStorage() {
    this.storage.keys().then((val) => {
      console.log(val);
    });

    this.storage.forEach( (value, key) => {
       console.log("This is the value: ", value);
       console.log("from the key: ", key);
       });
  }

  async clearStorage() {
    this.storage.clear().then((val) => {
      this.events.publish("storageLength", 0);
      console.log("STORAGE CLEARED");
    });
  }
}
