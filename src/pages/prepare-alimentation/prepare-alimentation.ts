import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PeriodeAlimentationProvider} from "../../providers/periode-alimentation";
import {PrepareAlimentationProvider} from "../../providers/prepare-alimentation";
import {MessageTools} from "../../providers/tools/messageTools";
import {CookieService} from "ngx-cookie-service";

/**
 * Generated class for the PrepareAlimentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prepare-alimentation',
  templateUrl: 'prepare-alimentation.html',
})
export class PrepareAlimentationPage {

  selectedDate = new Date().toISOString();
  selectedPeriode: number;
  selectedRation: number;
  periodes: any
  userLogin: string;
  rations: any;
  machineInfo = [];
  qtteTotale: number;
  paddocks_qtte: any;
  selectedPaddocks: any;
  selectedMachine = [];
  machines = [];
  nbrPartie: number;
  livraisons = [];
  selectedNbrPartie: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public periodeAliment_Provider: PeriodeAlimentationProvider,
              public prepareAlimmentProvider: PrepareAlimentationProvider,
              public alertCtrl: AlertController,
              public messageTools: MessageTools,
              public toastCtrl: ToastController,
              public cookieService: CookieService) {
    this.initUI();
  }


  initUI() {
    this.userLogin = this.cookieService.get('login');
    this.periodeAliment_Provider.getPeriodeInfo()
      .subscribe(response => {
        this.periodes = response;
      });
  }

  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }

  updateRations() {
    this.prepareAlimmentProvider.rationOfSelectedPeriode(this.selectedPeriode, this.selectedDate, this.userLogin)
      .subscribe(response => {
        this.rations = response;
      });
    ;
  }


  getQtteTotaleAndPaddocks() {
    this.prepareAlimmentProvider.machineInfo(this.selectedRation)
      .subscribe(response => {
        this.machines = response;
      });
    this.prepareAlimmentProvider.calculeQuantiteTotal(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin)
      .subscribe(data => {
        if (data != null) {
          this.qtteTotale = data[0].qtteTotale;
        }
      });
    this.paddocks_qtte = [];
    this.selectedPaddocks = [];
    this.prepareAlimmentProvider.getPaddocksWithQtte(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin)
      .subscribe(response => {
        if (response != null) {
          this.paddocks_qtte = response;
        }
      });
    this.prepareAlimmentProvider.getPaddocksWithQtte(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin)
      .subscribe(response => {
        if (response != null) {
          this.selectedPaddocks = response;
        }
      });
    ;
  }


  getSelectedMachineInfo() {
    this.machineInfo.shift();
    this.machineInfo.push(this.selectedMachine)
  }

  livraisonInfo(list) {
    this.livraisons = [];
    this.prepareAlimmentProvider.genererLivraison(this.livraisons, this.selectedPaddocks, list);
    console.log('selected paddocks === ', this.selectedPaddocks);
    console.log('+++++++++++++++++++ ', this.livraisons);
    this.selectedPaddocks = [];
    this.prepareAlimmentProvider.getPaddocksWithQtte(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin)
      .subscribe(response => {
        if (response != null) {
          this.selectedPaddocks = response;
        }
      });
    ;
  }

  getDefaultNbrPartieAndLivraison() {
    this.getSelectedMachineInfo();
    this.nbrPartie = this.prepareAlimmentProvider.calculeDefaultNbrPartie(this.machineInfo[0].capacite, this.qtteTotale);
    let list = new Array();
    list = this.prepareAlimmentProvider.calculeDefaultQtteOfPartie(this.qtteTotale, this.machineInfo[0].capacite);
    this.livraisonInfo(list);
  }

  genererLivraison() {
    this.getSelectedMachineInfo();
    let list = new Array();
    list = this.prepareAlimmentProvider.calculQtteOfPartie(this.selectedNbrPartie, this.qtteTotale);
    this.livraisonInfo(list);
  }

  valider() {
    if (this.livraisons.length != 0) {
      let nbrPreparation = 0;
      if (this.selectedNbrPartie == null) {
        nbrPreparation = this.nbrPartie
      } else nbrPreparation = this.selectedNbrPartie;
      this.prepareAlimmentProvider.createRecupSessionWithLivraison(this.selectedDate, this.userLogin, nbrPreparation, this.qtteTotale, this.machineInfo[0].id,
        this.selectedPeriode, this.selectedRation, this.livraisons);
      this.messageTools.alertMsg(this.alertCtrl, 'Opération effectuée', 'Vous avez généré les livraisons')
      this.navCtrl.push(PrepareAlimentationPage);
    } else {
      this.messageTools.toastMsg(this.toastCtrl, 'Veuillez générer svp les livraisons');
    }
  }


}


