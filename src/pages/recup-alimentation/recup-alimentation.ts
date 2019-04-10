import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RecupAlimentationProvider} from "../../providers/recup-alimentation";
import {PeriodeAlimentationProvider} from "../../providers/periode-alimentation";

/**
 * Generated class for the RecupAlimentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recup-alimentation',
  templateUrl: 'recup-alimentation.html',
})
export class RecupAlimentationPage {

  detail = [{
    paddock: null,
    note: null,
    nbrVache: null,
    id: null
  }];

  alimentationParams = [{
    periode: null,
    ration: null,
    qtte: null
  }];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public recupAlimentationProvider: RecupAlimentationProvider) {
    this.getData();
  }

  getData() {
    if (this.navParams.get('param') == true) {
      this.recupAlimentationProvider.getDetailOfSession(this.detail, this.alimentationParams);
    }
  }


}
