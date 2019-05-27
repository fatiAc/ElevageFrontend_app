import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, NavController, NavParams, Platform} from 'ionic-angular';
import {DetailAlimentationPage} from "../detail-alimentation/detail-alimentation";
import {MesurePage} from "../mesure/mesure";
import {MouvementTabsPage} from "../mouvement-tabs/mouvement-tabs";
import {PrepareAlimentationPage} from "../prepare-alimentation/prepare-alimentation";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {SignInPage} from "../sign-in/sign-in";
import {DetailAlimentationProvider} from "../../providers/detail-alimentation";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  destPage: any = DetailAlimentationPage;
  pages: Array<{ title: string, component: any, icon: string }>;
  login: string;

  constructor(public navCtrl: NavController, public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private menu: MenuController,
              public navParam: NavParams, public detailAlimentProvider: DetailAlimentationProvider,
              public cookieService: CookieService
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      {title: 'Alimentation', component: DetailAlimentationPage, icon: 'nutrition'},
      {title: 'Mesure', component: MesurePage, icon: 'speedometer'},
      {title: 'Mouvement', component: MouvementTabsPage, icon: 'shuffle'},
      {title: 'Preparation', component: PrepareAlimentationPage, icon: 'paper'}
    ];

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component, {login: this.login});
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  signOut() {
    this.cookieService.set('login', null);
    this.navCtrl.setRoot(SignInPage);
  }

}
