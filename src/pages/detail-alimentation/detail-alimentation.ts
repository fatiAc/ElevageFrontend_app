import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DetailAlimentationProvider} from "../../providers/detail-alimentation";
import {PeriodeAlimentationProvider} from "../../providers/periode-alimentation";
import {NourritureProvider} from "../../providers/nourritureProvider";
import {not} from "rxjs/util/not";

/**
 * Generated class for the DetailAlimentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-alimentation',
  templateUrl: 'detail-alimentation.html',
})
export class DetailAlimentationPage {

  private login: string;
  paddocks = new Array(); // paddock id
  periodes = new Array();
  rations = new Array();
  quantites = new Array();
  allRations = new Array();
  date: Date;
  note: number;
  nbrVache: number;
  periode: string;
  ration: string;
  comment: string;
  selectedPaddock: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public detail_aliment_provider: DetailAlimentationProvider,
              public periode_aliment_provider: PeriodeAlimentationProvider,
              public  nourritureProvider: NourritureProvider) {
    detail_aliment_provider.clonePaddockID(this.paddocks);
    periode_aliment_provider.clonePeriodeName(this.periodes);
    nourritureProvider.cloneRationName(this.rations);
    this.login = navParams.data;
  }


  valider() {
    this.periode_aliment_provider.saveAll(this.login,this.date, this.selectedPaddock, this.note, this.nbrVache, this.comment, this.periodes, this.quantites, this.rations);
  }

}
