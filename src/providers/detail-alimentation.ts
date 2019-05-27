import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the DetailAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DetailAlimentationProvider {

  constructor(public httpMethods: HttpMethods) {
  }

  getPaddocksInfo(date, user_login) {
    return this.httpMethods.get('http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/getPaddockBySession/', date + '/' + user_login)
  }


}
