import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MouvementProvider} from "../../providers/mouvement";

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
  user_login = "admin";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mouvementProvider: MouvementProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    this.initPaddocksSrc();
  }

  shift(data) {
    for (let item of data) {
      data.shift();
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

  toastParam(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'Middle'
    });
    toast.present();
  }

  save() {
    if (this.paddockSrc == null) {
      this.toastParam('Veuillez saisir le paddock source ');
    } else if (this.nbrElements == 0) {
      this.toastParam('Veuillez changer le paddock source ')
    } else if (this.paddockDest == null) {
      this.toastParam('Veuillez saisir le paddock destination')
    } else {
      this.mouvementProvider.createItems(this.selectedDate, this.paddockSrc, this.paddockDest, this.user_login)
        .subscribe(response => {
          if (response != null) {
            this.mouvementProvider.updatePaddocksOfAnimals(this.paddockSrc, this.paddockDest);
            const alert = this.alertCtrl.create({
              title: 'Opération effectuée avec succes ! ',
              subTitle: 'Vous avez bien déplacer les éléments ',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(MouvementPaddockPage);
          } else {
            const alert = this.alertCtrl.create({
              title: 'Erreur ! ',
              subTitle: 'Veuillez réssayer votre opération',
              buttons: ['OK']
            });
            alert.present();
          }
        });
    }
  }
}
