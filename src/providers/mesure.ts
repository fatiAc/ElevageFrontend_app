import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the MesureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MesureProvider {

  url: string;

  constructor(public httpMethods: HttpMethods) {
  }

  verifySnit(snit) {
    this.url = 'http://localhost:8080/app/mesure/findBySnit/';
    return this.httpMethods.get(this.url, snit);
  }

  createMesure(poids, dateMeure, user_login, snit) {
    let data = {
      poids: poids,
      dateMeure: dateMeure,
      user_login: user_login,
      snit: snit
    };
    this.url = 'http://localhost:8080/app/mesure/createMesure'
    return this.httpMethods.post(this.url, data);
  }

}
