import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {DetailAlimentationProvider} from "../../providers/detail-alimentation";
import {PeriodeAlimentationProvider} from "../../providers/periode-alimentation";
import {NourritureProvider} from "../../providers/nourritureProvider";
import {RecupAlimentationPage} from "../recup-alimentation/recup-alimentation";
import {MessageTools} from "../../providers/tools/messageTools";
import {CookieService} from "ngx-cookie-service";

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
  paddocks: any;
  periodes: any;
  rations = [];
  quantites = new Array();
  selectedRations = new Array();
  date = new Date().toISOString();
  note: number;
  nbrVache: number;
  periode: string;
  ration: string;
  comment: string;
  selectedPaddock: number;
  data = [];

  constructor(public navCtrl: NavController,
              public detail_aliment_provider: DetailAlimentationProvider,
              public periode_aliment_provider: PeriodeAlimentationProvider,
              public  nourritureProvider: NourritureProvider,
              public messageTools: MessageTools,
              public toastCtrl: ToastController,
              public cookieService: CookieService) {

    this.initUI();
  }


  initUI() {
    this.login = this.cookieService.get('login');
    this.getPaddockData();
    this.periode_aliment_provider.getPeriodeInfo()
      .subscribe(response => {
        if (response != false) {
          this.periodes = response;
        }
      });
    this.nourritureProvider.getRationName()
      .subscribe(response => {
        if (response != false) {
          this.rations = response;
        }
      });
    ;
  }

  getPaddockData() {
    this.paddocks = [];
    this.detail_aliment_provider.getPaddocksInfo(this.date, this.login)
      .subscribe(response => {
        this.paddocks = response;
      })
  }

  valider() {
    if (this.selectedPaddock == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez selectionner un paddock');
    } else if (this.note == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez saisir une note');
    } else if (this.nbrVache == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez saisir le nombre de vache');
    } else {
      this.periode_aliment_provider.saveSessionAlimentation(this.login, this.date)
        .subscribe(data => {
          this.periode_aliment_provider.saveDetailAlimentation(this.selectedPaddock, this.note, this.nbrVache, this.comment)
            .subscribe(response => {
              this.periode_aliment_provider.savePeriodeRation(this.nbrVache, this.periodes, this.selectedRations, this.quantites)
                .subscribe(response => {
                  this.navCtrl.push(RecupAlimentationPage);
                });
            });
        });
    }
  }


}
