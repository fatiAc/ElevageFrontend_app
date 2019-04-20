import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MouvementProvider} from "../../providers/mouvement";
import {MessageTools} from "../../providers/tools/messageTools";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mouvementProvider: MouvementProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController, public messageTools: MessageTools) {
  }


  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }


  findPaddock() {
    if (this.snit == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'veuillez saisir un SNIT');
    } else {
      this.mouvementProvider.getPaddockbyAnimal(this.snit)
        .subscribe(response => {
          if (response == false) {
            this.messageTools.toastMsg(this.toastCtrl, 'SNIT n\'existe pas');
          } else {
            this.paddockSrc[0].id = response[0].id;
            this.paddockSrc[0].paddockName = response[0].paddockName;
            this.shift(this.desPaddocks);
            this.mouvementProvider.getDesPaddocks(this.snit, this.desPaddocks);
          }
        });
    }

  }

  save() {
    if (this.snit == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'veuillez saisir un SNIT');
    } else if (this.paddockDest == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'veuillez selectionner le paddock destination');
    } else {
      this.mouvementProvider.createMouvemntMesure(this.poids, this.selectedDate,this.snit, this.paddockSrc[0].id, this.paddockDest)
        .subscribe(response => {
          if (response != null) {
            this.messageTools.alertMsg(this.alertCtrl, 'Opération effectuée', 'Vous avez généré les livraisons');
            this.navCtrl.push(MouvementElementPage); // reinitialiser la page
          } else {
            this.messageTools.alertMsg(this.alertCtrl, 'Erreur ! ', 'Veuillez réssayer votre opération');
          }
        });
    }

  }
}
