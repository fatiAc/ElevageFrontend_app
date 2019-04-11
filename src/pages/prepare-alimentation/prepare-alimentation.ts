import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {PeriodeAlimentationProvider} from "../../providers/periode-alimentation";
import {PrepareAlimentationProvider} from "../../providers/prepare-alimentation";

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

  // selectedDate = new Date().toISOString();
  selectedDate = '2019-04-04';
  selectedPeriode: number;
  selectedRation: number;
  periodes = [{id: null, periode: null}];
  userLogin = 'admin';
  rations = [];
  machineInfo = [];
  qtteTotale: number;
  paddocks_qtte = [];
  selectedPaddocks = [];
  selectedMachine = [];
  machines = [];
  nbrPartie: number;
  livraisons = [];
  selectedNbrPartie: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public periodeAliment_Provider: PeriodeAlimentationProvider,
              public prepareAlimmentProvider: PrepareAlimentationProvider,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController) {
    this.initUI();
  }


  initUI() {
    this.periodeAliment_Provider.clonePeriodeInfo(this.periodes);
  }

  shiftData(data) {
    for (let item of data) {
      data.shift();
    }
  }

  updateRations() {
    this.shiftData(this.rations);
    this.prepareAlimmentProvider.rationOfSelectedPeriode(this.selectedPeriode, this.selectedDate, this.userLogin, this.rations);
  }


  getQtteTotaleAndPaddocks() {
    this.shiftData(this.machines);
    this.prepareAlimmentProvider.machineInfo(this.selectedRation, this.machines);
    this.prepareAlimmentProvider.calculeQuantiteTotal(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin)
      .subscribe(data => {
        if (data != null) {
          this.qtteTotale = data[0].qtteTotale;
        }
      });
    this.shiftData(this.paddocks_qtte);
    this.shiftData(this.selectedPaddocks);
    this.prepareAlimmentProvider.getPaddocksWithQtte(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin, this.paddocks_qtte);
    this.prepareAlimmentProvider.getPaddocksWithQtte(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin, this.selectedPaddocks);
  }


  getSelectedMachineInfo() {
    this.machineInfo.shift();
    this.machineInfo.push(this.selectedMachine)
  }

  livraisonInfo(list) {
    this.livraisons = [];
    this.prepareAlimmentProvider.genererLivraison(this.livraisons, this.selectedPaddocks, list);
    this.selectedPaddocks = [];
    this.prepareAlimmentProvider.getPaddocksWithQtte(this.selectedPeriode, this.selectedRation, this.selectedDate, this.userLogin, this.selectedPaddocks);
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
      const alert = this.alertCtrl.create({
        title: 'Opération effectuée',
        subTitle: 'Vous avez généré les livraisons',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(PrepareAlimentationPage);
    } else {
      const alert = this.alertCtrl.create({
        title: 'Erreur ! ',
        subTitle: 'Veuillez générer svp les livraisons',
        buttons: ['OK']
      });
      alert.present();
    }
  }


}


