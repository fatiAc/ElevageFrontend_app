import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SignInPage} from "../pages/sign-in/sign-in";
import {CookieService} from "ngx-cookie-service";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public cookieService: CookieService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.getRootPage();
  }

  getRootPage() {
    if (this.cookieService.get('login') == 'null') {
      this.rootPage = SignInPage;
    } else {
      this.rootPage = HomePage;
    }
  }
}

