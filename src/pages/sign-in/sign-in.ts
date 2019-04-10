import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/userProvider";
import {HomePage} from "../home/home";
import {AlimentationPage} from "../alimentation/alimentation";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  login: string;
  password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider) {
  }


  signIn() {
    this.userProvider.onVerifyLogin(this.login).subscribe(response => {
      console.log('Login Response:', response);
      if (response == true) {
        this.userProvider.verifyPassword(this.password).subscribe(response => {
          console.log('Password Response:', response);
          if (response == true) {
            this.navCtrl.push(AlimentationPage, this.login);
          }
        })
      }
      ;
    });
  }


}
