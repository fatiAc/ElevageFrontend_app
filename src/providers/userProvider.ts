import {Injectable} from '@angular/core';
import "rxjs/add/operator/retry";
import {Http} from '@angular/http';
import {HttpMethods} from "./tools/httpMethods";


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  url: string;

  constructor(public http: Http, public httpMethods: HttpMethods) {
  }

  onVerifyLogin(login: string) {
    this.url = 'http://localhost:8080/app/user/verifyLogin/';
    return this.httpMethods.get(this.url, login);
  }

  verifyPassword(password: string) {
    this.url = 'http://localhost:8080/app/user/verifyPassword/';
    return this.httpMethods.get(this.url, password);

  }

}


