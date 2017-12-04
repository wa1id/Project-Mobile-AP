import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  results: {};
  studenten: {};
  data: {};
  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, public http: Http) {

  }

  async scanBarcode(){
    this.results = await this.barcode.scan();
    console.log(this.results);

    this.http.get('studentenrs.json').map(res => res.json()).subscribe(data => {
            this.data = data;

            for (var i = 0; i < data.length; i++) {
              if (data[i]['pointer student'] == this.results['text'].slice(5,-2)) {
                console.log(data[i].voornaam);
              }
            }
        });
    //storage.set("studentnr", results.text.slice(5,-2));
  }

  // async getStorage() {
  //   storage.get("studentnr").then((val) => {
  //     studenten.push(val);
  //     console.log(studenten);
  // });
  //}
}
