import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MesureProvider} from "../../providers/mesure";
import {MessageTools} from "../../providers/tools/messageTools";

/**
 * Generated class for the MesurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mesure',
  templateUrl: 'mesure.html',
})
export class MesurePage {


  selectedDate = new Date().toISOString();
  snit: number;
  poids: number;
  user_login: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mesureProvider: MesureProvider, public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public messageTools: MessageTools) {

    this.user_login = this.navParams.get('login');
  }

  save() {
    if (this.snit == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez saisir un SNIT');
    } else if (this.poids == null) {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez saisir un poids');
    } else {
      this.mesureProvider.verifySnit(this.snit)
        .subscribe(response => {
          if (response == false) {
            this.messageTools.toastMsg(this.toastCtrl, 'Animal n\'existe pas\n');
          } else {
            this.mesureProvider.createMesure(this.poids, this.selectedDate, this.user_login, this.snit)
              .subscribe(response => {
                if (response != null) {
                  this.messageTools.alertMsg(this.alertCtrl, 'Opération effectuée avec succès ', '');
                  this.navCtrl.push(MesurePage); // reinitialiser la page
                }
              })
          }
        });
    }

  }

}
