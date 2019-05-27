import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the NourritureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NourritureProvider {

  constructor(public httpMethods: HttpMethods) {
  }

  getRationName() {
    return this.httpMethods.get(' http://' + this.httpMethods.ipAdress + ':8080/app/nourriture/rationsInfo', '');
  }

}
