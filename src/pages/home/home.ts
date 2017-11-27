import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  results: {};
  constructor(private barcode: BarcodeScanner, public navCtrl: NavController) {

  }

  async scanBarcode(){
    this.results = await this.barcode.scan();
    console.log(this.results);
  }
}
