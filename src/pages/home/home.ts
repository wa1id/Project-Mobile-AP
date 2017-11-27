import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;

  constructor(private barcode: BarcodeScanner, public navCtrl: NavController) {

  }

  async scanBarcode(){
    const results = await this.barcode.scan();
    console.log(results);
  }
}
