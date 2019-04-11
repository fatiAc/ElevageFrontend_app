import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AlimentationPage} from "../pages/alimentation/alimentation";
import {SignInPage} from "../pages/sign-in/sign-in";
import {DetailAlimentationPage} from "../pages/detail-alimentation/detail-alimentation";
import {RecupAlimentationPage} from "../pages/recup-alimentation/recup-alimentation";
import {PrepareAlimentationPage} from "../pages/prepare-alimentation/prepare-alimentation";
import {MouvementElementPage} from "../pages/mouvement-element/mouvement-element";
import {MouvementTabsPage} from "../pages/mouvement-tabs/mouvement-tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = MouvementTabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

