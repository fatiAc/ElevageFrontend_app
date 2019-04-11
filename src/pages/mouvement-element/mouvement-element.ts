import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MouvementProvider} from "../../providers/mouvement";

/**
 * Generated class for the MouvementElementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mouvement-element',
  templateUrl: 'mouvement-element.html',
})
export class MouvementElementPage {

  selectedDate = new Date().toISOString();
  snit: number;
  paddockSrc = [{id: null, paddockName: ''}];
  desPaddocks = [];
  paddockDest: number;
  poids: number;
  user_login = 'admin';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mouvementProvider: MouvementProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }


  shift(data) {
    for (let item of data) {
      data.shift();
    }
  }

  toastParam(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'Middle'
    });
    toast.present();
  }

  findPaddock() {
    if (this.snit == null) {
      this.toastParam('veuillez saisir un SNIT');
    } else {
      this.mouvementProvider.getPaddockbyAnimal(this.snit)
        .subscribe(response => {
          this.paddockSrc[0].id = response[0].id;
          this.paddockSrc[0].paddockName = response[0].paddockName;
        });
      this.shift(this.desPaddocks);
      this.mouvementProvider.getDesPaddocks(this.snit, this.desPaddocks);
    }

  }

  save() {
    if (this.snit == null) {
      this.toastParam('veuillez saisir un SNIT');
    } else if (this.paddockDest == null) {
      this.toastParam('veuillez selectionner le paddock destination');
    } else {
      this.mouvementProvider.createMouvemntMesure(this.poids, this.selectedDate, this.user_login, this.snit, this.paddockSrc[0].id, this.paddockDest)
        .subscribe(response => {
          if (response != null) {
            const alert = this.alertCtrl.create({
              title: 'Opération effectuée',
              subTitle: 'Vous avez généré les livraisons',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(MouvementElementPage); // reinitialiser la page
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