import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {UserProvider} from "../../providers/userProvider";
import {HomePage} from "../home/home";
import {MessageTools} from "../../providers/tools/messageTools";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  login: string;
  password: string;

  constructor(public navCtrl: NavController,
              private userProvider: UserProvider,
              public toastCtrl: ToastController,
              public messageTools: MessageTools) {
  }



  signIn() {
    this.userProvider.onVerifyLogin(this.login).subscribe(response => {
      if (response == false) {
        this.messageTools.toastMsg(this.toastCtrl, 'Login est incorrect ');
      } else {
        this.userProvider.verifyPassword(this.password).subscribe(response => {
          if (response == false) {
            this.messageTools.toastMsg(this.toastCtrl, 'Le mot de passe est incorret ');
          } else
            this.navCtrl.setRoot(HomePage, {login: this.login});
        })
      }
      ;
    });
  }


}
