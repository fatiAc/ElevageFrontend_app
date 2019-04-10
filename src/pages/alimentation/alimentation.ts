import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DetailAlimentationPage} from "../detail-alimentation/detail-alimentation";
import {RecupAlimentationPage} from "../recup-alimentation/recup-alimentation";

/**
 * Generated class for the AlimentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alimentation',
  templateUrl: 'alimentation.html',
})
export class AlimentationPage {

  detail_alimentation: any;
  recup_alimentation: any;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detail_alimentation = DetailAlimentationPage;
    this.recup_alimentation = RecupAlimentationPage;
  }



}
