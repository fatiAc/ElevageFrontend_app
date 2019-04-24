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

  clonePaddockData(date, user_login, paddocks) {

    return this.httpMethods.get('http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/getPaddockBySession/', date + '/' + user_login)
      .subscribe(response => {
        if (response != false) {
          for (let paddock of response) {
            paddocks.push({id: paddock.id, nom: paddock.nom});
          }
        }
      });
  }

  getConnectedUser(login) {
    return this.httpMethods.get(' http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/getConnectedUser/', login)
      .subscribe(response => {
      });
  }

}
