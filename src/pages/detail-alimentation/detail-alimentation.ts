import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DetailAlimentationProvider} from "../../providers/detail-alimentation";
import {PeriodeAlimentationProvider} from "../../providers/periode-alimentation";
import {NourritureProvider} from "../../providers/nourritureProvider";
import {RecupAlimentationPage} from "../recup-alimentation/recup-alimentation";
import {LoadingController} from 'ionic-angular';

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
  paddocks = new Array();
  periodes = [{id: null, periode: null}];
  rations = new Array();
  quantites = new Array();
  allRations = new Array();
  date = new Date().toISOString();
  note: number;
  nbrVache: number;
  periode: string;
  ration: string;
  comment: string;
  selectedPaddock: string;
  data = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingController: LoadingController,
              public detail_aliment_provider: DetailAlimentationProvider,
              public periode_aliment_provider: PeriodeAlimentationProvider,
              public  nourritureProvider: NourritureProvider) {

    this.getData();
  }


  getData() {
    this.detail_aliment_provider.clonePaddockName(this.paddocks);
    this.periode_aliment_provider.clonePeriodeInfo(this.periodes);
    this.nourritureProvider.cloneRationName(this.rations);
    this.login = this.navParams.data;
  }


  valider() {
    this.periode_aliment_provider.saveAll(this.login, this.date, this.selectedPaddock, this.note, this.nbrVache, this.comment
      , this.periodes, this.quantites, this.allRations);
    // this.periode_aliment_provider.cloneData(this.data, this.periodes, this.allRations, this.quantites);
    this.presentLoadingWithOptions();
    setTimeout(
      () => {
        // this.navCtrl.setRoot(RecupAlimentationPage, {data: this.data, param: true});
        this.navCtrl.push(RecupAlimentationPage, {param: true});
        // this.navCtrl.parent.select(1);
      }, 3000
    );
  }


  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      content: 'Wait please...',
      spinner: null,
      duration: 2000,
      cssClass: 'custom-class custom-loading'
    });


    return await loading.present();
  }

}
