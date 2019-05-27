import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {MouvementProvider} from "../../providers/mouvement";
import {MessageTools} from "../../providers/tools/messageTools";
import {CookieService} from "ngx-cookie-service";

/**
 * Generated class for the MouvementPaddockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mouvement-paddock',
  templateUrl: 'mouvement-paddock.html',
})
export class MouvementPaddockPage {

  selectedDate = new Date().toISOString();
  paddockSrc: number;
  paddockDest: number;
  paddocksSrc = [];
  paddocksDest = [];
  nbrElements: number;
  userLogin: string;

  constructor(public navCtrl: NavController,
              public mouvementProvider: MouvementProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public messageTools: MessageTools,
              public cookieService: CookieService) {
    this.initPaddocksSrc();
  }

  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }

  initPaddocksSrc() {
    this.shift(this.paddocksSrc);
    this.mouvementProvider.getSrcPaddocks(this.paddocksSrc);
  }

  getNbrElementAndDestPaddocks() {
    this.mouvementProvider.getNbrElement(this.paddockSrc)
      .subscribe(response => {
        if (response != null) {
          this.nbrElements = response[0].nbrElement;
        }
      });
    this.shift(this.paddocksDest);
    this.mouvementProvider.getPaddocksOfDest(this.paddockSrc, this.paddocksDest);
  }


  save() {
    if (this.paddockSrc == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez saisir le paddock source ');
    } else if (this.nbrElements == 0) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez changer le paddock source ')
    } else if (this.paddockDest == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez saisir le paddock destination')
    } else {
      this.userLogin = this.cookieService.get('login');
      this.mouvementProvider.createItems(this.selectedDate, this.paddockSrc, this.paddockDest, this.userLogin)
        .subscribe(response => {
          if (response != null) {
            this.mouvementProvider.updatePaddocksOfAnimals(this.paddockSrc, this.paddockDest)
              .subscribe(response => {
                if (response != null) {
                  this.messageTools.alertMsg(this.alertCtrl, 'Opération effectuée avec succès ! ', 'Vous avez bien déplacer tous les éléments ');
                  this.navCtrl.push(MouvementPaddockPage);
                }
              });
          } else {
            this.messageTools.alertMsg(this.alertCtrl, 'Erreur ! ', 'Veuillez réessayer votre opération');
          }
        });
    }
  }
}
