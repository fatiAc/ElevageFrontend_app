import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MouvementElementPage} from "../mouvement-element/mouvement-element";
import {MouvementPaddockPage} from "../mouvement-paddock/mouvement-paddock";
import {MouvementProvider} from "../../providers/mouvement";

/**
 * Generated class for the MouvementTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mouvement-tabs',
  templateUrl: 'mouvement-tabs.html',
})
export class MouvementTabsPage {

  mouvementElement: any;
  mouvementPaddock: any;

  constructor(public navCtrl: NavController) {

    this.mouvementElement = MouvementElementPage;
    this.mouvementPaddock = MouvementPaddockPage;
  }


}
